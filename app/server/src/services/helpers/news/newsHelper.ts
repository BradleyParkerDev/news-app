import dotenv from 'dotenv';
import type { PageContent } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';
import { loggerFactory } from '@server/lib/logger/index.js';

export const newsHelper = {
	client: newsClient,

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
