const TELEGRAM_API = "https://api.telegram.org/bot";

const MAINTENANCE_TEXT = [
	"⚠️ Временно не работает сервис P2P-обмена USDT.",
	"",
	"Уважаемый клиент, приносим извинения: по независящим от нас причинам мы <b>временно</b> приостановили покупку и продажу USDT через P2P-канал. Все остальные сервисы работают в штатном режиме.",
	"",
	"🔹 Какие услуги продолжают работать:",
	"✅ Оставить заявку на крупную сумму (индивидуальные условия)",
	"✅ Оставить заявку на OTC-сделку (крупные суммы, международные расчёты)",
	"✅ Заявка на обмен для юридических лиц (официально, с документами)",
	"✅ ВЭД-услуги (внешнеэкономическая деятельность, трансграничные платежи)",
	"✅ Заморозка аккаунта биржи / вывод средств (помощь в восстановлении доступа)",
	"✅ Покупка BTC через OTC-биржу (любая сумма, международные расчёты)",
	"✅ Связаться с поддержкой (ответим на все вопросы)",
	"",
	"Мы уже работаем над возобновлением P2P-обмена. Ориентировочно это займёт 1–2 недели. Следите за новостями в канале.",
	"",
	"Спасибо за понимание 🙏",
].join("\n");

export async function handleUsdtMaintenanceCallback({ token, callbackQuery }) {
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
			text: MAINTENANCE_TEXT,
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [[{ text: "Главное меню", callback_data: "continue" }]],
			},
		}),
	});
}
