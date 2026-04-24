import cron from 'node-cron';
import { loggerFactory } from '../../../../../lib/logger/index.js';
import { newsHelper } from '../../../../../services/helpers/index.js';
export const fetchNewArticlesFromNewsAPICron = async () => {
    cron.schedule('*/5 * * * *', async () => {
        const now = new Date();
        const news = newsHelper;
        loggerFactory.cron?.info?.(`[CRON][NewsAPI] Fetching latest articles from NewsAPI.`);
        news.client.fetchLatestArticlesFromAPI();
        try {
        }
        catch (error) {
            loggerFactory.cron?.error?.(`[CRON][News] Error fetching latest articles from NewsAPI: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
};
