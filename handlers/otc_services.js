const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleOtcServicesCallback({ token, callbackQuery }) {
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

	await fetch(`${TELEGRAM_API}${token}/editMessageText`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			message_id: messageId,
			text: [
				"🟢 <b>OTC-покупка ваших BTC — любая сумма, международные расчёты.</b>",
				"",
				"<b>Вы можете продать Bitcoin на любую сумму через внебиржевую площадку (OTC).</b>",
				"",
				"Подходит для крупных объёмов:",
				"",
				"✅ Работаем официально",
				"✅ Любая сумма",
				"✅ Расчёты в USD, EUR, RUB, USDT",
				"✅ Международные переводы",
				"",
				"<b>📌 Для оформления запроса нажмите кнопку ниже.</b>",
			].join("\n"),
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "📨 Отправить заявку на OTC", callback_data: "leave_otc_request" }],
					[{ text: "В главное меню", callback_data: "continue" }],
				],
			},
		}),
	});
}
