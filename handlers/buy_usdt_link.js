const TELEGRAM_API = "https://api.telegram.org/bot";
import {
	ADMIN_CHAT_ID,
	ADMIN_THREAD_ID,
	LINK_TTL_MINUTES,
	getLinkState,
} from "./link_lifetime.js";
import { enqueuePendingLinkRequest } from "./pending_link_requests.js";

function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

export async function handleBuyUsdtLinkCallback({ token, callbackQuery, db }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const messageId = callbackQuery?.message?.message_id;
	const userId = callbackQuery?.from?.id;
	const userName = callbackQuery?.from?.username
		? `@${callbackQuery.from.username}`
		: callbackQuery?.from?.first_name || "Без имени";

	if (!callbackQueryId || !chatId || !messageId) {
		return;
	}

	let buyLink = null;
	let linkAgeMinutes = null;
	let isFreshLink = false;

	await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
		}),
	});

	if (db) {
		try {
			const linkState = await getLinkState({ db, linkType: "buy" });
			buyLink = linkState.link;
			linkAgeMinutes = linkState.ageMinutes;
			isFreshLink = linkState.isFresh;

			console.log(
				`[link-check] type=buy user=${userId || "unknown"} hasLink=${Boolean(buyLink)} ageMinutes=${
					linkAgeMinutes === null ? "null" : linkAgeMinutes.toFixed(2)
				} isFresh=${isFreshLink}`
			);
		} catch (dbError) {
			console.error("Failed to load buy link state from bot_settings:", dbError);
		}
	} else {
		console.error("D1 DB is not available for buy link state");
	}

	if (!isFreshLink) {
		if (db && userId) {
			try {
				const queueResult = await enqueuePendingLinkRequest({
					db,
					userId,
					orderType: "buy",
					messageId,
				});
				console.log(
					`[pending-link] type=buy user=${userId} queued=${queueResult?.queued} reason=${queueResult?.reason || "unknown"}`
				);
			} catch (queueError) {
				console.error("Failed to enqueue pending buy link request:", queueError);
			}
		}

		const waitingText = [
			"⏳ Ссылка на сделку формируется.",
			"Пожалуйста, ожидайте <b>3–5 минут</b>.",
			"Мы уведомим вас, как только ссылка будет готова.",
			"",
			"🎓 Кстати, чтобы время ожидания прошло с пользой:",
			"Подпишитесь на YouTube-канал Александра. Там он простым языком объясняет технический анализ, паттерны и поведение рынка.",
			'📺 <a href="https://www.youtube.com/@netormoziBTC">Ссылка на канал</a>',
		].join("\n");

		await fetch(`${TELEGRAM_API}${token}/editMessageText`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				message_id: messageId,
				text: waitingText,
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
				},
			}),
		});

		const moscowRequestTime = new Intl.DateTimeFormat("ru-RU", {
			timeZone: "Europe/Moscow",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		}).format(new Date());

		const partnerNotice = [
			"🔄 Требуется обновление ссылки на сделку",
			"",
			"Тип: ПОКУПКА USDT",
			`Пользователь: ${userName} (${userId || "unknown"})`,
			`Время запроса (MSK): ${moscowRequestTime}`,
			`Причина: ${buyLink ? `ссылка старше ${LINK_TTL_MINUTES} минут` : "ссылка отсутствует"}`,
			"",
			"Пожалуйста, отправьте новую команду в этот топик: BUY_LINK=https://...",
		].join("\n");

		const partnerNoticeResponse = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: ADMIN_CHAT_ID,
				message_thread_id: ADMIN_THREAD_ID,
				text: partnerNotice,
			}),
		});

		if (!partnerNoticeResponse.ok) {
			const errorText = await partnerNoticeResponse.text();
			console.error("Failed to send buy link refresh notice to admin topic:", errorText);
		}
	} else {
		const safeBuyLink = escapeHtml(buyLink);
		const text = [
			"🔗 <b>Ваша персональная ссылка на сделку:</b>",
			`<a href=\"${safeBuyLink}\">${safeBuyLink}</a>`,
			"",
			"Ссылка <b>действительна 20 минут.</b> Не откладывайте сделку!",
			"",
			"📌 <b>Что делать дальше:</b>",
			"Перейдите по ссылке - вы попадете в P2P-объявление моего партнера (Команда MsGold) на Bybit.",
			"",
			"Нажмите <b>«ПОКУПКА USDT»</b> и следуйте инструкциям биржи.",
			"",
			"Оплатите сделку по реквизитам, которые укажет наш операционный партнер.",
			"",
			"После подтверждения оплаты USDT поступят <b>на ваш спотовый кошелек Bybit.</b>",
			"",
			"⏱ <b>Срок жизни ссылки: 20 минут.</b>",
			"Не откладывайте вход в объявление.",
			"",
			"⚠️ <b>Важно!</b>",
			"- Все расчеты ведутся <b>только внутри платформы Bybit.</b>",
			"- Не переходите по сторонним ссылкам и не переводите деньги напрямую продавцу без подтверждения сделки на бирже.",
			"",
			"- Если у вас еще нет аккаунта на <a href=\"https://partner.bybit.com/b/netormozibtc\">Bybit</a>. Бонусы до 30 000 USDT при регистрации.",
		].join("\n");

		await fetch(`${TELEGRAM_API}${token}/editMessageText`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				message_id: messageId,
				text,
				parse_mode: "HTML",
				disable_web_page_preview: true,
				reply_markup: {
					inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
				},
			}),
		});
	}

	if (db && userId) {
		try {
			const createdOrder = await db
				.prepare(
					`INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
					 VALUES (?, 'buy', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
					 RETURNING order_id`
				)
				.bind(userId)
				.first();

			let orderId = createdOrder?.order_id;

			if (!orderId) {
				const latestOrder = await db
					.prepare("SELECT order_id FROM orders WHERE user_id = ? AND order_type = 'buy' ORDER BY order_id DESC LIMIT 1")
					.bind(userId)
					.first();

				orderId = latestOrder?.order_id;
			}

			if (orderId) {
				try {
					await db
						.prepare(
							`INSERT INTO order_feedbacks (order_id, user_id, send_after)
							 VALUES (?, ?, datetime('now', '+180 minutes'))`
						)
						.bind(orderId, userId)
						.run();
				} catch (feedbackError) {
					await db.prepare("DELETE FROM orders WHERE order_id = ?").bind(orderId).run();
					throw new Error(`Failed to create linked order_feedbacks row: ${feedbackError}`);
				}

				const requestTime = new Intl.DateTimeFormat("ru-RU", {
					timeZone: "Europe/Moscow",
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}).format(new Date());

				const fullAdminText = [
					`🔔 Новый клиент! ${userName} ${userId}`,
					"",
					"Клиент запросил сделку:",
					"🧾 Тип: ПОКУПКА USDT",
					`🕐 Время запроса: ${requestTime}`,
				].join("\n");

				const shortAdminText = [
					`🔔 Новый клиент ${orderId}!`,
					"",
					"Клиент запросил сделку:",
					"",
					"━━━━━━━━━━━━━━━━━━━",
					"",
					"🧾 Тип: [ПОКУПКА USDT]",
					"",
					"<B>ВЫ СОЗДАЕТЕ ОБЪЯВЛЕНИЕ НА ПРОДАЖА USDT (SELL)</B>",
					`🕐 Время запроса: [${requestTime}]`,
					"",
					"━━━━━━━━━━━━━━━━━━━",
				].join("\n");

				const shortAdminResponse = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						chat_id: "-1003815117903",
						text: shortAdminText,
					}),
				});

				if (!shortAdminResponse.ok) {
					const errorText = await shortAdminResponse.text();
					console.error("Failed to send short buy order to admin group:", errorText);
				}

				const fullAdminResponse = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						chat_id: "-1003764590191",
						text: fullAdminText,
					}),
				});

				if (fullAdminResponse.ok) {
					const adminResult = await fullAdminResponse.json();
					const adminMessageId = adminResult?.result?.message_id;

					if (adminMessageId) {
						await db
							.prepare("UPDATE orders SET admin_message_id = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?")
							.bind(adminMessageId, orderId)
							.run();
					}
				} else {
					const errorText = await fullAdminResponse.text();
					console.error("Failed to send full buy order to admin group:", errorText);
				}
			}
		} catch (dbError) {
			console.error("Failed to create buy order:", dbError);
		}
	}
}
