const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleRequestBotCallback({ token, callbackQuery }) {
	const callbackQueryId = callbackQuery?.id;

	if (!callbackQueryId) {
		return;
	}

	// Stub handler for the "🤖 Хотите такого же бота?" button.
	const url = `${TELEGRAM_API}${token}/answerCallbackQuery`;
	await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
			text: "Скоро добавим функционал...",
			show_alert: false,
		}),
	});
}
