const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSupportCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;

	if (!callbackQueryId || !chatId) {
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
				text: "Напишите ваш вопрос или сообщение ниже.\n\nМы стараемся отвечать в течение 1-2 рабочих дней.\n\n📎 Вы можете прикрепить скриншот - это поможет быстрее разобраться в ситуации.",
				reply_markup: {
					inline_keyboard: [
						[{ text: "Написать сообщение в поддержку", callback_data: "support_write_message" }],
					],
				},
			}),
		});
	} catch (error) {
		console.error("Error in handleSupportCallback:", error);
	}
}

export async function handleSupportWriteMessageCallback({ token, callbackQuery, kv }) {
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
				text: "Введите текст вашего сообщения в поле ниже.",
			}),
		});

		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_support_message");
		}
	} catch (error) {
		console.error("Error in handleSupportWriteMessageCallback:", error);
	}
}
