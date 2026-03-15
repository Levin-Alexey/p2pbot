const TELEGRAM_API = "https://api.telegram.org/bot";

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

	if (db) {
		try {
			const settings = await db.prepare("SELECT sell_link FROM bot_settings WHERE id = ?").bind(1).first();

			if (settings?.sell_link && String(settings.sell_link).trim()) {
				sellLink = String(settings.sell_link).trim();
			}
		} catch (dbError) {
			console.error("Failed to load sell_link from bot_settings:", dbError);
		}
	} else {
		console.error("D1 DB is not available for sell_link");
	}

	await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
		}),
	});

	if (!sellLink) {
		await fetch(`${TELEGRAM_API}${token}/editMessageText`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				message_id: messageId,
				text: "Ссылка на продажу временно недоступна. Попробуйте позже или свяжитесь с поддержкой.",
				reply_markup: {
					inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
				},
			}),
		});
		return;
	}

	const safeSellLink = escapeHtml(sellLink);
	const text = [
		"🔗 <b>Ваша персональная ссылка на продажу USDT:</b>",
		`<a href=\"${safeSellLink}\">${safeSellLink}</a>`,
		"",
		"📌 <b>Инструкция:</b>",
		"Перейдите по ссылке - вы попадете в P2P-объявление моего партнера (Команда MsGold) на Bybit.",
		"",
		"Нажмите <b>«ПРОДАТЬ USDT»</b>. Укажите сумму и подтвердите сделку.",
		"",
		"После подтверждения от команды MsGold <b>вам поступят рубли на вашу карту или счёт в вашем банке.</b>",
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