const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSellUsdtCallback({ token, callbackQuery }) {
	const callbackQueryId = callbackQuery?.id;

	if (!callbackQueryId) {
		return;
	}

	// Stub handler for the "ПРОДАЖА USDT" button.
	const url = `${TELEGRAM_API}${token}/answerCallbackQuery`;
	await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
			text: "Функция продажи в разработке...",
			show_alert: false,
		}),
	});
}
