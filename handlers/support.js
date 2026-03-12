const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSupportCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		// Answer callback query to remove loading state
		await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
			}),
		});

		// Send message asking user to describe their issue
		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "Напишите ваш вопрос или сообщение ниже.\nМы стараемся отвечать в течение <b>1-2 рабочих дней.</b>\n\n📎 Вы можете прикрепить скриншот - это поможет быстрее разобраться в ситуации.",
				parse_mode: "HTML",
			}),
		});

		// Set FSM state to wait for user's support message
		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_support_message");
		}
	} catch (error) {
		console.error("Error in handleSupportCallback:", error);
	}
}
