import { startLeadRequestFlow } from "./lead_request_flow.js";

export async function handleLeaveLegalRequestCallback({ token, callbackQuery, kv }) {
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
			state: "waiting_contact_legal_1",
		});
	} catch (error) {
		console.error("Error in handleLeaveLegalRequestCallback:", error);
	}
}
