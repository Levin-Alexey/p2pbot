const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSupportCallback({ token, callbackQuery }) {
	const callbackQueryId = callbackQuery?.id;

	if (!callbackQueryId) {
		return;
	}

	// Stub handler for the "Связаться с поддержкой" button.
	const url = `${TELEGRAM_API}${token}/answerCallbackQuery`;
	await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
			text: "Поддержка скоро ответит...",
			show_alert: false,
		}),
	});
}
