const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleSubmitFeedbackCallback({ token, callbackQuery, kv, db }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;
	const callbackData = callbackQuery?.data || "";

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
			}),
		});

		if (db && kv) {
			let feedbackRow = null;
			const match = callbackData.match(/^submit_feedback:(\d+)$/);

			if (match?.[1]) {
				feedbackRow = await db
					.prepare("SELECT id FROM order_feedbacks WHERE id = ? AND user_id = ? AND status = 'sent'")
					.bind(Number(match[1]), userId)
					.first();
			}

			// Backward compatibility for old buttons without row id.
			if (!feedbackRow) {
				feedbackRow = await db
					.prepare(
						"SELECT id FROM order_feedbacks WHERE user_id = ? AND status = 'sent' ORDER BY id DESC LIMIT 1"
					)
					.bind(userId)
					.first();
			}

			if (!feedbackRow?.id) {
				await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						chat_id: chatId,
						text: "Не удалось найти активный опрос по этой сделке. Попробуйте нажать кнопку из последнего сообщения.",
					}),
				});
				return;
			}

			await kv.put(`feedback_active:${userId}`, String(feedbackRow.id));
		}

		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "1. Введите ваш UID (по желанию)",
				reply_markup: {
					inline_keyboard: [
						[{ text: "Ввести UID", callback_data: "feedback_enter_uid" }],
						[{ text: "Пропустить", callback_data: "feedback_skip_uid" }],
						[{ text: "В главное меню", callback_data: "continue" }],
					],
				},
			}),
		});

		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_feedback_uid_choice");
		}
	} catch (error) {
		console.error("Error in handleSubmitFeedbackCallback:", error);
	}
}

export async function handleFeedbackEnterUidCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
			}),
		});

		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "Введите ваш UID:",
				reply_markup: {
					inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
				},
			}),
		});

		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_feedback_uid_input");
		}
	} catch (error) {
		console.error("Error in handleFeedbackEnterUidCallback:", error);
	}
}

export async function handleFeedbackSkipUidCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				callback_query_id: callbackQueryId,
			}),
		});

		await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: "Всё ли прошло гладко? (да / есть вопросы). Напишите текст ниже в сообщении.",
				reply_markup: {
					inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
				},
			}),
		});

		if (kv) {
			await kv.put(`fsm:${userId}`, "waiting_feedback_answer");
		}
	} catch (error) {
		console.error("Error in handleFeedbackSkipUidCallback:", error);
	}
}
