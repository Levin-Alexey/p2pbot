import { startLeadRequestFlow } from "./lead_request_flow.js";

export async function handleSendMessageCallback({ token, callbackQuery, kv }) {
	const callbackQueryId = callbackQuery?.id;
	const chatId = callbackQuery?.message?.chat?.id;
	const userId = callbackQuery?.from?.id;

	if (!callbackQueryId || !chatId || !userId) {
		return;
	}

	try {
		await startLeadRequestFlow({
			token,
			callbackQueryId,
			chatId,
			userId,
			kv,
			state: "waiting_contact",
		});
	} catch (error) {
		console.error("Error in handleSendMessageCallback:", error);
	}
}
