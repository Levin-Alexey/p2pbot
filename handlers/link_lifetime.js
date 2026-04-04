export const ADMIN_CHAT_ID = -1003815117903;
export const ADMIN_THREAD_ID = 4;
export const LINK_TTL_MINUTES = 19;

let ttlColumnsEnsured = false;

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

function isDuplicateColumnError(error) {
	const message = String(error?.message || "").toLowerCase();
	return message.includes("duplicate column name") || message.includes("already exists");
}

export async function ensureLinkTtlColumns(db) {
	if (!db || ttlColumnsEnsured) {
		return;
	}

	const addColumnStatements = [
		"ALTER TABLE bot_settings ADD COLUMN buy_link_created_at TEXT",
		"ALTER TABLE bot_settings ADD COLUMN sell_link_created_at TEXT",
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

	await db
		.prepare(
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
		)
		.run();

	ttlColumnsEnsured = true;
}

export function getLinkAgeMinutes(createdAtRaw) {
	const createdAt = parseSqliteTimestampUtc(createdAtRaw);

	if (!createdAt) {
		return null;
	}

	return (Date.now() - createdAt.getTime()) / 60000;
}

export async function getLinkState({ db, linkType }) {
	if (!db) {
		return {
			link: null,
			linkCreatedAt: null,
			ageMinutes: null,
			isFresh: false,
		};
	}

	await ensureLinkTtlColumns(db);

	const isBuy = linkType === "buy";
	const linkColumn = isBuy ? "buy_link" : "sell_link";
	const createdAtColumn = isBuy ? "buy_link_created_at" : "sell_link_created_at";
	const settings = await db
		.prepare(`SELECT ${linkColumn} AS link, ${createdAtColumn} AS link_created_at FROM bot_settings WHERE id = ?`)
		.bind(1)
		.first();

	const link = settings?.link && String(settings.link).trim() ? String(settings.link).trim() : null;
	const linkCreatedAt = settings?.link_created_at || null;
	const ageMinutes = getLinkAgeMinutes(linkCreatedAt);
	const isFresh = Boolean(link && ageMinutes !== null && ageMinutes < LINK_TTL_MINUTES);

	return {
		link,
		linkCreatedAt,
		ageMinutes,
		isFresh,
	};
}
