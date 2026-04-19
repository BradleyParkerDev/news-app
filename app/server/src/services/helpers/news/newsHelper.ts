import dotenv from 'dotenv';
import type { PageContent } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';

export const newsHelper = {
	client: newsClient,
	async fetchTopStories(): Promise<PageContent> {
		return {};
	},
	async fetchBusiness(): Promise<PageContent> {
		return {};
	},
	async fetchEntertainment(): Promise<PageContent> {
		return {};
	},
	async fetchGeneral(): Promise<PageContent> {
		return {};
	},
	async fetchHealth(): Promise<PageContent> {
		return {};
	},
	async fetchScience(): Promise<PageContent> {
		return {};
	},
	async fetchSports(): Promise<PageContent> {
		return {};
	},
	async fetchTechnology(): Promise<PageContent> {
		return {};
	},
	async fetchSavedArticles(): Promise<PageContent> {
		return {};
	},
};
