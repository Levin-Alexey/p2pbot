const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleLeaveCompanyRequestCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
			}),
		});

		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "Напишите удобное время, когда с Вами можно связаться",
			}),
		});

		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_contact_large_1");
		}
	} catch (error) {
		console.error("Error in handleLeaveCompanyRequestCallback:", error);
	}
}
