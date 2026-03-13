const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSendMessageCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		// Answer callback query
		await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
			}),
		});

		// Send request message
		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "Напишите удобное время, когда с Вами можно связаться",
				reply_markup: {
					inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
				},
			}),
		});

		// Set FSM state to waiting for contact message in KV
		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_contact");
		}
	} catch (error) {
		console.error("Error in handleSendMessageCallback:", error);
	}
}
