const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleLeaveLegalRequestCallback({ token, callbackQuery, kv }) {
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

		// Ask user for contact time
		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "Напишите удобное время, когда с Вами можно связаться",
			}),
		});

		// Set separate FSM state for legal request flow
		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_contact_legal_1");
		}
	} catch (error) {
		console.error("Error in handleLeaveLegalRequestCallback:", error);
	}
}
