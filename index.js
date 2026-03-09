const TELEGRAM_API = "https://api.telegram.org/bot";
import { handleContinueCallback } from "./handlers/continue.js";
import { handleRequestBotCallback } from "./handlers/request_bot.js";
import { handleBuyUsdtCallback } from "./handlers/buy_usdt.js";
import { handleSellUsdtCallback } from "./handlers/sell_usdt.js";
import { handleSupportCallback } from "./handlers/support.js";

export default {
	async fetch(request, env) {
		try {
			if (request.method === "GET") {
				return new Response("Bot is running", { status: 200 });
			}

			if (request.method !== "POST") {
				return new Response("Method Not Allowed", { status: 405 });
			}

			if (!env.TELEGRAM_BOT_TOKEN) {
				return new Response("TELEGRAM_BOT_TOKEN is not set", { status: 500 });
			}

			let update;
			try {
				update = await request.json();
			} catch {
				return new Response("Invalid JSON", { status: 400 });
			}

			const message = update?.message;
			const chatId = message?.chat?.id;
			const text = message?.text;
			const callbackQuery = update?.callback_query;

			if (chatId && text === "/start") {
			// Save user data to database
			const user = message?.from;
			if (user && env.DB) {
				try {
					await env.DB.prepare(`
						INSERT INTO users (user_id, username, first_name, last_active_at)
						VALUES (?, ?, ?, CURRENT_TIMESTAMP)
						ON CONFLICT(user_id) DO UPDATE SET
							username = excluded.username,
							first_name = excluded.first_name,
							last_active_at = CURRENT_TIMESTAMP
					`).bind(
						user.id,
						user.username || null,
						user.first_name || null
					).run();
				} catch (dbError) {
					console.error("Database error:", dbError);
				}
			}

			await sendTelegramMessage(
				env.TELEGRAM_BOT_TOKEN,
				chatId,
				getStartMessageHtml(),
				{
					parse_mode: "HTML",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[{ text: "🤖 Хотите такого же бота? Отправьте сообщение", callback_data: "request_bot" }],
							[{ text: "Продолжить", callback_data: "continue" }],
						],
					},
				},
			);
		}

			if (callbackQuery?.data === "continue") {
				await handleContinueCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "buy_usdt") {
				await handleBuyUsdtCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "sell_usdt") {
				await handleSellUsdtCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "support") {
				await handleSupportCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			return new Response("OK", { status: 200 });
		} catch (error) {
			console.error("Webhook processing error:", error);
			return new Response("Webhook error", { status: 500 });
		}
	},
};

function getStartMessageHtml() {
    return [
        '👋 Добро пожаловать в официальный P2P-бот команды <b>«НЕ ТОРМОЗИ С BTC»</b>!',
        "",
        "Здесь вы можете <b>быстро, безопасно, дешевле и полностью официально купить USDT</b> через проверенный канал.",
        "",
        "✅ <b>Почему это надёжно?</b>",
        "Все сделки проходят <b>только на криптобирже Bybit</b> - через P2P-систему. Никаких сторонних платформ и «серых» переводов.",
        "",
        "Наш операционный партнёр - <b>ИП Золотая А.В (ИНН 232905828857)</b> - работает официально как <b>ИП с лицензией</b> на обмен и продажу криптовалют.",
        "",
        "Никаких скрытых комиссий. Никаких блокировок от банков. Вы получаете ровно столько USDT, сколько оплатили.",
        "",
        '<b>Александр (автор канала "НЕ ТОРМОЗИ С BTC") лично протестировал и доверяет этому партнёру.</b> Ваши сделки в безопасности.',
        "",
        "💼 <b>Как начать?</b>",
        "Просто выберите действие ниже 👇",
        "",
        '✅ Нажимая «Продолжить», вы принимаете условия <a href="https://ya.ru">Пользовательского соглашения</a> и <a href="https://ya.ru">Политики конфиденциальности</a>.',
    ].join("\n");
}

async function sendTelegramMessage(token, chatId, text, extra = {}) {
	const url = `${TELEGRAM_API}${token}/sendMessage`;

	const response = await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text,
			...extra,
		}),
	});

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`Telegram sendMessage failed: ${response.status} ${details}`);
	}
}
