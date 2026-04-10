const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleBuyUsdtCallback({ token, callbackQuery }) {
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
			text: "✅ Вы выбрали: <b>ПОКУПКА USDT</b>\nДля вас будет сформирована ссылка и по ней вы будете перенаправлены в <b>официальное P2P-объявление от ИП Золотая А.В (ИНН 232905828857)</b> на бирже Bybit.\n\nДля подписчиков канала действует специальная скидка на курс обмена RUB на USDT. Эта скидка доступна только в данном боте.\n\n<b>🔐 Важно: </b>Вся сделка проходит <b>исключительно внутри Bybit по правилам криптобиржи.</b>\nДеньги зачисляются напрямую на ваш аккаунт на бирже — быстро и без риска.",
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "Получить ссылку на сделку", callback_data: "buy_usdt_link" }],
					[{ text: "В главное меню", callback_data: "continue" }],
				],
			},
		}),
	});
}
