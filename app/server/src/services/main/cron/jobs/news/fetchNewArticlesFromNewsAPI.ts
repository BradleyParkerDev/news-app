import cron from 'node-cron';
import { lt } from 'drizzle-orm';
import { db } from '@server/database/db.js';
import { Article } from '@server/database/schemas/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { newsHelper } from '@server/services/helpers/index.js';
export const fetchNewArticlesFromNewsAPI = async () => {
	cron.schedule('0 * * * *', async () => {
		const now = new Date();
		const news = newsHelper;

		loggerFactory.cron?.info?.(
			`[CRON][News] Fetching latest articles from NewsAPI.`,
		);

		try {
		} catch (error) {
			loggerFactory.cron?.error?.(
				`[CRON][News] Error fetching latest articles from NewsAPI: ${
					error instanceof Error ? error.message : String(error)
				}`,
			);
		}
	});
};
