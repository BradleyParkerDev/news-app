import cron from 'node-cron';
import { lt } from 'drizzle-orm';
import { db } from '@server/database/db.js';
import { Article } from '@server/database/schemas/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { newsHelper } from '@server/services/helpers/index.js';
export const fetchNewArticlesFromNewsAPICron = async () => {
	cron.schedule('*/5 * * * *', async () => {
		const now = new Date();
		const news = newsHelper;

		loggerFactory.cron?.info?.(
			`[CRON][NewsAPI] Fetching latest articles from NewsAPI.`,
		);
		news.client.fetchLatestArticlesFromAPI();
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
