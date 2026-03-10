const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleRequestBotCallback({ token, callbackQuery }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const messageId = callbackQuery?.message?.message_id;

	if (!callbackQueryId || !chatId || !messageId) {
		return;
	}

	// Answer callback query to remove loading state
	await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
		}),
	});

	// Edit message with service proposal text and button
	const editUrl = `${TELEGRAM_API}${token}/editMessageText`;
	await fetch(editUrl, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			message_id: messageId,
			text: "🤖 <b>Хотите такого же бота для вашего бизнеса или канала?</b>\n\nМы можем разработать <b>аналогичное решение под ключ</b>:\n- Telegram-бот с P2P-сценариями\n- интеграция с партнёрами / биржами\n- простая CRM и уведомления\n- полный код в вашу собственность\n\n📬 <b>Напишите нам</b>, и мы обсудим детали:",
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "Отправить сообщение", callback_data: "send_message" }],
				],
			},
		}),
	});
}
