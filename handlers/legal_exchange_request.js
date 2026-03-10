const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleLegalExchangeRequestCallback({ token, callbackQuery }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const messageId = callbackQuery?.message?.message_id;

	if (!callbackQueryId || !chatId || !messageId) {
		return;
	}

	await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
		}),
	});

	const editUrl = `${TELEGRAM_API}${token}/editMessageText`;
	await fetch(editUrl, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			message_id: messageId,
			text: "Наш стандартный P2P-канал через Bybit работает с суммами <b>до 1 млн рублей</b> - это требование безопасности и ликвидности партнера.\n\n📌 <b>Для сумм выше 1 млн рублей у нас есть индивидуальный сервис</b>:\n- персональные условия\n- безопасное проведение сделки в Москве и Санкт-Петербурге\n\n📞 <b>Оставьте заявку, и мы свяжемся с вами в течение рабочего дня</b>:",
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "👉 Оставить заявку", callback_data: "leave_legal_request" }],
				],
			},
		}),
	});
}
