import dotenv from 'dotenv';
import type { PageContent } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';
import { loggerFactory } from '@server/lib/logger/index.js';

const articles = {
	business: [],
	entertainment: [],
	general: [],
	health: [],
	science: [],
	sports: [],
	technology: [],
};

dotenv.config();

const NEWS_API_CALL_FREQUENCY =
	process.env.NEWS_API_CALL_FREQUENCY ?? 'minutes';
const CALL_NEWS_API_MINUTES = Number(process.env.CALL_NEWS_API_MINUTES ?? 30);
const CALL_NEWS_API_HOURS = Number(process.env.CALL_NEWS_API_HOURS ?? 1);

const getArticleUpdateFrequencyMs = () => {
	switch (NEWS_API_CALL_FREQUENCY) {
		case 'minutes':
			return CALL_NEWS_API_MINUTES * 60 * 1000;
		case 'hourly':
		default:
			return CALL_NEWS_API_HOURS * 60 * 60 * 1000;
	}
};

export const newsHelper = {
	client: newsClient,
	apiCallFrequencyMs: getArticleUpdateFrequencyMs(),

	async fetchLatestArticlesFromAPI(): Promise<PageContent> {
		const newsAPILastCalledAt = await this.checkLastAPICall();
		const now = Date.now();

		if (
			newsAPILastCalledAt !== null &&
			now - newsAPILastCalledAt < this.apiCallFrequencyMs
		) {
			loggerFactory.externalAPI.info(
				`[NewsAPI] - Not enough time has passed to call NewsAPI.`,
			);
			return {};
		}

		const categories = Object.keys(articles);
		console.log(categories);

		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];
			console.log(category);
		}

		return {};
	},

	async checkLastAPICall(): Promise<number | null> {
		// You might not need this as a separate function if the lookup stays simple,
		// but it is fine to keep if you want the time-check logic separated.
		return null;
	},

	async checkIfArticleExistsInDatabase(category?: string, url?: string) {
		return;
	},

	async saveArticleToDatabase(article?: any) {
		return;
	},

	async fetchTopHeadlines(): Promise<PageContent> {
		return { category: 'Top Headlines', working: true };
	},

	async fetchBusiness(): Promise<PageContent> {
		return { category: 'Business', working: true };
	},

	async fetchEntertainment(): Promise<PageContent> {
		return { category: 'Entertainment', working: true };
	},

	async fetchGeneral(): Promise<PageContent> {
		return { category: 'General', working: true };
	},

	async fetchHealth(): Promise<PageContent> {
		return { category: 'Health', working: true };
	},

	async fetchScience(): Promise<PageContent> {
		return { category: 'Science', working: true };
	},

	async fetchSports(): Promise<PageContent> {
		return { category: 'Sports', working: true };
	},

	async fetchTechnology(): Promise<PageContent> {
		return { category: 'Technology', working: true };
	},

	async fetchSavedArticles(): Promise<PageContent> {
		return { category: 'Saved Articles', working: true };
	},
};
