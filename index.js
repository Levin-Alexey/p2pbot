const TELEGRAM_API = "https://api.telegram.org/bot";

import { handleContinueCallback } from "./handlers/continue.js";
import { handleRequestBotCallback } from "./handlers/request_bot.js";
import { handleBuyUsdtCallback } from "./handlers/buy_usdt.js";
import { handleBuyUsdtLinkCallback } from "./handlers/buy_usdt_link.js";
import { handleSellUsdtCallback } from "./handlers/sell_usdt.js";
import { handleSellUsdtLinkCallback } from "./handlers/sell_usdt_link.js";
import { handleSupportCallback, handleSupportWriteMessageCallback } from "./handlers/support.js";
import { handleSendMessageCallback } from "./handlers/send_message.js";
import { handleLargeAmountRequestCallback } from "./handlers/large_amount_request.js";
import { handleLegalExchangeRequestCallback } from "./handlers/legal_exchange_request.js";
import { handleLeaveLegalRequestCallback } from "./handlers/leave_legal_request.js";
import { handleLeaveCompanyRequestCallback } from "./handlers/leave_company_request.js";
import {
	handleSubmitFeedbackCallback,
	handleFeedbackEnterUidCallback,
	handleFeedbackSkipUidCallback,
} from "./handlers/submit_feedback.js";
import { DAILY_TOPIC_REMINDERS } from "./reminders/daily_topic_reminders.js";
import { ADMIN_CHAT_ID, ADMIN_THREAD_ID, LINK_TTL_MINUTES, ensureLinkTtlColumns } from "./handlers/link_lifetime.js";
import { deliverPendingLinkRequests } from "./handlers/pending_link_requests.js";

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

			const message = update?.message ?? update?.channel_post ?? update?.edited_message ?? update?.edited_channel_post;
			const chatId = message?.chat?.id;
			const threadId = message?.message_thread_id;
			const text = typeof message?.text === "string" ? message.text.trim() : null;
			const callbackQuery = update?.callback_query;

			// ============================================
			// ОБРАБОТКА ОБНОВЛЕНИЯ ССЫЛОК В ТОПИКЕ
			// ============================================
			if (message && text && chatId === ADMIN_CHAT_ID) {
				try {
					let newLink = null;
					let targetColumn = null;
					let targetCreatedAtColumn = null;

					// Ищем ключевые слова и извлекаем ссылку
					if (text.startsWith("BUY_LINK=")) {
						newLink = text.slice("BUY_LINK=".length).trim();
						targetColumn = "buy_link";
						targetCreatedAtColumn = "buy_link_created_at";
					} else if (text.startsWith("SELL_LINK=")) {
						newLink = text.slice("SELL_LINK=".length).trim();
						targetColumn = "sell_link";
						targetCreatedAtColumn = "sell_link_created_at";
					}

					// Если найдена ссылка, обновляем базу
					if (newLink && targetColumn && targetCreatedAtColumn && env.DB) {
						await ensureLinkTtlColumns(env.DB);

						if (threadId !== ADMIN_THREAD_ID) {
							console.log(`Ignored link update command from wrong topic: ${threadId}`);
							return new Response("OK", { status: 200 });
						}

						try {
							new URL(newLink);
						} catch {
							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"❌ Неверный формат ссылки. Пример: BUY_LINK=https://example.com",
								{ message_thread_id: ADMIN_THREAD_ID }
							);
							return new Response("OK", { status: 200 });
						}

						const query = `UPDATE bot_settings SET ${targetColumn} = ?, ${targetCreatedAtColumn} = CURRENT_TIMESTAMP WHERE id = 1`;
						await env.DB.prepare(query).bind(newLink).run();

						const orderType = targetColumn === "buy_link" ? "buy" : "sell";
						const deliveryStats = await deliverPendingLinkRequests({
							db: env.DB,
							token: env.TELEGRAM_BOT_TOKEN,
							orderType,
							link: newLink,
							adminChatId: ADMIN_CHAT_ID,
							adminThreadId: ADMIN_THREAD_ID,
							linkTtlMinutes: LINK_TTL_MINUTES,
						});

						// Отправляем подтверждение в топик
						const replyText = `✅ Спасибо!\nСсылка для ${targetColumn.toUpperCase()} обновлена. Новая ссылка\n${newLink}`;
						await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, chatId, replyText, {
							message_thread_id: ADMIN_THREAD_ID,
						});

						console.log(
							`[link-update] Updated ${targetColumn} and ${targetCreatedAtColumn} for id=1; delivered=${deliveryStats.delivered}; failed=${deliveryStats.failed}; expired=${deliveryStats.expired}`
						);
					}
				} catch (error) {
					console.error("Error processing link update message:", error);
				}

				return new Response("OK", { status: 200 });
			}

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

			// Handle text and media messages with FSM state checking.
			if (chatId && message && (text ? text !== "/start" : (message.photo || message.document))) {
				const userId = message?.from?.id;

				if (userId && env.KV && env.DB) {
					try {
						const fsmState = await env.KV.get(`fsm:${userId}`);

						if (fsmState === "waiting_feedback_uid_choice") {
							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"Выберите кнопку ниже: «Ввести UID» или «Пропустить».",
								{
									reply_markup: {
										inline_keyboard: [
											[{ text: "Ввести UID", callback_data: "feedback_enter_uid" }],
											[{ text: "Пропустить", callback_data: "feedback_skip_uid" }],
											[{ text: "В главное меню", callback_data: "continue" }],
										],
									},
								}
							);
						}

						if (fsmState === "waiting_feedback_uid_input") {
							await env.DB
								.prepare("UPDATE users SET UID = ?, last_active_at = CURRENT_TIMESTAMP WHERE user_id = ?")
								.bind(text, userId)
								.run();

							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"Всё ли прошло гладко? (да / есть вопросы). Напишите текст ниже в сообщении.",
							);

							await env.KV.put(`fsm:${userId}`, "waiting_feedback_answer");
						}

						if (fsmState === "waiting_feedback_answer") {
							const activeFeedbackId = await env.KV.get(`feedback_active:${userId}`);
							const hasMediaAttachment = Boolean(message.photo || message.document);
							const feedbackText = text || message?.caption || (hasMediaAttachment ? "[медиа без текста]" : "");
							let feedbackRow = null;

							if (activeFeedbackId) {
								feedbackRow = await env.DB
									.prepare("SELECT id, order_id FROM order_feedbacks WHERE id = ? AND user_id = ?")
									.bind(activeFeedbackId, userId)
									.first();

								await env.DB
									.prepare(
										"UPDATE order_feedbacks SET feedback_text = ?, status = 'completed' WHERE id = ? AND user_id = ?"
									)
									.bind(feedbackText, activeFeedbackId, userId)
									.run();
							} else {
								const latestSentFeedback = await env.DB
									.prepare(
										"SELECT id, order_id FROM order_feedbacks WHERE user_id = ? AND status = 'sent' ORDER BY id DESC LIMIT 1"
									)
									.bind(userId)
									.first();

								if (latestSentFeedback?.id) {
									feedbackRow = latestSentFeedback;

									await env.DB
										.prepare(
											"UPDATE order_feedbacks SET feedback_text = ?, status = 'completed' WHERE id = ? AND user_id = ?"
										)
										.bind(feedbackText, latestSentFeedback.id, userId)
										.run();
								}
							}

							const user = await env.DB
								.prepare("SELECT username, first_name, UID FROM users WHERE user_id = ?")
								.bind(userId)
								.first();

							const userName = user?.username ? `@${user.username}` : user?.first_name || "Без имени";
							const userUid = user?.UID || "не указан";
							const feedbackTime = new Date().toISOString();
							const orderIdText = feedbackRow?.order_id ?? "не найден";

							const adminMessage = [
								`Подтверждение сделки ${orderIdText}`,
								"",
								`Текст сообщения: ${feedbackText || "не указан"}`,
								hasMediaAttachment ? `Вложение: ${message.photo ? "фото" : "документ"}` : null,
								`UID: ${userUid}`,
								`Время: ${feedbackTime}`,
								`Пользователь: ${userName}`,
								`ID пользователя: ${userId}`,
							].filter(Boolean).join("\n");

							const adminResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									chat_id: "-1003764590191",
									text: adminMessage,
								}),
							});

							if (!adminResponse.ok) {
								const errorText = await adminResponse.text();
								console.error("Failed to send feedback confirmation to admin group:", errorText);
							}

							if (hasMediaAttachment) {
								const forwardResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/forwardMessage`, {
									method: "POST",
									headers: { "content-type": "application/json" },
									body: JSON.stringify({
										chat_id: "-1003764590191",
										from_chat_id: chatId,
										message_id: message.message_id,
									}),
								});

								if (!forwardResponse.ok) {
									const errorText = await forwardResponse.text();
									console.error("Failed to forward feedback media to admin group:", errorText);
								}
							}

							await env.KV.delete(`fsm:${userId}`);
							await env.KV.delete(`feedback_active:${userId}`);

							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"✅ Ваш отчёт получен и зафиксирован.\n🙏 <b>Спасибо, что воспользовались нашим сервисом!</b>\n\n💎 Вы помогаете нам делать криптосреду <b>прозрачнее, легальнее и безопаснее.</b>\n\n🧾 Все операции проводятся <b>официально, через ИП с лицензией</b>, с полным соблюдением законодательства РФ.\n\n🧾 Мы ценим ваше доверие и продолжаем делать криптосреду <b>прозрачной и безопасной.</b>\n\n🔄 Хотите совершить ещё одну сделку? Просто выберите действие ниже.",
								{
									parse_mode: "HTML",
									reply_markup: {
										inline_keyboard: [
											[{ text: "Главное меню", callback_data: "continue" }],
											[{ text: "📞 Связаться с поддержкой", callback_data: "support" }],
										],
									},
								},
							);
						}

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
									chat_id: "-1003764590191",
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
								{
									reply_markup: {
										inline_keyboard: [[{ text: "Главное меню", callback_data: "continue" }]],
									},
								},
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
									chat_id: "-1003764590191",
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
								{
									reply_markup: {
										inline_keyboard: [[{ text: "Главное меню", callback_data: "continue" }]],
									},
								},
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
									chat_id: "-1003764590191",
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
								{
									reply_markup: {
										inline_keyboard: [[{ text: "Главное меню", callback_data: "continue" }]],
									},
								},
							);
						}

						if (fsmState === "waiting_support_message") {
							const user = await env.DB
								.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`)
								.bind(userId)
								.first();

							const orderResult = await env.DB
								.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'help', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`)
								.bind(userId)
								.run();

							const orderId = orderResult.meta?.last_row_id || "?";
							const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
							const feedbackTime = new Date().toISOString();
							const supportText = text || message?.caption || "(медиафайл без подписи)";

							const adminMessage = [
								"🆘 <b>Запрос в поддержку</b>",
								"",
								`ID заказа: ${orderId}`,
								`Пользователь: ${userDisplay}`,
								`ID пользователя: ${userId}`,
								`Время: ${feedbackTime}`,
								"",
								`Сообщение: ${supportText}`,
							].join("\n");

							const adminResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									chat_id: "-1003764590191",
									text: adminMessage,
									parse_mode: "HTML",
								}),
							});

							if (!adminResponse.ok) {
								const errorText = await adminResponse.text();
								console.error("Failed to send support message to admin group:", errorText);
							}

							// Forward media file (photo or document) to admin group if present
							if (message.photo || message.document) {
								const forwardResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/forwardMessage`, {
									method: "POST",
									headers: { "content-type": "application/json" },
									body: JSON.stringify({
										chat_id: "-1003764590191",
										from_chat_id: chatId,
										message_id: message.message_id,
									}),
								});
								if (!forwardResponse.ok) {
									const errorText = await forwardResponse.text();
									console.error("Failed to forward media to admin group:", errorText);
								}
							}

							await env.KV.delete(`fsm:${userId}`);

							await sendTelegramMessage(
								env.TELEGRAM_BOT_TOKEN,
								chatId,
								"✅ Ваше сообщение отправлено команде поддержки.\n\n<b>Мы ответим вам напрямую</b>, как только обработаем запрос.\n\nСпасибо, что пользуетесь сервисом <b>«НЕ ТОРМОЗИ С BTC»!</b> 🙏",
								{
									parse_mode: "HTML",
									reply_markup: {
										inline_keyboard: [
											[{ text: "Главное меню", callback_data: "continue" }],
										],
									},
								},
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

			if (callbackQuery?.data === "buy_usdt_link") {
				await handleBuyUsdtLinkCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					db: env.DB,
				});
			}

			if (callbackQuery?.data === "sell_usdt") {
				await handleSellUsdtCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
				});
			}

			if (callbackQuery?.data === "sell_usdt_link") {
				await handleSellUsdtLinkCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					db: env.DB,
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
					kv: env.KV,
				});
			}

			if (callbackQuery?.data === "support_write_message") {
				await handleSupportWriteMessageCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
				});
			}

			if (callbackQuery?.data?.startsWith("submit_feedback")) {
				await handleSubmitFeedbackCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
					db: env.DB,
				});
			}

			if (callbackQuery?.data === "feedback_enter_uid") {
				await handleFeedbackEnterUidCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
				});
			}

			if (callbackQuery?.data === "feedback_skip_uid") {
				await handleFeedbackSkipUidCallback({
					token: env.TELEGRAM_BOT_TOKEN,
					callbackQuery,
					kv: env.KV,
				});
			}

			return new Response("OK", { status: 200 });
		} catch (error) {
			console.error("Webhook processing error:", error);
			return new Response("Webhook error", { status: 500 });
		}
	},
	async scheduled(event, env, ctx) {
		if (event.cron === "30 5 * * *") {
			if (!env.TELEGRAM_BOT_TOKEN) {
				console.error("TELEGRAM_BOT_TOKEN is not set for scheduled job");
				return;
			}

			ctx.waitUntil(runDailyTopicReminders(env));
			return;
		}

		if (event.cron === "*/5 * * * *") {
			ctx.waitUntil(runOrderFeedbackTimerCheck(env));
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

async function runOrderFeedbackTimerCheck(env) {
	if (!env.DB || !env.TELEGRAM_BOT_TOKEN) {
		console.error("DB or TELEGRAM_BOT_TOKEN is not set for order feedback timer check");
		return;
	}

	try {
		const dueRows = await env.DB
			.prepare(
				"SELECT id, user_id FROM order_feedbacks WHERE status = 'pending' AND send_after <= CURRENT_TIMESTAMP ORDER BY id ASC LIMIT 100"
			)
			.all();

		const rows = dueRows?.results || [];

		for (const row of rows) {
			try {
				const feedbackText = [
					"✅ Спасибо! Подтвердите, пожалуйста, что сделка завершена.",
					"",
					"📋 Напишите:",
					"Ваш UID на Bybit (По желанию)",
					"Всё ли прошло гладко? (да / есть вопросы). Напишите текст ниже в сообщении.",
					"",
					"Это нужно для прозрачности учёта и быстрого решения возможных проблем.",
				].join("\n");

				const tgResponse = await fetch(`${TELEGRAM_API}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						chat_id: row.user_id,
						text: feedbackText,
						reply_markup: {
							inline_keyboard: [
								[{ text: "📨 Отправить подтверждение", callback_data: `submit_feedback:${row.id}` }],
								[{ text: "В главное меню", callback_data: "continue" }],
							],
						},
					}),
				});

				if (tgResponse.ok) {
					await env.DB
						.prepare("UPDATE order_feedbacks SET status = 'sent' WHERE id = ?")
						.bind(row.id)
						.run();
				} else {
					const errText = await tgResponse.text();
					console.error(`Failed to send feedback message to user ${row.user_id}:`, errText);
				}
			} catch (sendError) {
				console.error(`Error processing feedback row ${row.id}:`, sendError);
			}
		}

		console.log(`Order feedback timer check complete, processed: ${rows.length}`);
	} catch (error) {
		console.error("Order feedback timer check failed:", error);
	}
}
