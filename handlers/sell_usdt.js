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
			text: "✅ Вы выбрали: <b>ПРОДАТЬ USDT</b>\nДля вас будет сформирована ссылка и по ней вы будете перенаправлены в <b>официальное P2P-объявление от ИП Золотая А.В (ИНН 232905828857)</b> на бирже Bybit.\nДля подписчиков канала действует специальная скидка на курс обмена USDT на RUB. Эта скидка доступна только в данном боте.\n\n🔐 <b>Всё так же безопасно:</b>\n• Сделка проходит <b>исключительно внутри Bybit.</b>\n• Деньги (рубли) поступают <b>на вашу карту или счёт</b> после подтверждения сделки биржей.\n• Ваши USDT списываются с вашего кошелька только после встречного подтверждения от <b>команды \"MsGold\"</b>, нашего операционного партнера.\n\n💼 <b>Это официальный канал. Никаких «серых» переводов. Всё прозрачно.</b>",
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "Получить ссылку на сделку", callback_data: "sell_usdt_link" }],
					[{ text: "В главное меню", callback_data: "continue" }],
				],
			},
		}),
	});
}
