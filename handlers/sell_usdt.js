const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSellUsdtCallback({ token, callbackQuery }) {
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
			text: "✅ Вы выбрали: <b>ПРОДАЖА USDT</b>\nСейчас вы будете перенаправлены в <b>официальное P2P-объявление от ИП Золотая А.В (ИНН 232905828857)</b> на бирже Bybit.\n\n🔐 <b>Важно</b>:\nВся сделка проходит <b>исключительно внутри Bybit по правилам криптобиржи.</b>\nПродажа выполняется через официальный P2P-сценарий - быстро и безопасно.",
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [[{ text: "Получить ссылку на сделку", callback_data: "sell_usdt_link" }]],
			},
		}),
	});
}
