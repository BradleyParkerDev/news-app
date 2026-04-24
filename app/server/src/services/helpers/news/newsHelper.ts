import dotenv from 'dotenv';
import type { PageContent } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { Article } from '@server/database/schemas/Articles.js';
import { db } from '@server/database/db.js';
import { eq } from 'drizzle-orm';

export const newsHelper = {
	client: newsClient,

	async fetchTopHeadlines(): Promise<PageContent> {
		return { category: 'Top Headlines', working: true };
	},

	async fetchBusiness(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'business'));

		return { category: 'Business', articles, working: true };
	},

	async fetchEntertainment(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'entertainment'));

		return { category: 'Entertainment', articles, working: true };
	},

	async fetchGeneral(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'general'));

		return { category: 'General', articles, working: true };
	},

	async fetchHealth(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'health'));

		return { category: 'Health', articles, working: true };
	},

	async fetchScience(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'science'));

		return { category: 'Science', articles, working: true };
	},

	async fetchSports(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'sports'));

		return { category: 'Sports', articles, working: true };
	},

	async fetchTechnology(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'technology'));

		return { category: 'Technology', articles, working: true };
	},

	async fetchSavedArticles(): Promise<PageContent> {
		return { category: 'Saved Articles', working: true };
	},
};
