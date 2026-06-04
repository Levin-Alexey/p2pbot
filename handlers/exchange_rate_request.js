const TELEGRAM_API = "https://api.telegram.org/bot";

export const EXCHANGE_RATE_CHAT_ID = -1003815117903;
export const EXCHANGE_RATE_THREAD_ID = 4;
export const EXCHANGE_RATE_CURRENCY = "USDT";

function normalizeRateValue(rawValue) {
	if (rawValue === null || rawValue === undefined) {
		return null;
	}

	const normalized = String(rawValue).trim().replace(",", ".");
	if (!normalized) {
		return null;
	}

	const parsed = Number(normalized);
	if (!Number.isFinite(parsed) || parsed <= 0) {
		return null;
	}

	return parsed;
}

function parseExchangeRateUpdateMessage(text) {
	if (!text) {
		return { isRateMessage: false, buyRate: null, sellRate: null, error: null };
	}

	const buyMatch = text.match(/(?:^|\n)\s*BUY_RATE\s*=\s*([0-9]+(?:[.,][0-9]+)?)\s*(?:$|\n)/i);
	const sellMatch = text.match(/(?:^|\n)\s*SELL_RATE\s*=\s*([0-9]+(?:[.,][0-9]+)?)\s*(?:$|\n)/i);
	const hasBuyKey = /(?:^|\n)\s*BUY_RATE\s*=/i.test(text);
	const hasSellKey = /(?:^|\n)\s*SELL_RATE\s*=/i.test(text);
	const isRateMessage = hasBuyKey || hasSellKey;

	if (!isRateMessage) {
		return { isRateMessage: false, buyRate: null, sellRate: null, error: null };
	}

	if (!buyMatch || !sellMatch) {
		return {
			isRateMessage: true,
			buyRate: null,
			sellRate: null,
			error: "Формат неполный. Нужны обе строки: BUY_RATE=... и SELL_RATE=...",
		};
	}

	const buyRate = normalizeRateValue(buyMatch[1]);
	const sellRate = normalizeRateValue(sellMatch[1]);

	if (buyRate === null || sellRate === null) {
		return {
			isRateMessage: true,
			buyRate: null,
			sellRate: null,
			error: "Не удалось распознать числа. Используйте формат, например: BUY_RATE=92.50 и SELL_RATE=94.00",
		};
	}

	return { isRateMessage: true, buyRate, sellRate, error: null };
}

async function sendTelegramMessage(token, chatId, text, extra = {}) {
	const response = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text,
			...extra,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to send exchange-rate message: ${response.status} ${errorText}`);
	}
}

export async function ensureExchangeRatesTable(db) {
	if (!db) {
		return;
	}

	await db
		.prepare(
			`CREATE TABLE IF NOT EXISTS exchange_rates (
				id INTEGER PRIMARY KEY,
				currency TEXT DEFAULT 'USDT',
				buy_rate REAL DEFAULT 0.0,
				sell_rate REAL DEFAULT 0.0,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)`
		)
		.run();

	await db
		.prepare(
			`INSERT INTO exchange_rates (id, currency, buy_rate, sell_rate)
			 VALUES (1, 'USDT', 0.0, 0.0)
			 ON CONFLICT(id) DO NOTHING`
		)
		.run();
}

export async function sendDailyExchangeRateRequest({ token }) {
	if (!token) {
		return;
	}

	const text = [
		"⏳ Время обновить курс USDT!",
		"",
		"Отправьте одним сообщением две строки:",
		"BUY_RATE=92.50",
		"SELL_RATE=94.00",
		"",
		"Можно использовать запятую: BUY_RATE=92,50",
	].join("\n");

	await sendTelegramMessage(token, EXCHANGE_RATE_CHAT_ID, text, {
		message_thread_id: EXCHANGE_RATE_THREAD_ID,
	});
}

export async function tryHandleExchangeRateUpdate({ token, db, chatId, threadId, text }) {
	if (!token || !db || !text) {
		return { handled: false, updated: false };
	}

	if (chatId !== EXCHANGE_RATE_CHAT_ID || threadId !== EXCHANGE_RATE_THREAD_ID) {
		return { handled: false, updated: false };
	}

	const parsed = parseExchangeRateUpdateMessage(text);
	if (!parsed.isRateMessage) {
		return { handled: false, updated: false };
	}

	if (parsed.error) {
		await sendTelegramMessage(token, chatId, `❌ ${parsed.error}\n\nПример:\nBUY_RATE=92.50\nSELL_RATE=94.00`, {
			message_thread_id: EXCHANGE_RATE_THREAD_ID,
		});
		return { handled: true, updated: false };
	}

	await ensureExchangeRatesTable(db);

	await db
		.prepare(
			`UPDATE exchange_rates
			 SET currency = ?,
				 buy_rate = ?,
				 sell_rate = ?,
				 updated_at = CURRENT_TIMESTAMP
			 WHERE id = 1`
		)
		.bind(EXCHANGE_RATE_CURRENCY, parsed.buyRate, parsed.sellRate)
		.run();

	await sendTelegramMessage(
		token,
		chatId,
		`✅ Курс USDT обновлен\nBUY_RATE=${parsed.buyRate.toFixed(2)}\nSELL_RATE=${parsed.sellRate.toFixed(2)}`,
		{ message_thread_id: EXCHANGE_RATE_THREAD_ID }
	);

	return { handled: true, updated: true, buyRate: parsed.buyRate, sellRate: parsed.sellRate };
}
