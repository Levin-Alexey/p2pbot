const TELEGRAM_API = "https://api.telegram.org/bot";
const ADMIN_GROUP_CHAT_ID = "-1003764590191";

const FLOW_CONFIG = {
	waiting_contact: {
		orderType: "bot",
		title: "🤖 Заявка на бота",
		successText: "✅ Спасибо! Мы получили вашу заявку. Свяжемся с вами в удобное время.",
	},
	waiting_contact_legal_1: {
		orderType: "legal",
		title: "📨 Заявка на крупную сумму",
		successText: "✅ Спасибо! Мы получили вашу заявку. Свяжемся с вами в удобное время.",
	},
	waiting_contact_large_1: {
		orderType: "large",
		title: "🏢 Заявка для юридических лиц",
		successText: "✅ Спасибо! Мы получили вашу заявку. Свяжемся с вами в удобное время.",
	},
	waiting_contact_ved_1: {
		orderType: "ved",
		title: "🌍 Заявка на ВЭД-расчёты",
		successText: "✅ Спасибо! Мы получили вашу заявку на ВЭД-расчёты. Свяжемся с вами в ближайшее время.",
	},
	waiting_contact_support_1: {
		orderType: "help",
		title: "🆘 Запрос в поддержку",
		successText: "✅ Ваше сообщение отправлено команде поддержки.\n\nМы ответим вам напрямую, как только обработаем запрос.\n\nСпасибо, что пользуетесь сервисом «НЕ ТОРМОЗИ С BTC»! 🙏",
	},
	waiting_contact_unfreeze_1: {
		orderType: "unfreeze",
		title: "🔒 Заявка на разблокировку / вывод",
		successText: "✅ Спасибо! Мы получили вашу заявку на разблокировку/вывод. Свяжемся с вами в ближайшее время.",
	},
	waiting_contact_otc_1: {
		orderType: "otc",
		title: "🟢 Заявка на OTC-покупку BTC",
		successText: "✅ Спасибо! Мы получили вашу заявку на OTC. Свяжемся с вами в ближайшее время.",
	},
};

function getMessageState(contactState) {
	return `${contactState}_text`;
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
		const details = await response.text();
		throw new Error(`Telegram sendMessage failed: ${response.status} ${details}`);
	}
}

export async function startLeadRequestFlow({ token, callbackQueryId, chatId, userId, kv, state }) {
	if (!token || !callbackQueryId || !chatId || !userId || !state) {
		return;
	}

	await fetch(`${TELEGRAM_API}${token}/answerCallbackQuery`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
		}),
	});

	await sendTelegramMessage(token, chatId, "Оставьте ваш e-mail или телеграмм для связи.", {
		reply_markup: {
			inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
		},
	});

	if (kv) {
		await kv.put(`fsm:${userId}`, state);
	}
}

export async function handleLeadFlowMessage({ token, db, kv, userId, chatId, text, fsmState }) {
	if (!token || !db || !kv || !userId || !chatId || !text || !fsmState) {
		return false;
	}

	const contactConfig = FLOW_CONFIG[fsmState];
	if (contactConfig) {
		await db
			.prepare("UPDATE users SET contact_info = ?, last_active_at = CURRENT_TIMESTAMP WHERE user_id = ?")
			.bind(text, userId)
			.run();

		await kv.put(`fsm:${userId}`, getMessageState(fsmState));

		await sendTelegramMessage(token, chatId, "✅ Контакт получен. Теперь напишите текст вашего запроса.", {
			reply_markup: {
				inline_keyboard: [[{ text: "В главное меню", callback_data: "continue" }]],
			},
		});

		return true;
	}

	const contactState = Object.keys(FLOW_CONFIG).find((state) => getMessageState(state) === fsmState);
	if (!contactState) {
		return false;
	}

	const flowConfig = FLOW_CONFIG[contactState];

	await db
		.prepare(
			`INSERT INTO orders (user_id, order_type, status, created_at, updated_at)
			 VALUES (?, ?, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
		)
		.bind(userId, flowConfig.orderType)
		.run();

	const user = await db
		.prepare("SELECT username, first_name, contact_info FROM users WHERE user_id = ?")
		.bind(userId)
		.first();

	const userDisplay = user?.username ? `@${user.username}` : user?.first_name || `User ${userId}`;
	const contactInfo = user?.contact_info || "не указан";

	const adminMessage = [
		flowConfig.title,
		"",
		`Пользователь: ${userDisplay}`,
		`ID пользователя: ${userId}`,
		`Контакт: ${contactInfo}`,
		`Текст запроса: ${text}`,
	].join("\n");

	await sendTelegramMessage(token, ADMIN_GROUP_CHAT_ID, adminMessage);
	await kv.delete(`fsm:${userId}`);

	await sendTelegramMessage(token, chatId, flowConfig.successText, {
		reply_markup: {
			inline_keyboard: [[{ text: "Главное меню", callback_data: "continue" }]],
		},
	});

	return true;
}
