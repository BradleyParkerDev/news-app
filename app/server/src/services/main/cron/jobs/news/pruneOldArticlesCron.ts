import cron from 'node-cron';
import { loggerFactory } from '@server/lib/logger/index.js';
import { newsHelper } from '@server/services/helpers/index.js';

export const pruneOldArticlesCron = async () => {
	cron.schedule('*/5 * * * *', async () => {
		const now = new Date();
		const news = newsHelper;
		loggerFactory.cron?.info?.(`[CRON][News] Deleting older articles.`);
		try {
			const prunedArticles = await news.deleteOlderArticles();

			if (prunedArticles > 0) {
				loggerFactory.cron?.info?.(
					`[CRON][News] Deleted ${prunedArticles} article(s).`,
				);
			} else {
				loggerFactory.cron?.info?.(`[CRON][News] No articles deleted.`);
			}
		} catch (error) {
			loggerFactory.cron?.error?.(
				`[CRON][News] Error Deleting older articles: ${
					error instanceof Error ? error.message : String(error)
				}`,
			);
		}
	});
};
