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

export async function handleSellUsdtLinkCallback({ token, callbackQuery, db }) {
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

	let sellLink = null;
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
			const linkState = await getLinkState({ db, linkType: "sell" });
			sellLink = linkState.link;
			linkAgeMinutes = linkState.ageMinutes;
			isFreshLink = linkState.isFresh;

			console.log(
				`[link-check] type=sell user=${userId || "unknown"} hasLink=${Boolean(sellLink)} ageMinutes=${
					linkAgeMinutes === null ? "null" : linkAgeMinutes.toFixed(2)
				} isFresh=${isFreshLink}`
			);
		} catch (dbError) {
			console.error("Failed to load sell link state from bot_settings:", dbError);
		}
	} else {
		console.error("D1 DB is not available for sell link state");
	}

	if (!isFreshLink) {
		if (db && userId) {
			try {
				const queueResult = await enqueuePendingLinkRequest({
					db,
					userId,
					orderType: "sell",
					messageId,
				});
				console.log(
					`[pending-link] type=sell user=${userId} queued=${queueResult?.queued} reason=${queueResult?.reason || "unknown"}`
				);
			} catch (queueError) {
				console.error("Failed to enqueue pending sell link request:", queueError);
			}
		}

		const waitingText = [
			"⏳ Ссылка на сделку формируется.",
			"Пожалуйста, ожидайте <b>3–5 минут</b>.",
			"Мы уведомим вас, как только ссылка будет готова.",
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
			"Тип: ПРОДАЖА USDT",
			`Пользователь: ${userName} (${userId || "unknown"})`,
			`Время запроса (MSK): ${moscowRequestTime}`,
			`Причина: ${sellLink ? `ссылка старше ${LINK_TTL_MINUTES} минут` : "ссылка отсутствует"}`,
			"",
			"Пожалуйста, отправьте новую команду в этот топик: SELL_LINK=https://...",
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
			console.error("Failed to send sell link refresh notice to admin topic:", errorText);
		}
	} else {
		const safeSellLink = escapeHtml(sellLink);
		const text = [
			"🔗 <b>Ваша персональная ссылка на продажу USDT:</b>",
			`<a href=\"${safeSellLink}\">${safeSellLink}</a>`,
			"",
			"Ссылка <b>действительна 30 минут.</b> Не откладывайте сделку!",
			"",
			"📌 <b>Инструкция:</b>",
			"Перейдите по ссылке - вы попадете в P2P-объявление моего партнера (Команда MsGold) на Bybit.",
			"",
			"Нажмите <b>«ПРОДАТЬ USDT»</b>. Укажите сумму и подтвердите сделку.",
			"",
			"После подтверждения от команды MsGold <b>вам поступят рубли на вашу карту или счет в вашем банке.</b>",
			"",
			"⏱ <b>Срок жизни ссылки: 30 минут.</b>",
			"Не откладывайте вход в объявление.",
			"",
			"⚠️ <b>Важно!</b>",
			"- Никогда не переводите USDT напрямую «вручную» - только <b>через интерфейс P2P-сделки на Bybit.</b>",
			"- Все споры и гарантии регулируются <b>системой безопасности Bybit.</b>",
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
					 VALUES (?, 'sell', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
					 RETURNING order_id`
				)
				.bind(userId)
				.first();

			let orderId = createdOrder?.order_id;

			if (!orderId) {
				const latestOrder = await db
					.prepare("SELECT order_id FROM orders WHERE user_id = ? AND order_type = 'sell' ORDER BY order_id DESC LIMIT 1")
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
					"🧾 Тип: ПРОДАЖА USDT",
					`🕐 Время запроса: ${requestTime}`,
				].join("\n");

				const shortAdminText = [
					`🔔 Новый клиент ${orderId}!`,
					"",
					"Клиент запросил сделку:",
					"",
					"━━━━━━━━━━━━━━━━━━━",
					"",
					"🧾 Тип: [ ПРОДАЖА USDT]",
					"",
					"<B>ВЫ СОЗДАЕТЕ ОБЪЯВЛЕНИЕ НА ПОКУПКУ USDT (BUY)</B>",
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
					console.error("Failed to send short sell order to admin group:", errorText);
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
					console.error("Failed to send full sell order to admin group:", errorText);
				}
			}
		} catch (dbError) {
			console.error("Failed to create sell order:", dbError);
		}
	}
}