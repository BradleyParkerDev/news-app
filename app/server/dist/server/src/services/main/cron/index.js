import { pruneExpiredUserSessions } from './jobs/pruneExpiredUserSession.js';
import { fetchNewArticlesFromNewsAPICron } from './jobs/news/fetchNewArticlesFromNewsAPICron.js';
import { loggerFactory } from '../../../lib/logger/index.js';
const startAll = () => {
    loggerFactory.cron?.info?.('[CRON] Starting cron jobs...');
    fetchNewArticlesFromNewsAPICron();
    pruneExpiredUserSessions();
    // uploadLogsToS3Bucket();
    loggerFactory.cron?.info?.('[CRON] Cron jobs initialized.');
};
export const cronService = {
    pruneExpiredUserSessions,
    startAll,
};
