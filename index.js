const TELEGRAM_API = "https://api.telegram.org/bot";

export default {
	async fetch(request, env) {
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

		if (chatId && text === "/start") {
			await sendTelegramMessage(env.TELEGRAM_BOT_TOKEN, chatId, "Привет я бот");
		}

		return new Response("OK", { status: 200 });
	},
};

async function sendTelegramMessage(token, chatId, text) {
	const url = `${TELEGRAM_API}${token}/sendMessage`;

	const response = await fetch(url, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text,
		}),
	});

	if (!response.ok) {
		const details = await response.text();
		throw new Error(`Telegram sendMessage failed: ${response.status} ${details}`);
	}
}
