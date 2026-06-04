const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleContinueCallback({ token, callbackQuery }) {
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

	// Edit message with new buttons
	const editUrl = `${TELEGRAM_API}${token}/editMessageText`;
	await fetch(editUrl, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			message_id: messageId,
			text: "Выберите действие:",
			reply_markup: {
				inline_keyboard: [
					[{ text: "💵 ПОКУПКА USDT", callback_data: "buy_usdt" }],
					[{ text: "💰 ПРОДАЖА USDT", callback_data: "sell_usdt" }],
					[{ text: "🏢 Заявка на обмен для юридических лиц (официально)", callback_data: "large_amount_request" }],
					[{ text: "📨 Оставить заявку на крупную сумму", callback_data: "legal_exchange_request" }],
					[{ text: "📊 Курсы обмена на сегодня", callback_data: "today_exchange_rates" }],
					[{ text: "🌍 ВЭД-услуги (внешнеэкономическая деятельность)", callback_data: "ved_services" }],
						[{ text: "🔒 Заморозка аккаунта биржи / Вывод средств после ВЭД", callback_data: "account_unfreeze_services" }],
						[{ text: "🟢 Покупка BTC через OTC биржу (любая сумма, международные расчёты)", callback_data: "otc_services" }],
					[{ text: "📞 Связаться с поддержкой", callback_data: "support" }],
				],
			},
		}),
	});
}
