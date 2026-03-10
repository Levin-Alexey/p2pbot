const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleLargeAmountRequestCallback({ token, callbackQuery }) {
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
			text: "🏢 <b>Услуга для юридических лиц</b>\n\nМы понимаем: компаниям нужна <b>прозрачность и полный пакет закрывающих документов.</b>\n\nНаши официальные партнёры совершат обмен и предоставлят юридическим лицам:\n✅ договор\n✅ счёт на оплату\n✅ акт приёма-передачи\n✅ документы для ФНС\n\n📌 <b>Оставьте заявку - и мы оперативно подготовим индивидуальные условия под ваш запрос.</b>",
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "👉 📨 Оставить заявку для юрлиц", callback_data: "leave_company_request" }],
				],
			},
		}),
	});
}
