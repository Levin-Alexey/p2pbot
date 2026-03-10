const TELEGRAM_API = "https://api.telegram.org/bot";
import { handleContinueCallback } from "./handlers/continue.js";
import { handleRequestBotCallback } from "./handlers/request_bot.js";
import { handleBuyUsdtCallback } from "./handlers/buy_usdt.js";
import { handleSellUsdtCallback } from "./handlers/sell_usdt.js";
import { handleSupportCallback } from "./handlers/support.js";
import { handleSendMessageCallback } from "./handlers/send_message.js";
import { handleLargeAmountRequestCallback } from "./handlers/large_amount_request.js";
import { handleLegalExchangeRequestCallback } from "./handlers/legal_exchange_request.js";
import { handleLeaveLegalRequestCallback } from "./handlers/leave_legal_request.js";
import { handleLeaveCompanyRequestCallback } from "./handlers/leave_company_request.js";
import { DAILY_TOPIC_REMINDERS } from "./reminders/daily_topic_reminders.js";

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
				// Save user data to database.
				const user = message?.from;
				if (user && env.DB) {
					try {
						await env.DB
							.prepare(`
								INSERT INTO users (user_id, username, first_name, last_active_at)
								VALUES (?, ?, ?, CURRENT_TIMESTAMP)
								ON CONFLICT(user_id) DO UPDATE SET
									username = excluded.username,
									first_name = excluded.first_name,
									last_active_at = CURRENT_TIMESTAMP
							`)
							.bind(user.id, user.username || null, user.first_name || null)
							.run();
					} catch (dbError) {
						console.error("Database error:", dbError);
					}
				}

				await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, chatId, getStartMessageHtml(), {
					parse_mode: "HTML",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [
							[{ text: "🤖 Хотите такого же бота? Отправьте сообщение", callback_data: "request_bot" }],
							[{ text: "Продолжить", callback_data: "continue" }],
						],
					},
				});
			}

			// Handle text messages with FSM state checking.
			if (chatId && text && text !== "/start") {
				const userId = message?.from?.id;

				if (userId && env.KV && env.DB) {
					try {
						const fsmState = await env.KV.get(`fsm:${userId}`);

						if (fsmState === "waiting_contact") {
							const user = await env.DB
								.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`)
								.bind(userId)
								.first();

							await env.DB
								.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'bot', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`)
								.bind(userId)
								.run();

							const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
							const adminMessage = `Пользователь ${userId} ${userDisplay} оставил заявку на бота\n\nВремя контакта: ${text}`;

							const adminResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									chat_id: "-1003815117903",
									text: adminMessage,
								}),
							});

							if (!adminResponse.ok) {
								const errorText = await adminResponse.text();
								console.error("Failed to send to admin group:", errorText);
							}

							await env.KV.delete(`fsm:${userId}`);

							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"✅ Спасибо! Мы получили вашу заявку. Свяжемся с вами в удобное время.",
							);
						}

						if (fsmState === "waiting_contact_legal_1") {
							const user = await env.DB
								.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`)
								.bind(userId)
								.first();

							await env.DB
								.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'legal', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`)
								.bind(userId)
								.run();

							const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
							const adminMessage = `Пользователь ${userId} ${userDisplay} оставил заявку на сумму более 1 млн \n\n ${text}`;

							const adminResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									chat_id: "-1003815117903",
									text: adminMessage,
								}),
							});

							if (!adminResponse.ok) {
								const errorText = await adminResponse.text();
								console.error("Failed to send to admin group:", errorText);
							}

							await env.KV.delete(`fsm:${userId}`);

							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"✅ Спасибо! Мы получили вашу заявку. Свяжемся с вами в удобное время.",
							);
						}

						if (fsmState === "waiting_contact_large_1") {
							const user = await env.DB
								.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`)
								.bind(userId)
								.first();

							await env.DB
								.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'large', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`)
								.bind(userId)
								.run();

							const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
							const adminMessage = `Пользователь ${userId} ${userDisplay} оставил заявку на юр лицо \n\n ${text}`;

							const adminResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									chat_id: "-1003815117903",
									text: adminMessage,
								}),
							});

							if (!adminResponse.ok) {
								const errorText = await adminResponse.text();
								console.error("Failed to send to admin group:", errorText);
							}

							await env.KV.delete(`fsm:${userId}`);

							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"✅ Спасибо! Мы получили вашу заявку. Свяжемся с вами в удобное время.",
							);
						}
					} catch (dbError) {
						console.error("Database error handling contact message:", dbError);
					}
				}
			}

			if (callbackQuery?.data === "request_bot") {
				await handleRequestBotCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "send_message") {
				await handleSendMessageCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
				});
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

			if (callbackQuery?.data === "large_amount_request") {
				await handleLargeAmountRequestCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "legal_exchange_request") {
				await handleLegalExchangeRequestCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "leave_legal_request") {
				await handleLeaveLegalRequestCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
				});
			}

			if (callbackQuery?.data === "leave_company_request") {
				await handleLeaveCompanyRequestCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
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
	async scheduled(event, env, ctx) {
		if (!env.TELEGRAM_BOT_TOKEN) {
			console.error("TELEGRAM_BOT_TOKEN is not set for scheduled job");
			return;
		}

		ctx.waitUntil(runDailyTopicReminders(env));
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

async function runDailyTopicReminders(env) {
	for (const reminder of DAILY_TOPIC_REMINDERS) {
		if (!reminder.enabled) {
			continue;
		}

		await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, reminder.chatId, reminder.text, {
			message_thread_id: reminder.messageThreadId,
		});
	}
}
