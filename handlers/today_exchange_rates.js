const TELEGRAM_API = "https://api.telegram.org/bot";

import { ensureExchangeRatesTable } from "./exchange_rate_request.js";

function formatRate(value) {
	const numeric = Number(value);
	if (!Number.isFinite(numeric) || numeric <= 0) {
		return "0.00";
	}

	return numeric.toFixed(2);
}

export async function handleTodayExchangeRatesCallback({ token, callbackQuery, db }) {
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

	let buyRateText = "0.00";
	let sellRateText = "0.00";

	if (db) {
		try {
			await ensureExchangeRatesTable(db);
			const rates = await db
				.prepare("SELECT buy_rate, sell_rate FROM exchange_rates WHERE id = ?")
				.bind(1)
				.first();

			buyRateText = formatRate(rates?.buy_rate);
			sellRateText = formatRate(rates?.sell_rate);
		} catch (error) {
			console.error("Failed to load exchange rates:", error);
		}
	}

	const text = [
		"<b>📊 Курс обмена (P2P-курс) на Bybit (до 1 млн ₽):</b>",
		"",
		`<b>🇺🇸 Купить 1 USDT = ${buyRateText} RUB</b>`,
		"",
		`<b>🇷🇺 Продать 1 USDT = ${sellRateText} RUB</b>`,
		"",
		"<b>Обратите внимание: курс обновляется в режиме реального времени и может изменяться каждую минуту.</b>",
		"",
		"📌 Курс плавающий, точный - при запросе сделки.",
		"💼 Крупные суммы (от 1 млн) и юрлица - курс по запросу.",
	].join("\n");

	await fetch(`${TELEGRAM_API}${token}/editMessageText`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			message_id: messageId,
			text,
			parse_mode: "HTML",
			reply_markup: {
				inline_keyboard: [[{ text: "Вернуться в главное меню", callback_data: "continue" }]],
			},
		}),
	});
}
