const TELEGRAM_API = "https://api.telegram.org/bot";

function escapeHtml(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

export async function ensurePendingLinkRequestsTable(db) {
	if (!db) {
		return;
	}

	await db
		.prepare(
			`CREATE TABLE IF NOT EXISTS pending_link_requests (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				user_id INTEGER NOT NULL,
				order_type TEXT NOT NULL CHECK(order_type IN ('buy', 'sell')),
				status TEXT NOT NULL DEFAULT 'waiting' CHECK(status IN ('waiting', 'sent', 'failed', 'expired', 'canceled')),
				requested_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
				expires_at TEXT NOT NULL DEFAULT (datetime('now', '+120 minutes')),
				sent_at TEXT,
				notify_attempts INTEGER NOT NULL DEFAULT 0,
				last_prompt_message_id INTEGER,
				error_text TEXT
			)`
		)
		.run();

	await db
		.prepare(
			`CREATE INDEX IF NOT EXISTS idx_pending_link_waiting
			 ON pending_link_requests (order_type, status, requested_at)`
		)
		.run();

	await db
		.prepare(
			`CREATE INDEX IF NOT EXISTS idx_pending_link_user
			 ON pending_link_requests (user_id, order_type, status)`
		)
		.run();
}

export async function enqueuePendingLinkRequest({ db, userId, orderType, messageId }) {
	if (!db || !userId || !orderType) {
		return { queued: false, reason: "invalid-input" };
	}

	await ensurePendingLinkRequestsTable(db);

	await db
		.prepare(
			`UPDATE pending_link_requests
			 SET status = 'expired'
			 WHERE status = 'waiting'
			   AND expires_at <= CURRENT_TIMESTAMP`
		)
		.run();

	const existingWaiting = await db
		.prepare(
			`SELECT id
			 FROM pending_link_requests
			 WHERE user_id = ?
			   AND order_type = ?
			   AND status = 'waiting'
			 ORDER BY id DESC
			 LIMIT 1`
		)
		.bind(userId, orderType)
		.first();

	if (existingWaiting?.id) {
		await db
			.prepare(
				`UPDATE pending_link_requests
				 SET requested_at = CURRENT_TIMESTAMP,
					 expires_at = datetime('now', '+120 minutes'),
					 last_prompt_message_id = ?,
					 notify_attempts = 0,
					 error_text = NULL
				 WHERE id = ?`
			)
			.bind(messageId || null, existingWaiting.id)
			.run();

		return { queued: true, reason: "refreshed-existing", id: existingWaiting.id };
	}

	const insertResult = await db
		.prepare(
			`INSERT INTO pending_link_requests (
				user_id,
				order_type,
				status,
				requested_at,
				expires_at,
				last_prompt_message_id,
				notify_attempts
			) VALUES (?, ?, 'waiting', CURRENT_TIMESTAMP, datetime('now', '+120 minutes'), ?, 0)`
		)
		.bind(userId, orderType, messageId || null)
		.run();

	return { queued: true, reason: "created", id: insertResult?.meta?.last_row_id || null };
}

export async function deliverPendingLinkRequests({
	db,
	token,
	orderType,
	link,
	adminChatId,
	adminThreadId,
	linkTtlMinutes,
}) {
	if (!db || !token || !orderType || !link) {
		return { delivered: 0, failed: 0, expired: 0 };
	}

	await ensurePendingLinkRequestsTable(db);

	const expireResult = await db
		.prepare(
			`UPDATE pending_link_requests
			 SET status = 'expired'
			 WHERE status = 'waiting'
			   AND order_type = ?
			   AND expires_at <= CURRENT_TIMESTAMP`
		)
		.bind(orderType)
		.run();

	const expiredCount = Number(expireResult?.meta?.changes || 0);

	const waitingRowsResult = await db
		.prepare(
			`SELECT id, user_id, notify_attempts
			 FROM pending_link_requests
			 WHERE status = 'waiting'
			   AND order_type = ?
			   AND expires_at > CURRENT_TIMESTAMP
			 ORDER BY requested_at ASC
			 LIMIT 200`
		)
		.bind(orderType)
		.all();

	const waitingRows = waitingRowsResult?.results || [];
	const safeLink = escapeHtml(link);
	const deliveryText =
		orderType === "buy"
			? [
				"🔗 <b>Ваша персональная ссылка на сделку:</b>",
				`<a href=\"${safeLink}\">${safeLink}</a>`,
				"",
				"Ссылка <b>действительна 30 минут.</b> Не откладывайте сделку!",
				"",
				"📌 <b>Что делать дальше:</b>",
				"Перейдите по ссылке - вы попадете в P2P-объявление моего партнера (Команда MsGold) на Bybit.",
				"",
				"Нажмите <b>«ПОКУПКА USDT»</b> и следуйте инструкциям биржи.",
				"",
				"Оплатите сделку по реквизитам, которые укажет наш операционный партнер.",
				"",
				"После подтверждения оплаты USDT поступят <b>на ваш спотовый кошелек Bybit.</b>",
				"",
				`⏱ <b>Срок жизни ссылки: ${linkTtlMinutes} минут.</b>`,
				"Не откладывайте вход в объявление.",
				"",
				"⚠️ <b>Важно!</b>",
				"- Все расчеты ведутся <b>только внутри платформы Bybit.</b>",
				"- Не переходите по сторонним ссылкам и не переводите деньги напрямую продавцу без подтверждения сделки на бирже.",
				"",
				"- Если у вас еще нет аккаунта на <a href=\"https://partner.bybit.com/b/netormozibtc\">Bybit</a>. Бонусы до 30 000 USDT при регистрации.",
			].join("\n")
			: [
				"🔗 <b>Ваша персональная ссылка на продажу USDT:</b>",
				`<a href=\"${safeLink}\">${safeLink}</a>`,
				"",
				"Ссылка <b>действительна 30 минут.</b> Не откладывайте сделку!",
				"",
				"📌 <b>Инструкция:</b>",
				"Перейдите по ссылке - вы попадете в P2P-объявление моего партнера (Команда MsGold) на Bybit.",
				"",
				"Нажмите <b>«ПРОДАТЬ USDT»</b>. Укажите сумму и подтвердите сделку.",
				"",
				"После подтверждения от команды MsGold <b>вам поступят рубли на вашу карту или счет в вашем банке.</b>",
				"",
				`⏱ <b>Срок жизни ссылки: ${linkTtlMinutes} минут.</b>`,
				"Не откладывайте вход в объявление.",
				"",
				"⚠️ <b>Важно!</b>",
				"- Никогда не переводите USDT напрямую «вручную» - только <b>через интерфейс P2P-сделки на Bybit.</b>",
				"- Все споры и гарантии регулируются <b>системой безопасности Bybit.</b>",
				"",
				"- Если у вас еще нет аккаунта на <a href=\"https://partner.bybit.com/b/netormozibtc\">Bybit</a>. Бонусы до 30 000 USDT при регистрации.",
			].join("\n");

	let delivered = 0;
	let failed = 0;

	for (const row of waitingRows) {
		try {
			const response = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					chat_id: row.user_id,
					text: deliveryText,
					parse_mode: "HTML",
					disable_web_page_preview: true,
					reply_markup: {
						inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
					},
				}),
			});

			if (response.ok) {
				delivered += 1;
				await db
					.prepare(
						`UPDATE pending_link_requests
						 SET status = 'sent',
							 sent_at = CURRENT_TIMESTAMP,
							 notify_attempts = ?
						 WHERE id = ?`
					)
					.bind(Number(row.notify_attempts || 0) + 1, row.id)
					.run();
			} else {
				failed += 1;
				const errorText = await response.text();
				await db
					.prepare(
						`UPDATE pending_link_requests
						 SET status = 'failed',
							 notify_attempts = ?,
							 error_text = ?
						 WHERE id = ?`
					)
					.bind(Number(row.notify_attempts || 0) + 1, String(errorText).slice(0, 1000), row.id)
					.run();
			}
		} catch (error) {
			failed += 1;
			await db
				.prepare(
					`UPDATE pending_link_requests
					 SET status = 'failed',
						 notify_attempts = ?,
						 error_text = ?
					 WHERE id = ?`
				)
				.bind(Number(row.notify_attempts || 0) + 1, String(error).slice(0, 1000), row.id)
				.run();
		}
	}

	const summaryText = [
		"📬 Авторассылка ссылок выполнена",
		"",
		`Тип: ${orderType === "buy" ? "ПОКУПКА USDT" : "ПРОДАЖА USDT"}`,
		`Доставлено: ${delivered}`,
		`Ошибок: ${failed}`,
		`Истекло ожиданий: ${expiredCount}`,
	].join("\n");

	const summaryResponse = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: adminChatId,
			message_thread_id: adminThreadId,
			text: summaryText,
		}),
	});

	if (!summaryResponse.ok) {
		const errorText = await summaryResponse.text();
		console.error("Failed to send pending-link summary to admin topic:", errorText);
	}

	return { delivered, failed, expired: expiredCount };
}
