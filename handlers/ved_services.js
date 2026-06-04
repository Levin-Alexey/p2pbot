const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleVedServicesCallback({ token, callbackQuery }) {
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
				"🌍 <b>ВЭД-услуги — проводим международные расчёты</b>",
				"",
				"Платежи поставщикам, оплата импорта, вывод выручки.",
				"",
				"Работаем по договору, с полным сопровождением.",
				"",
				"✅ Криптовалюта → фиат (и обратно)",
				"✅ Легальное прохождение валютного контроля",
				"✅ Расчёты с Китаем, Турцией, Европой, ОАЭ и другими странами",
				"✅ Низкие комиссии",
				"",
				"📌 Оставьте заявку — и мы пришлём условия.",
			].join("\n"),
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "📨 Заявка на ВЭД-расчёты", callback_data: "leave_ved_request" }],
					[{ text: "В главное меню", callback_data: "continue" }],
				],
			},
		}),
	});
}
