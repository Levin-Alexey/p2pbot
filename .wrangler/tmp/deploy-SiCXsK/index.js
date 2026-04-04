var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// handlers/continue.js
var TELEGRAM_API = "https://api.telegram.org/bot";
async function handleContinueCallback({ token, callbackQuery }) {
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
      callback_query_id: callbackQueryId
    })
  });
  const editUrl = `${TELEGRAM_API}${token}/editMessageText`;
  await fetch(editUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435:",
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F4B5} \u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT", callback_data: "buy_usdt" }],
          [{ text: "\u{1F4B0} \u041F\u0420\u041E\u0414\u0410\u0416\u0410 USDT", callback_data: "sell_usdt" }],
          [{ text: "\u{1F3E2} \u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u043E\u0431\u043C\u0435\u043D \u0434\u043B\u044F \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043B\u0438\u0446 (\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E)", callback_data: "large_amount_request" }],
          [{ text: "\u{1F4E8} \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u043A\u0440\u0443\u043F\u043D\u0443\u044E \u0441\u0443\u043C\u043C\u0443", callback_data: "legal_exchange_request" }],
          [{ text: "\u{1F4DE} \u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u043E\u0439", callback_data: "support" }]
        ]
      }
    })
  });
}
__name(handleContinueCallback, "handleContinueCallback");

// handlers/request_bot.js
var TELEGRAM_API2 = "https://api.telegram.org/bot";
async function handleRequestBotCallback({ token, callbackQuery }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  await fetch(`${TELEGRAM_API2}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  const editUrl = `${TELEGRAM_API2}${token}/editMessageText`;
  await fetch(editUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: "\u{1F916} <b>\u0425\u043E\u0442\u0438\u0442\u0435 \u0442\u0430\u043A\u043E\u0433\u043E \u0436\u0435 \u0431\u043E\u0442\u0430 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0438\u043B\u0438 \u043A\u0430\u043D\u0430\u043B\u0430?</b>\n\n\u041C\u044B \u043C\u043E\u0436\u0435\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C <b>\u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043F\u043E\u0434 \u043A\u043B\u044E\u0447</b>:\n- Telegram-\u0431\u043E\u0442 \u0441 P2P-\u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F\u043C\u0438\n- \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430\u043C\u0438 / \u0431\u0438\u0440\u0436\u0430\u043C\u0438\n- \u043F\u0440\u043E\u0441\u0442\u0430\u044F CRM \u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\n- \u043F\u043E\u043B\u043D\u044B\u0439 \u043A\u043E\u0434 \u0432 \u0432\u0430\u0448\u0443 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C\n\n\u{1F4EC} <b>\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C</b>, \u0438 \u043C\u044B \u043E\u0431\u0441\u0443\u0434\u0438\u043C \u0434\u0435\u0442\u0430\u043B\u0438:",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", callback_data: "send_message" }],
          [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
        ]
      }
    })
  });
}
__name(handleRequestBotCallback, "handleRequestBotCallback");

// handlers/buy_usdt.js
var TELEGRAM_API3 = "https://api.telegram.org/bot";
async function handleBuyUsdtCallback({ token, callbackQuery }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  await fetch(`${TELEGRAM_API3}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  const editUrl = `${TELEGRAM_API3}${token}/editMessageText`;
  await fetch(editUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: "\u2705 \u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438:\n<b>\u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT</b>\n\u0414\u043B\u044F \u0432\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438 \u043F\u043E \u043D\u0435\u0439 \u0432\u044B \u0431\u0443\u0434\u0435\u0442\u0435 \u043F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u0432 <b>\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 P2P-\u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442 \u0418\u041F \u0417\u043E\u043B\u043E\u0442\u0430\u044F \u0410.\u0412 (\u0418\u041D\u041D 232905828857)</b> \u043D\u0430 \u0431\u0438\u0440\u0436\u0435 Bybit.\n\n\u0414\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432 \u043A\u0430\u043D\u0430\u043B\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u043A\u0438\u0434\u043A\u0430 \u043D\u0430 \u043A\u0443\u0440\u0441 \u043E\u0431\u043C\u0435\u043D\u0430 RUB \u043D\u0430 USDT. \u042D\u0442\u0430 \u0441\u043A\u0438\u0434\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0434\u0430\u043D\u043D\u043E\u043C \u0431\u043E\u0442\u0435.\n\n<b>\u{1F510} \u0412\u0430\u0436\u043D\u043E:</b>\n\n\u0412\u0441\u044F \u0441\u0434\u0435\u043B\u043A\u0430 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 <b>\u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432\u043D\u0443\u0442\u0440\u0438 Bybit \u043F\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043A\u0440\u0438\u043F\u0442\u043E\u0431\u0438\u0440\u0436\u0438.</b>\n\u0414\u0435\u043D\u044C\u0433\u0438 \u0437\u0430\u0447\u0438\u0441\u043B\u044F\u044E\u0442\u0441\u044F \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043D\u0430 \u0432\u0430\u0448 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u043D\u0430 \u0431\u0438\u0440\u0436\u0435 \u2014 \u0431\u044B\u0441\u0442\u0440\u043E \u0438 \u0431\u0435\u0437 \u0440\u0438\u0441\u043A\u0430.",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443", callback_data: "buy_usdt_link" }],
          [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
        ]
      }
    })
  });
}
__name(handleBuyUsdtCallback, "handleBuyUsdtCallback");

// handlers/link_lifetime.js
var ADMIN_CHAT_ID = -1003815117903;
var ADMIN_THREAD_ID = 4;
var LINK_TTL_MINUTES = 19;
var ttlColumnsEnsured = false;
function parseSqliteTimestampUtc(value) {
  if (!value) {
    return null;
  }
  const raw = String(value).trim();
  if (!raw) {
    return null;
  }
  const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
  const withTimezone = /Z$|[+-]\d{2}:\d{2}$/.test(normalized) ? normalized : `${normalized}Z`;
  const date = new Date(withTimezone);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}
__name(parseSqliteTimestampUtc, "parseSqliteTimestampUtc");
function isDuplicateColumnError(error) {
  const message = String(error?.message || "").toLowerCase();
  return message.includes("duplicate column name") || message.includes("already exists");
}
__name(isDuplicateColumnError, "isDuplicateColumnError");
async function ensureLinkTtlColumns(db) {
  if (!db || ttlColumnsEnsured) {
    return;
  }
  const addColumnStatements = [
    "ALTER TABLE bot_settings ADD COLUMN buy_link_created_at TEXT",
    "ALTER TABLE bot_settings ADD COLUMN sell_link_created_at TEXT"
  ];
  for (const query of addColumnStatements) {
    try {
      await db.prepare(query).run();
      console.log(`[link-ttl] Added column with query: ${query}`);
    } catch (error) {
      if (!isDuplicateColumnError(error)) {
        throw error;
      }
    }
  }
  await db.prepare(
    `UPDATE bot_settings
			 SET buy_link_created_at = CASE
					WHEN buy_link_created_at IS NULL AND buy_link IS NOT NULL AND trim(buy_link) != '' THEN CURRENT_TIMESTAMP
					ELSE buy_link_created_at
				 END,
				 sell_link_created_at = CASE
					WHEN sell_link_created_at IS NULL AND sell_link IS NOT NULL AND trim(sell_link) != '' THEN CURRENT_TIMESTAMP
					ELSE sell_link_created_at
				 END
			 WHERE id = 1`
  ).run();
  ttlColumnsEnsured = true;
}
__name(ensureLinkTtlColumns, "ensureLinkTtlColumns");
function getLinkAgeMinutes(createdAtRaw) {
  const createdAt = parseSqliteTimestampUtc(createdAtRaw);
  if (!createdAt) {
    return null;
  }
  return (Date.now() - createdAt.getTime()) / 6e4;
}
__name(getLinkAgeMinutes, "getLinkAgeMinutes");
async function getLinkState({ db, linkType }) {
  if (!db) {
    return {
      link: null,
      linkCreatedAt: null,
      ageMinutes: null,
      isFresh: false
    };
  }
  await ensureLinkTtlColumns(db);
  const isBuy = linkType === "buy";
  const linkColumn = isBuy ? "buy_link" : "sell_link";
  const createdAtColumn = isBuy ? "buy_link_created_at" : "sell_link_created_at";
  const settings = await db.prepare(`SELECT ${linkColumn} AS link, ${createdAtColumn} AS link_created_at FROM bot_settings WHERE id = ?`).bind(1).first();
  const link = settings?.link && String(settings.link).trim() ? String(settings.link).trim() : null;
  const linkCreatedAt = settings?.link_created_at || null;
  const ageMinutes = getLinkAgeMinutes(linkCreatedAt);
  const isFresh = Boolean(link && ageMinutes !== null && ageMinutes < LINK_TTL_MINUTES);
  return {
    link,
    linkCreatedAt,
    ageMinutes,
    isFresh
  };
}
__name(getLinkState, "getLinkState");

// handlers/pending_link_requests.js
var TELEGRAM_API4 = "https://api.telegram.org/bot";
function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
__name(escapeHtml, "escapeHtml");
async function ensurePendingLinkRequestsTable(db) {
  if (!db) {
    return;
  }
  await db.prepare(
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
  ).run();
  await db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_pending_link_waiting
			 ON pending_link_requests (order_type, status, requested_at)`
  ).run();
  await db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_pending_link_user
			 ON pending_link_requests (user_id, order_type, status)`
  ).run();
}
__name(ensurePendingLinkRequestsTable, "ensurePendingLinkRequestsTable");
async function enqueuePendingLinkRequest({ db, userId, orderType, messageId }) {
  if (!db || !userId || !orderType) {
    return { queued: false, reason: "invalid-input" };
  }
  await ensurePendingLinkRequestsTable(db);
  await db.prepare(
    `UPDATE pending_link_requests
			 SET status = 'expired'
			 WHERE status = 'waiting'
			   AND expires_at <= CURRENT_TIMESTAMP`
  ).run();
  const existingWaiting = await db.prepare(
    `SELECT id
			 FROM pending_link_requests
			 WHERE user_id = ?
			   AND order_type = ?
			   AND status = 'waiting'
			 ORDER BY id DESC
			 LIMIT 1`
  ).bind(userId, orderType).first();
  if (existingWaiting?.id) {
    await db.prepare(
      `UPDATE pending_link_requests
				 SET requested_at = CURRENT_TIMESTAMP,
					 expires_at = datetime('now', '+120 minutes'),
					 last_prompt_message_id = ?,
					 notify_attempts = 0,
					 error_text = NULL
				 WHERE id = ?`
    ).bind(messageId || null, existingWaiting.id).run();
    return { queued: true, reason: "refreshed-existing", id: existingWaiting.id };
  }
  const insertResult = await db.prepare(
    `INSERT INTO pending_link_requests (
				user_id,
				order_type,
				status,
				requested_at,
				expires_at,
				last_prompt_message_id,
				notify_attempts
			) VALUES (?, ?, 'waiting', CURRENT_TIMESTAMP, datetime('now', '+120 minutes'), ?, 0)`
  ).bind(userId, orderType, messageId || null).run();
  return { queued: true, reason: "created", id: insertResult?.meta?.last_row_id || null };
}
__name(enqueuePendingLinkRequest, "enqueuePendingLinkRequest");
async function deliverPendingLinkRequests({
  db,
  token,
  orderType,
  link,
  adminChatId,
  adminThreadId,
  linkTtlMinutes
}) {
  if (!db || !token || !orderType || !link) {
    return { delivered: 0, failed: 0, expired: 0 };
  }
  await ensurePendingLinkRequestsTable(db);
  const expireResult = await db.prepare(
    `UPDATE pending_link_requests
			 SET status = 'expired'
			 WHERE status = 'waiting'
			   AND order_type = ?
			   AND expires_at <= CURRENT_TIMESTAMP`
  ).bind(orderType).run();
  const expiredCount = Number(expireResult?.meta?.changes || 0);
  const waitingRowsResult = await db.prepare(
    `SELECT id, user_id, notify_attempts
			 FROM pending_link_requests
			 WHERE status = 'waiting'
			   AND order_type = ?
			   AND expires_at > CURRENT_TIMESTAMP
			 ORDER BY requested_at ASC
			 LIMIT 200`
  ).bind(orderType).all();
  const waitingRows = waitingRowsResult?.results || [];
  const safeLink = escapeHtml(link);
  const deliveryText = orderType === "buy" ? [
    "\u{1F517} <b>\u0412\u0430\u0448\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443:</b>",
    `<a href="${safeLink}">${safeLink}</a>`,
    "",
    "\u0421\u0441\u044B\u043B\u043A\u0430 <b>\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u0430 20 \u043C\u0438\u043D\u0443\u0442.</b> \u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443!",
    "",
    "\u{1F4CC} <b>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435:</b>",
    "\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 - \u0432\u044B \u043F\u043E\u043F\u0430\u0434\u0435\u0442\u0435 \u0432 P2P-\u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u043E\u0435\u0433\u043E \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430 (\u041A\u043E\u043C\u0430\u043D\u0434\u0430 MsGold) \u043D\u0430 Bybit.",
    "",
    "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 <b>\xAB\u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT\xBB</b> \u0438 \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F\u043C \u0431\u0438\u0440\u0436\u0438.",
    "",
    "\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443 \u043F\u043E \u0440\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0443\u043A\u0430\u0436\u0435\u0442 \u043D\u0430\u0448 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440.",
    "",
    "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043E\u043F\u043B\u0430\u0442\u044B USDT \u043F\u043E\u0441\u0442\u0443\u043F\u044F\u0442 <b>\u043D\u0430 \u0432\u0430\u0448 \u0441\u043F\u043E\u0442\u043E\u0432\u044B\u0439 \u043A\u043E\u0448\u0435\u043B\u0435\u043A Bybit.</b>",
    "",
    `\u23F1 <b>\u0421\u0440\u043E\u043A \u0436\u0438\u0437\u043D\u0438 \u0441\u0441\u044B\u043B\u043A\u0438: ${linkTtlMinutes} \u043C\u0438\u043D\u0443\u0442.</b>`,
    "\u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0445\u043E\u0434 \u0432 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435.",
    "",
    "\u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E!</b>",
    "- \u0412\u0441\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044B \u0432\u0435\u0434\u0443\u0442\u0441\u044F <b>\u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B Bybit.</b>",
    "- \u041D\u0435 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u043C \u0441\u0441\u044B\u043B\u043A\u0430\u043C \u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442\u0435 \u0434\u0435\u043D\u044C\u0433\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u0443 \u0431\u0435\u0437 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0441\u0434\u0435\u043B\u043A\u0438 \u043D\u0430 \u0431\u0438\u0440\u0436\u0435.",
    "",
    '- \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 <a href="https://partner.bybit.com/b/netormozibtc">Bybit</a>. \u0411\u043E\u043D\u0443\u0441\u044B \u0434\u043E 30 000 USDT \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.'
  ].join("\n") : [
    "\u{1F517} <b>\u0412\u0430\u0448\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0443 USDT:</b>",
    `<a href="${safeLink}">${safeLink}</a>`,
    "",
    "\u0421\u0441\u044B\u043B\u043A\u0430 <b>\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u0430 20 \u043C\u0438\u043D\u0443\u0442.</b> \u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443!",
    "",
    "\u{1F4CC} <b>\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F:</b>",
    "\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 - \u0432\u044B \u043F\u043E\u043F\u0430\u0434\u0435\u0442\u0435 \u0432 P2P-\u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u043E\u0435\u0433\u043E \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430 (\u041A\u043E\u043C\u0430\u043D\u0434\u0430 MsGold) \u043D\u0430 Bybit.",
    "",
    "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 <b>\xAB\u041F\u0420\u041E\u0414\u0410\u0422\u042C USDT\xBB</b>. \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0443\u043C\u043C\u0443 \u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443.",
    "",
    "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043E\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B MsGold <b>\u0432\u0430\u043C \u043F\u043E\u0441\u0442\u0443\u043F\u044F\u0442 \u0440\u0443\u0431\u043B\u0438 \u043D\u0430 \u0432\u0430\u0448\u0443 \u043A\u0430\u0440\u0442\u0443 \u0438\u043B\u0438 \u0441\u0447\u0435\u0442 \u0432 \u0432\u0430\u0448\u0435\u043C \u0431\u0430\u043D\u043A\u0435.</b>",
    "",
    `\u23F1 <b>\u0421\u0440\u043E\u043A \u0436\u0438\u0437\u043D\u0438 \u0441\u0441\u044B\u043B\u043A\u0438: ${linkTtlMinutes} \u043C\u0438\u043D\u0443\u0442.</b>`,
    "\u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0445\u043E\u0434 \u0432 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435.",
    "",
    "\u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E!</b>",
    "- \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442\u0435 USDT \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \xAB\u0432\u0440\u0443\u0447\u043D\u0443\u044E\xBB - \u0442\u043E\u043B\u044C\u043A\u043E <b>\u0447\u0435\u0440\u0435\u0437 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 P2P-\u0441\u0434\u0435\u043B\u043A\u0438 \u043D\u0430 Bybit.</b>",
    "- \u0412\u0441\u0435 \u0441\u043F\u043E\u0440\u044B \u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0438 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u044E\u0442\u0441\u044F <b>\u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 Bybit.</b>",
    "",
    '- \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 <a href="https://partner.bybit.com/b/netormozibtc">Bybit</a>. \u0411\u043E\u043D\u0443\u0441\u044B \u0434\u043E 30 000 USDT \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.'
  ].join("\n");
  let delivered = 0;
  let failed = 0;
  for (const row of waitingRows) {
    try {
      const response = await fetch(`${TELEGRAM_API4}${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: row.user_id,
          text: deliveryText,
          parse_mode: "HTML",
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
          }
        })
      });
      if (response.ok) {
        delivered += 1;
        await db.prepare(
          `UPDATE pending_link_requests
						 SET status = 'sent',
							 sent_at = CURRENT_TIMESTAMP,
							 notify_attempts = ?
						 WHERE id = ?`
        ).bind(Number(row.notify_attempts || 0) + 1, row.id).run();
      } else {
        failed += 1;
        const errorText = await response.text();
        await db.prepare(
          `UPDATE pending_link_requests
						 SET status = 'failed',
							 notify_attempts = ?,
							 error_text = ?
						 WHERE id = ?`
        ).bind(Number(row.notify_attempts || 0) + 1, String(errorText).slice(0, 1e3), row.id).run();
      }
    } catch (error) {
      failed += 1;
      await db.prepare(
        `UPDATE pending_link_requests
					 SET status = 'failed',
						 notify_attempts = ?,
						 error_text = ?
					 WHERE id = ?`
      ).bind(Number(row.notify_attempts || 0) + 1, String(error).slice(0, 1e3), row.id).run();
    }
  }
  const summaryText = [
    "\u{1F4EC} \u0410\u0432\u0442\u043E\u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u0441\u0441\u044B\u043B\u043E\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430",
    "",
    `\u0422\u0438\u043F: ${orderType === "buy" ? "\u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT" : "\u041F\u0420\u041E\u0414\u0410\u0416\u0410 USDT"}`,
    `\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E: ${delivered}`,
    `\u041E\u0448\u0438\u0431\u043E\u043A: ${failed}`,
    `\u0418\u0441\u0442\u0435\u043A\u043B\u043E \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0439: ${expiredCount}`
  ].join("\n");
  const summaryResponse = await fetch(`${TELEGRAM_API4}${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: adminChatId,
      message_thread_id: adminThreadId,
      text: summaryText
    })
  });
  if (!summaryResponse.ok) {
    const errorText = await summaryResponse.text();
    console.error("Failed to send pending-link summary to admin topic:", errorText);
  }
  return { delivered, failed, expired: expiredCount };
}
__name(deliverPendingLinkRequests, "deliverPendingLinkRequests");

// handlers/buy_usdt_link.js
var TELEGRAM_API5 = "https://api.telegram.org/bot";
function escapeHtml2(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
__name(escapeHtml2, "escapeHtml");
async function handleBuyUsdtLinkCallback({ token, callbackQuery, db }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  const userId = callbackQuery?.from?.id;
  const userName = callbackQuery?.from?.username ? `@${callbackQuery.from.username}` : callbackQuery?.from?.first_name || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438";
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  let buyLink = null;
  let linkAgeMinutes = null;
  let isFreshLink = false;
  await fetch(`${TELEGRAM_API5}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  if (db) {
    try {
      const linkState = await getLinkState({ db, linkType: "buy" });
      buyLink = linkState.link;
      linkAgeMinutes = linkState.ageMinutes;
      isFreshLink = linkState.isFresh;
      console.log(
        `[link-check] type=buy user=${userId || "unknown"} hasLink=${Boolean(buyLink)} ageMinutes=${linkAgeMinutes === null ? "null" : linkAgeMinutes.toFixed(2)} isFresh=${isFreshLink}`
      );
    } catch (dbError) {
      console.error("Failed to load buy link state from bot_settings:", dbError);
    }
  } else {
    console.error("D1 DB is not available for buy link state");
  }
  if (!isFreshLink) {
    if (db && userId) {
      try {
        const queueResult = await enqueuePendingLinkRequest({
          db,
          userId,
          orderType: "buy",
          messageId
        });
        console.log(
          `[pending-link] type=buy user=${userId} queued=${queueResult?.queued} reason=${queueResult?.reason || "unknown"}`
        );
      } catch (queueError) {
        console.error("Failed to enqueue pending buy link request:", queueError);
      }
    }
    const waitingText = [
      "\u23F3 \u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443 \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442\u0441\u044F.",
      "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 <b>3\u20135 \u043C\u0438\u043D\u0443\u0442</b>.",
      "\u041C\u044B \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u043C \u0432\u0430\u0441, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0441\u044B\u043B\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u0433\u043E\u0442\u043E\u0432\u0430.",
      "",
      "\u{1F393} \u041A\u0441\u0442\u0430\u0442\u0438, \u0447\u0442\u043E\u0431\u044B \u0432\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u043F\u0440\u043E\u0448\u043B\u043E \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0439:",
      "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 YouTube-\u043A\u0430\u043D\u0430\u043B \u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u0430. \u0422\u0430\u043C \u043E\u043D \u043F\u0440\u043E\u0441\u0442\u044B\u043C \u044F\u0437\u044B\u043A\u043E\u043C \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437, \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B \u0438 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0440\u044B\u043D\u043A\u0430.",
      '\u{1F4FA} <a href="https://www.youtube.com/@netormoziBTC">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043A\u0430\u043D\u0430\u043B</a>'
    ].join("\n");
    await fetch(`${TELEGRAM_API5}${token}/editMessageText`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: waitingText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    const moscowRequestTime = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date());
    const partnerNotice = [
      "\u{1F504} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443",
      "",
      "\u0422\u0438\u043F: \u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT",
      `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${userName} (${userId || "unknown"})`,
      `\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (MSK): ${moscowRequestTime}`,
      `\u041F\u0440\u0438\u0447\u0438\u043D\u0430: ${buyLink ? `\u0441\u0441\u044B\u043B\u043A\u0430 \u0441\u0442\u0430\u0440\u0448\u0435 ${LINK_TTL_MINUTES} \u043C\u0438\u043D\u0443\u0442` : "\u0441\u0441\u044B\u043B\u043A\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"}`,
      "",
      "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u0432 \u044D\u0442\u043E\u0442 \u0442\u043E\u043F\u0438\u043A: BUY_LINK=https://..."
    ].join("\n");
    const partnerNoticeResponse = await fetch(`${TELEGRAM_API5}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        message_thread_id: ADMIN_THREAD_ID,
        text: partnerNotice
      })
    });
    if (!partnerNoticeResponse.ok) {
      const errorText = await partnerNoticeResponse.text();
      console.error("Failed to send buy link refresh notice to admin topic:", errorText);
    }
  } else {
    const safeBuyLink = escapeHtml2(buyLink);
    const text = [
      "\u{1F517} <b>\u0412\u0430\u0448\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443:</b>",
      `<a href="${safeBuyLink}">${safeBuyLink}</a>`,
      "",
      "\u0421\u0441\u044B\u043B\u043A\u0430 <b>\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u0430 20 \u043C\u0438\u043D\u0443\u0442.</b> \u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443!",
      "",
      "\u{1F4CC} <b>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435:</b>",
      "\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 - \u0432\u044B \u043F\u043E\u043F\u0430\u0434\u0435\u0442\u0435 \u0432 P2P-\u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u043E\u0435\u0433\u043E \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430 (\u041A\u043E\u043C\u0430\u043D\u0434\u0430 MsGold) \u043D\u0430 Bybit.",
      "",
      "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 <b>\xAB\u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT\xBB</b> \u0438 \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F\u043C \u0431\u0438\u0440\u0436\u0438.",
      "",
      "\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443 \u043F\u043E \u0440\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0443\u043A\u0430\u0436\u0435\u0442 \u043D\u0430\u0448 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u0442\u043D\u0435\u0440.",
      "",
      "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043E\u043F\u043B\u0430\u0442\u044B USDT \u043F\u043E\u0441\u0442\u0443\u043F\u044F\u0442 <b>\u043D\u0430 \u0432\u0430\u0448 \u0441\u043F\u043E\u0442\u043E\u0432\u044B\u0439 \u043A\u043E\u0448\u0435\u043B\u0435\u043A Bybit.</b>",
      "",
      "\u23F1 <b>\u0421\u0440\u043E\u043A \u0436\u0438\u0437\u043D\u0438 \u0441\u0441\u044B\u043B\u043A\u0438: 20 \u043C\u0438\u043D\u0443\u0442.</b>",
      "\u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0445\u043E\u0434 \u0432 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435.",
      "",
      "\u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E!</b>",
      "- \u0412\u0441\u0435 \u0440\u0430\u0441\u0447\u0435\u0442\u044B \u0432\u0435\u0434\u0443\u0442\u0441\u044F <b>\u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B Bybit.</b>",
      "- \u041D\u0435 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u043C \u0441\u0441\u044B\u043B\u043A\u0430\u043C \u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442\u0435 \u0434\u0435\u043D\u044C\u0433\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u0443 \u0431\u0435\u0437 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0441\u0434\u0435\u043B\u043A\u0438 \u043D\u0430 \u0431\u0438\u0440\u0436\u0435.",
      "",
      '- \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 <a href="https://partner.bybit.com/b/netormozibtc">Bybit</a>. \u0411\u043E\u043D\u0443\u0441\u044B \u0434\u043E 30 000 USDT \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.'
    ].join("\n");
    await fetch(`${TELEGRAM_API5}${token}/editMessageText`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
  }
  if (db && userId) {
    try {
      const createdOrder = await db.prepare(
        `INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
					 VALUES (?, 'buy', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
					 RETURNING order_id`
      ).bind(userId).first();
      let orderId = createdOrder?.order_id;
      if (!orderId) {
        const latestOrder = await db.prepare("SELECT order_id FROM orders WHERE user_id = ? AND order_type = 'buy' ORDER BY order_id DESC LIMIT 1").bind(userId).first();
        orderId = latestOrder?.order_id;
      }
      if (orderId) {
        try {
          await db.prepare(
            `INSERT INTO order_feedbacks (order_id, user_id, send_after)
							 VALUES (?, ?, datetime('now', '+180 minutes'))`
          ).bind(orderId, userId).run();
        } catch (feedbackError) {
          await db.prepare("DELETE FROM orders WHERE order_id = ?").bind(orderId).run();
          throw new Error(`Failed to create linked order_feedbacks row: ${feedbackError}`);
        }
        const requestTime = new Intl.DateTimeFormat("ru-RU", {
          timeZone: "Europe/Moscow",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(/* @__PURE__ */ new Date());
        const fullAdminText = [
          `\u{1F514} \u041D\u043E\u0432\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442! ${userName} ${userId}`,
          "",
          "\u041A\u043B\u0438\u0435\u043D\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u043B \u0441\u0434\u0435\u043B\u043A\u0443:",
          "\u{1F9FE} \u0422\u0438\u043F: \u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT",
          `\u{1F550} \u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430: ${requestTime}`
        ].join("\n");
        const shortAdminText = [
          `\u{1F514} \u041D\u043E\u0432\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442 ${orderId}!`,
          "",
          "\u041A\u043B\u0438\u0435\u043D\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u043B \u0441\u0434\u0435\u043B\u043A\u0443:",
          "",
          "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
          "",
          "\u{1F9FE} \u0422\u0438\u043F: [\u041F\u041E\u041A\u0423\u041F\u041A\u0410 USDT]",
          "",
          "<B>\u0412\u042B \u0421\u041E\u0417\u0414\u0410\u0415\u0422\u0415 \u041E\u0411\u042A\u042F\u0412\u041B\u0415\u041D\u0418\u0415 \u041D\u0410 \u041F\u0420\u041E\u0414\u0410\u0416\u0410 USDT (SELL)</B>",
          `\u{1F550} \u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430: [${requestTime}]`,
          "",
          "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"
        ].join("\n");
        const shortAdminResponse = await fetch(`${TELEGRAM_API5}${token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1003815117903",
            text: shortAdminText
          })
        });
        if (!shortAdminResponse.ok) {
          const errorText = await shortAdminResponse.text();
          console.error("Failed to send short buy order to admin group:", errorText);
        }
        const fullAdminResponse = await fetch(`${TELEGRAM_API5}${token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1003764590191",
            text: fullAdminText
          })
        });
        if (fullAdminResponse.ok) {
          const adminResult = await fullAdminResponse.json();
          const adminMessageId = adminResult?.result?.message_id;
          if (adminMessageId) {
            await db.prepare("UPDATE orders SET admin_message_id = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?").bind(adminMessageId, orderId).run();
          }
        } else {
          const errorText = await fullAdminResponse.text();
          console.error("Failed to send full buy order to admin group:", errorText);
        }
      }
    } catch (dbError) {
      console.error("Failed to create buy order:", dbError);
    }
  }
}
__name(handleBuyUsdtLinkCallback, "handleBuyUsdtLinkCallback");

// handlers/sell_usdt.js
var TELEGRAM_API6 = "https://api.telegram.org/bot";
async function handleSellUsdtCallback({ token, callbackQuery }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  await fetch(`${TELEGRAM_API6}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  await fetch(`${TELEGRAM_API6}${token}/editMessageText`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: '\u2705 \u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438: <b>\u041F\u0420\u041E\u0414\u0410\u0422\u042C USDT</b>\n\u0414\u043B\u044F \u0432\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438 \u043F\u043E \u043D\u0435\u0439 \u0432\u044B \u0431\u0443\u0434\u0435\u0442\u0435 \u043F\u0435\u0440\u0435\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u0432 <b>\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 P2P-\u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442 \u0418\u041F \u0417\u043E\u043B\u043E\u0442\u0430\u044F \u0410.\u0412 (\u0418\u041D\u041D 232905828857)</b> \u043D\u0430 \u0431\u0438\u0440\u0436\u0435 Bybit.\n\n\u0414\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432 \u043A\u0430\u043D\u0430\u043B\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u043A\u0438\u0434\u043A\u0430 \u043D\u0430 \u043A\u0443\u0440\u0441 \u043E\u0431\u043C\u0435\u043D\u0430 USDT \u043D\u0430 RUB. \u042D\u0442\u0430 \u0441\u043A\u0438\u0434\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0434\u0430\u043D\u043D\u043E\u043C \u0431\u043E\u0442\u0435.\n\n\u{1F510} <b>\u0412\u0441\u0451 \u0442\u0430\u043A \u0436\u0435 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E:</b>\n\u2022 \u0421\u0434\u0435\u043B\u043A\u0430 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 <b>\u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432\u043D\u0443\u0442\u0440\u0438 Bybit.</b>\n\u2022 \u0414\u0435\u043D\u044C\u0433\u0438 (\u0440\u0443\u0431\u043B\u0438) \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u044E\u0442 <b>\u043D\u0430 \u0432\u0430\u0448\u0443 \u043A\u0430\u0440\u0442\u0443 \u0438\u043B\u0438 \u0441\u0447\u0451\u0442</b> \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0441\u0434\u0435\u043B\u043A\u0438 \u0431\u0438\u0440\u0436\u0435\u0439.\n\u2022 \u0412\u0430\u0448\u0438 USDT \u0441\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0441 \u0432\u0430\u0448\u0435\u0433\u043E \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u0432\u0441\u0442\u0440\u0435\u0447\u043D\u043E\u0433\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043E\u0442 <b>\u043A\u043E\u043C\u0430\u043D\u0434\u044B "MsGold"</b>, \u043D\u0430\u0448\u0435\u0433\u043E \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0433\u043E \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430.\n\n\u{1F4BC} <b>\u042D\u0442\u043E \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \xAB\u0441\u0435\u0440\u044B\u0445\xBB \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432. \u0412\u0441\u0451 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E.</b>',
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443", callback_data: "sell_usdt_link" }],
          [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
        ]
      }
    })
  });
}
__name(handleSellUsdtCallback, "handleSellUsdtCallback");

// handlers/sell_usdt_link.js
var TELEGRAM_API7 = "https://api.telegram.org/bot";
function escapeHtml3(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
__name(escapeHtml3, "escapeHtml");
async function handleSellUsdtLinkCallback({ token, callbackQuery, db }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  const userId = callbackQuery?.from?.id;
  const userName = callbackQuery?.from?.username ? `@${callbackQuery.from.username}` : callbackQuery?.from?.first_name || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438";
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  let sellLink = null;
  let linkAgeMinutes = null;
  let isFreshLink = false;
  await fetch(`${TELEGRAM_API7}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  if (db) {
    try {
      const linkState = await getLinkState({ db, linkType: "sell" });
      sellLink = linkState.link;
      linkAgeMinutes = linkState.ageMinutes;
      isFreshLink = linkState.isFresh;
      console.log(
        `[link-check] type=sell user=${userId || "unknown"} hasLink=${Boolean(sellLink)} ageMinutes=${linkAgeMinutes === null ? "null" : linkAgeMinutes.toFixed(2)} isFresh=${isFreshLink}`
      );
    } catch (dbError) {
      console.error("Failed to load sell link state from bot_settings:", dbError);
    }
  } else {
    console.error("D1 DB is not available for sell link state");
  }
  if (!isFreshLink) {
    if (db && userId) {
      try {
        const queueResult = await enqueuePendingLinkRequest({
          db,
          userId,
          orderType: "sell",
          messageId
        });
        console.log(
          `[pending-link] type=sell user=${userId} queued=${queueResult?.queued} reason=${queueResult?.reason || "unknown"}`
        );
      } catch (queueError) {
        console.error("Failed to enqueue pending sell link request:", queueError);
      }
    }
    const waitingText = [
      "\u23F3 \u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443 \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442\u0441\u044F.",
      "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 <b>3\u20135 \u043C\u0438\u043D\u0443\u0442</b>.",
      "\u041C\u044B \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u043C \u0432\u0430\u0441, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0441\u044B\u043B\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u0433\u043E\u0442\u043E\u0432\u0430.",
      "",
      "\u{1F393} \u041A\u0441\u0442\u0430\u0442\u0438, \u0447\u0442\u043E\u0431\u044B \u0432\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u043F\u0440\u043E\u0448\u043B\u043E \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0439:",
      "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 YouTube-\u043A\u0430\u043D\u0430\u043B \u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u0430. \u0422\u0430\u043C \u043E\u043D \u043F\u0440\u043E\u0441\u0442\u044B\u043C \u044F\u0437\u044B\u043A\u043E\u043C \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437, \u043F\u0430\u0442\u0442\u0435\u0440\u043D\u044B \u0438 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0440\u044B\u043D\u043A\u0430.",
      '\u{1F4FA} <a href="https://www.youtube.com/@netormoziBTC">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043A\u0430\u043D\u0430\u043B</a>'
    ].join("\n");
    await fetch(`${TELEGRAM_API7}${token}/editMessageText`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: waitingText,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    const moscowRequestTime = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date());
    const partnerNotice = [
      "\u{1F504} \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0441\u0434\u0435\u043B\u043A\u0443",
      "",
      "\u0422\u0438\u043F: \u041F\u0420\u041E\u0414\u0410\u0416\u0410 USDT",
      `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${userName} (${userId || "unknown"})`,
      `\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (MSK): ${moscowRequestTime}`,
      `\u041F\u0440\u0438\u0447\u0438\u043D\u0430: ${sellLink ? `\u0441\u0441\u044B\u043B\u043A\u0430 \u0441\u0442\u0430\u0440\u0448\u0435 ${LINK_TTL_MINUTES} \u043C\u0438\u043D\u0443\u0442` : "\u0441\u0441\u044B\u043B\u043A\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"}`,
      "",
      "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u043A\u043E\u043C\u0430\u043D\u0434\u0443 \u0432 \u044D\u0442\u043E\u0442 \u0442\u043E\u043F\u0438\u043A: SELL_LINK=https://..."
    ].join("\n");
    const partnerNoticeResponse = await fetch(`${TELEGRAM_API7}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        message_thread_id: ADMIN_THREAD_ID,
        text: partnerNotice
      })
    });
    if (!partnerNoticeResponse.ok) {
      const errorText = await partnerNoticeResponse.text();
      console.error("Failed to send sell link refresh notice to admin topic:", errorText);
    }
  } else {
    const safeSellLink = escapeHtml3(sellLink);
    const text = [
      "\u{1F517} <b>\u0412\u0430\u0448\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0443 USDT:</b>",
      `<a href="${safeSellLink}">${safeSellLink}</a>`,
      "",
      "\u0421\u0441\u044B\u043B\u043A\u0430 <b>\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u0430 20 \u043C\u0438\u043D\u0443\u0442.</b> \u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443!",
      "",
      "\u{1F4CC} <b>\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F:</b>",
      "\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 - \u0432\u044B \u043F\u043E\u043F\u0430\u0434\u0435\u0442\u0435 \u0432 P2P-\u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 \u043C\u043E\u0435\u0433\u043E \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430 (\u041A\u043E\u043C\u0430\u043D\u0434\u0430 MsGold) \u043D\u0430 Bybit.",
      "",
      "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 <b>\xAB\u041F\u0420\u041E\u0414\u0410\u0422\u042C USDT\xBB</b>. \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0443\u043C\u043C\u0443 \u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0441\u0434\u0435\u043B\u043A\u0443.",
      "",
      "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043E\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B MsGold <b>\u0432\u0430\u043C \u043F\u043E\u0441\u0442\u0443\u043F\u044F\u0442 \u0440\u0443\u0431\u043B\u0438 \u043D\u0430 \u0432\u0430\u0448\u0443 \u043A\u0430\u0440\u0442\u0443 \u0438\u043B\u0438 \u0441\u0447\u0435\u0442 \u0432 \u0432\u0430\u0448\u0435\u043C \u0431\u0430\u043D\u043A\u0435.</b>",
      "",
      "\u23F1 <b>\u0421\u0440\u043E\u043A \u0436\u0438\u0437\u043D\u0438 \u0441\u0441\u044B\u043B\u043A\u0438: 20 \u043C\u0438\u043D\u0443\u0442.</b>",
      "\u041D\u0435 \u043E\u0442\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0445\u043E\u0434 \u0432 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435.",
      "",
      "\u26A0\uFE0F <b>\u0412\u0430\u0436\u043D\u043E!</b>",
      "- \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u0442\u0435 USDT \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \xAB\u0432\u0440\u0443\u0447\u043D\u0443\u044E\xBB - \u0442\u043E\u043B\u044C\u043A\u043E <b>\u0447\u0435\u0440\u0435\u0437 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 P2P-\u0441\u0434\u0435\u043B\u043A\u0438 \u043D\u0430 Bybit.</b>",
      "- \u0412\u0441\u0435 \u0441\u043F\u043E\u0440\u044B \u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0438 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u044E\u0442\u0441\u044F <b>\u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 Bybit.</b>",
      "",
      '- \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 <a href="https://partner.bybit.com/b/netormozibtc">Bybit</a>. \u0411\u043E\u043D\u0443\u0441\u044B \u0434\u043E 30 000 USDT \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438.'
    ].join("\n");
    await fetch(`${TELEGRAM_API7}${token}/editMessageText`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
  }
  if (db && userId) {
    try {
      const createdOrder = await db.prepare(
        `INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
					 VALUES (?, 'sell', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
					 RETURNING order_id`
      ).bind(userId).first();
      let orderId = createdOrder?.order_id;
      if (!orderId) {
        const latestOrder = await db.prepare("SELECT order_id FROM orders WHERE user_id = ? AND order_type = 'sell' ORDER BY order_id DESC LIMIT 1").bind(userId).first();
        orderId = latestOrder?.order_id;
      }
      if (orderId) {
        try {
          await db.prepare(
            `INSERT INTO order_feedbacks (order_id, user_id, send_after)
							 VALUES (?, ?, datetime('now', '+180 minutes'))`
          ).bind(orderId, userId).run();
        } catch (feedbackError) {
          await db.prepare("DELETE FROM orders WHERE order_id = ?").bind(orderId).run();
          throw new Error(`Failed to create linked order_feedbacks row: ${feedbackError}`);
        }
        const requestTime = new Intl.DateTimeFormat("ru-RU", {
          timeZone: "Europe/Moscow",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(/* @__PURE__ */ new Date());
        const fullAdminText = [
          `\u{1F514} \u041D\u043E\u0432\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442! ${userName} ${userId}`,
          "",
          "\u041A\u043B\u0438\u0435\u043D\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u043B \u0441\u0434\u0435\u043B\u043A\u0443:",
          "\u{1F9FE} \u0422\u0438\u043F: \u041F\u0420\u041E\u0414\u0410\u0416\u0410 USDT",
          `\u{1F550} \u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430: ${requestTime}`
        ].join("\n");
        const shortAdminText = [
          `\u{1F514} \u041D\u043E\u0432\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442 ${orderId}!`,
          "",
          "\u041A\u043B\u0438\u0435\u043D\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0438\u043B \u0441\u0434\u0435\u043B\u043A\u0443:",
          "",
          "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501",
          "",
          "\u{1F9FE} \u0422\u0438\u043F: [ \u041F\u0420\u041E\u0414\u0410\u0416\u0410 USDT]",
          "",
          "<B>\u0412\u042B \u0421\u041E\u0417\u0414\u0410\u0415\u0422\u0415 \u041E\u0411\u042A\u042F\u0412\u041B\u0415\u041D\u0418\u0415 \u041D\u0410 \u041F\u041E\u041A\u0423\u041F\u041A\u0423 USDT (BUY)</B>",
          `\u{1F550} \u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430: [${requestTime}]`,
          "",
          "\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"
        ].join("\n");
        const shortAdminResponse = await fetch(`${TELEGRAM_API7}${token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1003815117903",
            text: shortAdminText
          })
        });
        if (!shortAdminResponse.ok) {
          const errorText = await shortAdminResponse.text();
          console.error("Failed to send short sell order to admin group:", errorText);
        }
        const fullAdminResponse = await fetch(`${TELEGRAM_API7}${token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1003764590191",
            text: fullAdminText
          })
        });
        if (fullAdminResponse.ok) {
          const adminResult = await fullAdminResponse.json();
          const adminMessageId = adminResult?.result?.message_id;
          if (adminMessageId) {
            await db.prepare("UPDATE orders SET admin_message_id = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?").bind(adminMessageId, orderId).run();
          }
        } else {
          const errorText = await fullAdminResponse.text();
          console.error("Failed to send full sell order to admin group:", errorText);
        }
      }
    } catch (dbError) {
      console.error("Failed to create sell order:", dbError);
    }
  }
}
__name(handleSellUsdtLinkCallback, "handleSellUsdtLinkCallback");

// handlers/support.js
var TELEGRAM_API8 = "https://api.telegram.org/bot";
async function handleSupportCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  if (!callbackQueryId || !chatId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API8}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API8}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u043B\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0438\u0436\u0435.\n\n\u041C\u044B \u0441\u0442\u0430\u0440\u0430\u0435\u043C\u0441\u044F \u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 1-2 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439.\n\n\u{1F4CE} \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 - \u044D\u0442\u043E \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0432 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438.",
        reply_markup: {
          inline_keyboard: [
            [{ text: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443", callback_data: "support_write_message" }]
          ]
        }
      })
    });
  } catch (error) {
    console.error("Error in handleSupportCallback:", error);
  }
}
__name(handleSupportCallback, "handleSupportCallback");
async function handleSupportWriteMessageCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API8}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API8}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432 \u043F\u043E\u043B\u0435 \u043D\u0438\u0436\u0435."
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_support_message");
    }
  } catch (error) {
    console.error("Error in handleSupportWriteMessageCallback:", error);
  }
}
__name(handleSupportWriteMessageCallback, "handleSupportWriteMessageCallback");

// handlers/send_message.js
var TELEGRAM_API9 = "https://api.telegram.org/bot";
async function handleSendMessageCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API9}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API9}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u043A\u043E\u0433\u0434\u0430 \u0441 \u0412\u0430\u043C\u0438 \u043C\u043E\u0436\u043D\u043E \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_contact");
    }
  } catch (error) {
    console.error("Error in handleSendMessageCallback:", error);
  }
}
__name(handleSendMessageCallback, "handleSendMessageCallback");

// handlers/large_amount_request.js
var TELEGRAM_API10 = "https://api.telegram.org/bot";
async function handleLargeAmountRequestCallback({ token, callbackQuery }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  await fetch(`${TELEGRAM_API10}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  const editUrl = `${TELEGRAM_API10}${token}/editMessageText`;
  await fetch(editUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: "\u{1F3E2} <b>\u0423\u0441\u043B\u0443\u0433\u0430 \u0434\u043B\u044F \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043B\u0438\u0446</b>\n\n\u041C\u044B \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u043C: \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043C \u043D\u0443\u0436\u043D\u0430 <b>\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u0438 \u043F\u043E\u043B\u043D\u044B\u0439 \u043F\u0430\u043A\u0435\u0442 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0438\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432.</b>\n\n\u041D\u0430\u0448\u0438 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u044B \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u0442 \u043E\u0431\u043C\u0435\u043D \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043B\u0438\u0446\u0430\u043C:\n\u2705 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\n\u2705 \u0441\u0447\u0451\u0442 \u043D\u0430 \u043E\u043F\u043B\u0430\u0442\u0443\n\u2705 \u0430\u043A\u0442 \u043F\u0440\u0438\u0451\u043C\u0430-\u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438\n\u2705 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F \u0424\u041D\u0421\n\n\u{1F4CC} <b>\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 - \u0438 \u043C\u044B \u043E\u043F\u0435\u0440\u0430\u0442\u0438\u0432\u043D\u043E \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043F\u043E\u0434 \u0432\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441.</b>",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F449} \u{1F4E8} \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u0434\u043B\u044F \u044E\u0440\u043B\u0438\u0446", callback_data: "leave_company_request" }],
          [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
        ]
      }
    })
  });
}
__name(handleLargeAmountRequestCallback, "handleLargeAmountRequestCallback");

// handlers/legal_exchange_request.js
var TELEGRAM_API11 = "https://api.telegram.org/bot";
async function handleLegalExchangeRequestCallback({ token, callbackQuery }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;
  if (!callbackQueryId || !chatId || !messageId) {
    return;
  }
  await fetch(`${TELEGRAM_API11}${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId
    })
  });
  const editUrl = `${TELEGRAM_API11}${token}/editMessageText`;
  await fetch(editUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: "\u041D\u0430\u0448 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 P2P-\u043A\u0430\u043D\u0430\u043B \u0447\u0435\u0440\u0435\u0437 Bybit \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441 \u0441\u0443\u043C\u043C\u0430\u043C\u0438 <b>\u0434\u043E 1 \u043C\u043B\u043D \u0440\u0443\u0431\u043B\u0435\u0439</b> - \u044D\u0442\u043E \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430.\n\n\u{1F4CC} <b>\u0414\u043B\u044F \u0441\u0443\u043C\u043C \u0432\u044B\u0448\u0435 1 \u043C\u043B\u043D \u0440\u0443\u0431\u043B\u0435\u0439 \u0443 \u043D\u0430\u0441 \u0435\u0441\u0442\u044C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441</b>:\n- \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\n- \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0435 \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0434\u0435\u043B\u043A\u0438 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435\n\n\u{1F4DE} <b>\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u0434\u043D\u044F</b>:",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F449} \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443", callback_data: "leave_legal_request" }],
          [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
        ]
      }
    })
  });
}
__name(handleLegalExchangeRequestCallback, "handleLegalExchangeRequestCallback");

// handlers/leave_legal_request.js
var TELEGRAM_API12 = "https://api.telegram.org/bot";
async function handleLeaveLegalRequestCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API12}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API12}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u043A\u043E\u0433\u0434\u0430 \u0441 \u0412\u0430\u043C\u0438 \u043C\u043E\u0436\u043D\u043E \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_contact_legal_1");
    }
  } catch (error) {
    console.error("Error in handleLeaveLegalRequestCallback:", error);
  }
}
__name(handleLeaveLegalRequestCallback, "handleLeaveLegalRequestCallback");

// handlers/leave_company_request.js
var TELEGRAM_API13 = "https://api.telegram.org/bot";
async function handleLeaveCompanyRequestCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API13}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API13}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u043A\u043E\u0433\u0434\u0430 \u0441 \u0412\u0430\u043C\u0438 \u043C\u043E\u0436\u043D\u043E \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_contact_large_1");
    }
  } catch (error) {
    console.error("Error in handleLeaveCompanyRequestCallback:", error);
  }
}
__name(handleLeaveCompanyRequestCallback, "handleLeaveCompanyRequestCallback");

// handlers/submit_feedback.js
var TELEGRAM_API14 = "https://api.telegram.org/bot";
async function handleSubmitFeedbackCallback({ token, callbackQuery, kv, db }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  const callbackData = callbackQuery?.data || "";
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API14}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    if (db && kv) {
      let feedbackRow = null;
      const match = callbackData.match(/^submit_feedback:(\d+)$/);
      if (match?.[1]) {
        feedbackRow = await db.prepare("SELECT id FROM order_feedbacks WHERE id = ? AND user_id = ? AND status = 'sent'").bind(Number(match[1]), userId).first();
      }
      if (!feedbackRow) {
        feedbackRow = await db.prepare(
          "SELECT id FROM order_feedbacks WHERE user_id = ? AND status = 'sent' ORDER BY id DESC LIMIT 1"
        ).bind(userId).first();
      }
      if (!feedbackRow?.id) {
        await fetch(`${TELEGRAM_API14}${token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043E\u043F\u0440\u043E\u0441 \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0434\u0435\u043B\u043A\u0435. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043D\u0430\u0436\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u0438\u0437 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F."
          })
        });
        return;
      }
      await kv.put(`feedback_active:${userId}`, String(feedbackRow.id));
    }
    await fetch(`${TELEGRAM_API14}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "1. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 UID (\u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E)",
        reply_markup: {
          inline_keyboard: [
            [{ text: "\u0412\u0432\u0435\u0441\u0442\u0438 UID", callback_data: "feedback_enter_uid" }],
            [{ text: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C", callback_data: "feedback_skip_uid" }],
            [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
          ]
        }
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_feedback_uid_choice");
    }
  } catch (error) {
    console.error("Error in handleSubmitFeedbackCallback:", error);
  }
}
__name(handleSubmitFeedbackCallback, "handleSubmitFeedbackCallback");
async function handleFeedbackEnterUidCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API14}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API14}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 UID:",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_feedback_uid_input");
    }
  } catch (error) {
    console.error("Error in handleFeedbackEnterUidCallback:", error);
  }
}
__name(handleFeedbackEnterUidCallback, "handleFeedbackEnterUidCallback");
async function handleFeedbackSkipUidCallback({ token, callbackQuery, kv }) {
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const userId = callbackQuery?.from?.id;
  if (!callbackQueryId || !chatId || !userId) {
    return;
  }
  try {
    await fetch(`${TELEGRAM_API14}${token}/answerCallbackQuery`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    });
    await fetch(`${TELEGRAM_API14}${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "\u0412\u0441\u0451 \u043B\u0438 \u043F\u0440\u043E\u0448\u043B\u043E \u0433\u043B\u0430\u0434\u043A\u043E? (\u0434\u0430 / \u0435\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B). \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043D\u0438\u0436\u0435 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438.",
        reply_markup: {
          inline_keyboard: [[{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
        }
      })
    });
    if (kv) {
      await kv.put(`fsm:${userId}`, "waiting_feedback_answer");
    }
  } catch (error) {
    console.error("Error in handleFeedbackSkipUidCallback:", error);
  }
}
__name(handleFeedbackSkipUidCallback, "handleFeedbackSkipUidCallback");

// index.js
var TELEGRAM_API15 = "https://api.telegram.org/bot";
var index_default = {
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
      if (message && text && chatId === ADMIN_CHAT_ID) {
        try {
          let newLink = null;
          let targetColumn = null;
          let targetCreatedAtColumn = null;
          if (text.startsWith("BUY_LINK=")) {
            newLink = text.slice("BUY_LINK=".length).trim();
            targetColumn = "buy_link";
            targetCreatedAtColumn = "buy_link_created_at";
          } else if (text.startsWith("SELL_LINK=")) {
            newLink = text.slice("SELL_LINK=".length).trim();
            targetColumn = "sell_link";
            targetCreatedAtColumn = "sell_link_created_at";
          }
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
                "\u274C \u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0441\u0441\u044B\u043B\u043A\u0438. \u041F\u0440\u0438\u043C\u0435\u0440: BUY_LINK=https://example.com",
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
              linkTtlMinutes: LINK_TTL_MINUTES
            });
            const replyText = `\u2705 \u0421\u043F\u0430\u0441\u0438\u0431\u043E!
\u0421\u0441\u044B\u043B\u043A\u0430 \u0434\u043B\u044F ${targetColumn.toUpperCase()} \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430. \u041D\u043E\u0432\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430
${newLink}`;
            await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, chatId, replyText, {
              message_thread_id: ADMIN_THREAD_ID
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
							`).bind(user.id, user.username || null, user.first_name || null).run();
          } catch (dbError) {
            console.error("Database error:", dbError);
          }
        }
        await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, chatId, getStartMessageHtml(), {
          parse_mode: "HTML",
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F916} \u0425\u043E\u0442\u0438\u0442\u0435 \u0442\u0430\u043A\u043E\u0433\u043E \u0436\u0435 \u0431\u043E\u0442\u0430? \u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", callback_data: "request_bot" }],
              [{ text: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C", callback_data: "continue" }]
            ]
          }
        });
      }
      if (chatId && message && (text ? text !== "/start" : message.photo || message.document)) {
        const userId = message?.from?.id;
        if (userId && env.KV && env.DB) {
          try {
            const fsmState = await env.KV.get(`fsm:${userId}`);
            if (fsmState === "waiting_feedback_uid_choice") {
              await sendTelegramMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435: \xAB\u0412\u0432\u0435\u0441\u0442\u0438 UID\xBB \u0438\u043B\u0438 \xAB\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C\xBB.",
                {
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "\u0412\u0432\u0435\u0441\u0442\u0438 UID", callback_data: "feedback_enter_uid" }],
                      [{ text: "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C", callback_data: "feedback_skip_uid" }],
                      [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
                    ]
                  }
                }
              );
            }
            if (fsmState === "waiting_feedback_uid_input") {
              await env.DB.prepare("UPDATE users SET UID = ?, last_active_at = CURRENT_TIMESTAMP WHERE user_id = ?").bind(text, userId).run();
              await sendTelegramMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                "\u0412\u0441\u0451 \u043B\u0438 \u043F\u0440\u043E\u0448\u043B\u043E \u0433\u043B\u0430\u0434\u043A\u043E? (\u0434\u0430 / \u0435\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B). \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043D\u0438\u0436\u0435 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438."
              );
              await env.KV.put(`fsm:${userId}`, "waiting_feedback_answer");
            }
            if (fsmState === "waiting_feedback_answer") {
              const activeFeedbackId = await env.KV.get(`feedback_active:${userId}`);
              const hasMediaAttachment = Boolean(message.photo || message.document);
              const feedbackText = text || message?.caption || (hasMediaAttachment ? "[\u043C\u0435\u0434\u0438\u0430 \u0431\u0435\u0437 \u0442\u0435\u043A\u0441\u0442\u0430]" : "");
              let feedbackRow = null;
              if (activeFeedbackId) {
                feedbackRow = await env.DB.prepare("SELECT id, order_id FROM order_feedbacks WHERE id = ? AND user_id = ?").bind(activeFeedbackId, userId).first();
                await env.DB.prepare(
                  "UPDATE order_feedbacks SET feedback_text = ?, status = 'completed' WHERE id = ? AND user_id = ?"
                ).bind(feedbackText, activeFeedbackId, userId).run();
              } else {
                const latestSentFeedback = await env.DB.prepare(
                  "SELECT id, order_id FROM order_feedbacks WHERE user_id = ? AND status = 'sent' ORDER BY id DESC LIMIT 1"
                ).bind(userId).first();
                if (latestSentFeedback?.id) {
                  feedbackRow = latestSentFeedback;
                  await env.DB.prepare(
                    "UPDATE order_feedbacks SET feedback_text = ?, status = 'completed' WHERE id = ? AND user_id = ?"
                  ).bind(feedbackText, latestSentFeedback.id, userId).run();
                }
              }
              const user = await env.DB.prepare("SELECT username, first_name, UID FROM users WHERE user_id = ?").bind(userId).first();
              const userName = user?.username ? `@${user.username}` : user?.first_name || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438";
              const userUid = user?.UID || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D";
              const feedbackTime = (/* @__PURE__ */ new Date()).toISOString();
              const orderIdText = feedbackRow?.order_id ?? "\u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D";
              const adminMessage = [
                `\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0441\u0434\u0435\u043B\u043A\u0438 ${orderIdText}`,
                "",
                `\u0422\u0435\u043A\u0441\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F: ${feedbackText || "\u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"}`,
                hasMediaAttachment ? `\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u0435: ${message.photo ? "\u0444\u043E\u0442\u043E" : "\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442"}` : null,
                `UID: ${userUid}`,
                `\u0412\u0440\u0435\u043C\u044F: ${feedbackTime}`,
                `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${userName}`,
                `ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ${userId}`
              ].filter(Boolean).join("\n");
              const adminResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  chat_id: "-1003764590191",
                  text: adminMessage
                })
              });
              if (!adminResponse.ok) {
                const errorText = await adminResponse.text();
                console.error("Failed to send feedback confirmation to admin group:", errorText);
              }
              if (hasMediaAttachment) {
                const forwardResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/forwardMessage`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    chat_id: "-1003764590191",
                    from_chat_id: chatId,
                    message_id: message.message_id
                  })
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
                "\u2705 \u0412\u0430\u0448 \u043E\u0442\u0447\u0451\u0442 \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u0438 \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D.\n\u{1F64F} <b>\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0447\u0442\u043E \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u043D\u0430\u0448\u0438\u043C \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u043C!</b>\n\n\u{1F48E} \u0412\u044B \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442\u0435 \u043D\u0430\u043C \u0434\u0435\u043B\u0430\u0442\u044C \u043A\u0440\u0438\u043F\u0442\u043E\u0441\u0440\u0435\u0434\u0443 <b>\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u0435\u0435, \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u0435\u0435 \u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0435\u0435.</b>\n\n\u{1F9FE} \u0412\u0441\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u043F\u0440\u043E\u0432\u043E\u0434\u044F\u0442\u0441\u044F <b>\u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E, \u0447\u0435\u0440\u0435\u0437 \u0418\u041F \u0441 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0435\u0439</b>, \u0441 \u043F\u043E\u043B\u043D\u044B\u043C \u0441\u043E\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435\u043C \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 \u0420\u0424.\n\n\u{1F9FE} \u041C\u044B \u0446\u0435\u043D\u0438\u043C \u0432\u0430\u0448\u0435 \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u0434\u0435\u043B\u0430\u0442\u044C \u043A\u0440\u0438\u043F\u0442\u043E\u0441\u0440\u0435\u0434\u0443 <b>\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439 \u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0439.</b>\n\n\u{1F504} \u0425\u043E\u0442\u0438\u0442\u0435 \u0441\u043E\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0435\u0449\u0451 \u043E\u0434\u043D\u0443 \u0441\u0434\u0435\u043B\u043A\u0443? \u041F\u0440\u043E\u0441\u0442\u043E \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0438\u0436\u0435.",
                {
                  parse_mode: "HTML",
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }],
                      [{ text: "\u{1F4DE} \u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u043E\u0439", callback_data: "support" }]
                    ]
                  }
                }
              );
            }
            if (fsmState === "waiting_contact") {
              const user = await env.DB.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`).bind(userId).first();
              await env.DB.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'bot', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`).bind(userId).run();
              const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
              const adminMessage = `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${userId} ${userDisplay} \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u0431\u043E\u0442\u0430

\u0412\u0440\u0435\u043C\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430: ${text}`;
              const adminResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  chat_id: "-1003764590191",
                  text: adminMessage
                })
              });
              if (!adminResponse.ok) {
                const errorText = await adminResponse.text();
                console.error("Failed to send to admin group:", errorText);
              }
              await env.KV.delete(`fsm:${userId}`);
              await sendTelegramMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                "\u2705 \u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0443 \u0437\u0430\u044F\u0432\u043A\u0443. \u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.",
                {
                  reply_markup: {
                    inline_keyboard: [[{ text: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
                  }
                }
              );
            }
            if (fsmState === "waiting_contact_legal_1") {
              const user = await env.DB.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`).bind(userId).first();
              await env.DB.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'legal', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`).bind(userId).run();
              const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
              const adminMessage = `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${userId} ${userDisplay} \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u0441\u0443\u043C\u043C\u0443 \u0431\u043E\u043B\u0435\u0435 1 \u043C\u043B\u043D 

 ${text}`;
              const adminResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  chat_id: "-1003764590191",
                  text: adminMessage
                })
              });
              if (!adminResponse.ok) {
                const errorText = await adminResponse.text();
                console.error("Failed to send to admin group:", errorText);
              }
              await env.KV.delete(`fsm:${userId}`);
              await sendTelegramMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                "\u2705 \u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0443 \u0437\u0430\u044F\u0432\u043A\u0443. \u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.",
                {
                  reply_markup: {
                    inline_keyboard: [[{ text: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
                  }
                }
              );
            }
            if (fsmState === "waiting_contact_large_1") {
              const user = await env.DB.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`).bind(userId).first();
              await env.DB.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'large', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`).bind(userId).run();
              const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
              const adminMessage = `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ${userId} ${userDisplay} \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u044E\u0440 \u043B\u0438\u0446\u043E 

 ${text}`;
              const adminResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  chat_id: "-1003764590191",
                  text: adminMessage
                })
              });
              if (!adminResponse.ok) {
                const errorText = await adminResponse.text();
                console.error("Failed to send to admin group:", errorText);
              }
              await env.KV.delete(`fsm:${userId}`);
              await sendTelegramMessage(
                env.TELEGRAM_BOT_TOKEN,
                chatId,
                "\u2705 \u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0443 \u0437\u0430\u044F\u0432\u043A\u0443. \u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F.",
                {
                  reply_markup: {
                    inline_keyboard: [[{ text: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]]
                  }
                }
              );
            }
            if (fsmState === "waiting_support_message") {
              const user = await env.DB.prepare(`
									SELECT username, first_name FROM users WHERE user_id = ?
								`).bind(userId).first();
              const orderResult = await env.DB.prepare(`
									INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
									VALUES (?, 'help', 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
								`).bind(userId).run();
              const orderId = orderResult.meta?.last_row_id || "?";
              const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
              const feedbackTime = (/* @__PURE__ */ new Date()).toISOString();
              const supportText = text || message?.caption || "(\u043C\u0435\u0434\u0438\u0430\u0444\u0430\u0439\u043B \u0431\u0435\u0437 \u043F\u043E\u0434\u043F\u0438\u0441\u0438)";
              const adminMessage = [
                "\u{1F198} <b>\u0417\u0430\u043F\u0440\u043E\u0441 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443</b>",
                "",
                `ID \u0437\u0430\u043A\u0430\u0437\u0430: ${orderId}`,
                `\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C: ${userDisplay}`,
                `ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ${userId}`,
                `\u0412\u0440\u0435\u043C\u044F: ${feedbackTime}`,
                "",
                `\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ${supportText}`
              ].join("\n");
              const adminResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  chat_id: "-1003764590191",
                  text: adminMessage,
                  parse_mode: "HTML"
                })
              });
              if (!adminResponse.ok) {
                const errorText = await adminResponse.text();
                console.error("Failed to send support message to admin group:", errorText);
              }
              if (message.photo || message.document) {
                const forwardResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/forwardMessage`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    chat_id: "-1003764590191",
                    from_chat_id: chatId,
                    message_id: message.message_id
                  })
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
                "\u2705 \u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u043A\u043E\u043C\u0430\u043D\u0434\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438.\n\n<b>\u041C\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432\u0430\u043C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E</b>, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441.\n\n\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0447\u0442\u043E \u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435\u0441\u044C \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u043C <b>\xAB\u041D\u0415 \u0422\u041E\u0420\u041C\u041E\u0417\u0418 \u0421 BTC\xBB!</b> \u{1F64F}",
                {
                  parse_mode: "HTML",
                  reply_markup: {
                    inline_keyboard: [
                      [{ text: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
                    ]
                  }
                }
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
          callbackQuery
        });
      }
      if (callbackQuery?.data === "send_message") {
        await handleSendMessageCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      if (callbackQuery?.data === "continue") {
        await handleContinueCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery
        });
      }
      if (callbackQuery?.data === "buy_usdt") {
        await handleBuyUsdtCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery
        });
      }
      if (callbackQuery?.data === "buy_usdt_link") {
        await handleBuyUsdtLinkCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          db: env.DB
        });
      }
      if (callbackQuery?.data === "sell_usdt") {
        await handleSellUsdtCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery
        });
      }
      if (callbackQuery?.data === "sell_usdt_link") {
        await handleSellUsdtLinkCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          db: env.DB
        });
      }
      if (callbackQuery?.data === "large_amount_request") {
        await handleLargeAmountRequestCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery
        });
      }
      if (callbackQuery?.data === "legal_exchange_request") {
        await handleLegalExchangeRequestCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery
        });
      }
      if (callbackQuery?.data === "leave_legal_request") {
        await handleLeaveLegalRequestCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      if (callbackQuery?.data === "leave_company_request") {
        await handleLeaveCompanyRequestCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      if (callbackQuery?.data === "support") {
        await handleSupportCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      if (callbackQuery?.data === "support_write_message") {
        await handleSupportWriteMessageCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      if (callbackQuery?.data?.startsWith("submit_feedback")) {
        await handleSubmitFeedbackCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV,
          db: env.DB
        });
      }
      if (callbackQuery?.data === "feedback_enter_uid") {
        await handleFeedbackEnterUidCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      if (callbackQuery?.data === "feedback_skip_uid") {
        await handleFeedbackSkipUidCallback({
          token: env.TELEGRAM_BOT_TOKEN,
          callbackQuery,
          kv: env.KV
        });
      }
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook processing error:", error);
      return new Response("Webhook error", { status: 500 });
    }
  },
  async scheduled(event, env, ctx) {
    if (event.cron === "*/5 * * * *") {
      ctx.waitUntil(runOrderFeedbackTimerCheck(env));
    }
  }
};
function getStartMessageHtml() {
  return [
    "\u{1F44B} \u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 P2P-\u0431\u043E\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B <b>\xAB\u041D\u0415 \u0422\u041E\u0420\u041C\u041E\u0417\u0418 \u0421 BTC\xBB</b>!",
    "",
    "\u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 <b>\u0431\u044B\u0441\u0442\u0440\u043E, \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E, \u0434\u0435\u0448\u0435\u0432\u043B\u0435 \u0438 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E \u043A\u0443\u043F\u0438\u0442\u044C USDT</b> \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B.",
    "",
    "\u2705 <b>\u041F\u043E\u0447\u0435\u043C\u0443 \u044D\u0442\u043E \u043D\u0430\u0434\u0451\u0436\u043D\u043E?</b>",
    "\u0412\u0441\u0435 \u0441\u0434\u0435\u043B\u043A\u0438 \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 <b>\u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E\u0431\u0438\u0440\u0436\u0435 Bybit</b> - \u0447\u0435\u0440\u0435\u0437 P2P-\u0441\u0438\u0441\u0442\u0435\u043C\u0443. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C \u0438 \xAB\u0441\u0435\u0440\u044B\u0445\xBB \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432.",
    "",
    "\u041D\u0430\u0448 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u0442\u043D\u0451\u0440 - <b>\u0418\u041F \u0417\u043E\u043B\u043E\u0442\u0430\u044F \u0410.\u0412 (\u0418\u041D\u041D 232905828857)</b> - \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E \u043A\u0430\u043A <b>\u0418\u041F \u0441 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0435\u0439</b> \u043D\u0430 \u043E\u0431\u043C\u0435\u043D \u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0443 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442.",
    "",
    "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043A\u043E\u043C\u0438\u0441\u0441\u0438\u0439. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043E\u043A \u043E\u0442 \u0431\u0430\u043D\u043A\u043E\u0432. \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435 \u0440\u043E\u0432\u043D\u043E \u0441\u0442\u043E\u043B\u044C\u043A\u043E USDT, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u043F\u043B\u0430\u0442\u0438\u043B\u0438.",
    "",
    '<b>\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 (\u0430\u0432\u0442\u043E\u0440 \u043A\u0430\u043D\u0430\u043B\u0430 "\u041D\u0415 \u0422\u041E\u0420\u041C\u041E\u0417\u0418 \u0421 BTC") \u043B\u0438\u0447\u043D\u043E \u043F\u0440\u043E\u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043B \u0438 \u0434\u043E\u0432\u0435\u0440\u044F\u0435\u0442 \u044D\u0442\u043E\u043C\u0443 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0443.</b> \u0412\u0430\u0448\u0438 \u0441\u0434\u0435\u043B\u043A\u0438 \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438.',
    "",
    "\u{1F4BC} <b>\u041A\u0430\u043A \u043D\u0430\u0447\u0430\u0442\u044C?</b>",
    "\u041F\u0440\u043E\u0441\u0442\u043E \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0438\u0436\u0435 \u{1F447}",
    "",
    '\u2705 \u041D\u0430\u0436\u0438\u043C\u0430\u044F \xAB\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C\xBB, \u0432\u044B \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F <a href="https://ya.ru">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F</a> \u0438 <a href="https://ya.ru">\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438</a>.'
  ].join("\n");
}
__name(getStartMessageHtml, "getStartMessageHtml");
async function sendTelegramMessage(token, chatId, text, extra = {}) {
  const url = `${TELEGRAM_API15}${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...extra
    })
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${details}`);
  }
}
__name(sendTelegramMessage, "sendTelegramMessage");
async function runOrderFeedbackTimerCheck(env) {
  if (!env.DB || !env.TELEGRAM_BOT_TOKEN) {
    console.error("DB or TELEGRAM_BOT_TOKEN is not set for order feedback timer check");
    return;
  }
  try {
    const dueRows = await env.DB.prepare(
      "SELECT id, user_id FROM order_feedbacks WHERE status = 'pending' AND send_after <= CURRENT_TIMESTAMP ORDER BY id ASC LIMIT 100"
    ).all();
    const rows = dueRows?.results || [];
    for (const row of rows) {
      try {
        const feedbackText = [
          "\u2705 \u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0447\u0442\u043E \u0441\u0434\u0435\u043B\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430.",
          "",
          "\u{1F4CB} \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435:",
          "\u0412\u0430\u0448 UID \u043D\u0430 Bybit (\u041F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E)",
          "\u0412\u0441\u0451 \u043B\u0438 \u043F\u0440\u043E\u0448\u043B\u043E \u0433\u043B\u0430\u0434\u043A\u043E? (\u0434\u0430 / \u0435\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B). \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043D\u0438\u0436\u0435 \u0432 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438.",
          "",
          "\u042D\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0434\u043B\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u0438 \u0443\u0447\u0451\u0442\u0430 \u0438 \u0431\u044B\u0441\u0442\u0440\u043E\u0433\u043E \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u043F\u0440\u043E\u0431\u043B\u0435\u043C."
        ].join("\n");
        const tgResponse = await fetch(`${TELEGRAM_API15}${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            chat_id: row.user_id,
            text: feedbackText,
            reply_markup: {
              inline_keyboard: [
                [{ text: "\u{1F4E8} \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435", callback_data: `submit_feedback:${row.id}` }],
                [{ text: "\u0412 \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u043C\u0435\u043D\u044E", callback_data: "continue" }]
              ]
            }
          })
        });
        if (tgResponse.ok) {
          await env.DB.prepare("UPDATE order_feedbacks SET status = 'sent' WHERE id = ?").bind(row.id).run();
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
__name(runOrderFeedbackTimerCheck, "runOrderFeedbackTimerCheck");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
