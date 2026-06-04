const TELEGRAM_API = "https://api.telegram.org/bot";

export async function handleAccountUnfreezeServicesCallback({ token, callbackQuery }) {
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
				"🔒 Проблемы с доступом к бирже?",
				"",
				"<b>Мы помогаем:</b>",
				"",
				"- восстановить доступ к заблокированному аккаунту",
				"",
				"- вывести средства с замороженного счёта",
				"",
				"- взаимодействовать с поддержкой биржи",
				"",
				"✅ Работаем с разными криптобиржами и банками",
				"✅ Вывод на ваш кошелёк или фиат",
				"✅ Конфиденциально и официально (договор)",
				"",
				"📌 Оставьте заявку — и мы свяжемся с вами.",
			].join("\n"),
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [
					[{ text: "📨 Заявка на разблокировку / вывод", callback_data: "leave_account_unfreeze_request" }],
					[{ text: "В главное меню", callback_data: "continue" }],
				],
			},
		}),
	});
}
