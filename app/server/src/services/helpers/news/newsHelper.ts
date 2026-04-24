import dotenv from 'dotenv';
import type { PageContent } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { Article } from '@server/database/schemas/Articles.js';
import { db } from '@server/database/db.js';
import { eq, desc } from 'drizzle-orm';

export const newsHelper = {
	client: newsClient,

	async fetchTopHeadlines(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Top Headlines',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchBusiness(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'business'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Business',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchEntertainment(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'entertainment'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Entertainment',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchGeneral(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'general'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'General',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchHealth(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'health'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Health',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchScience(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'science'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Science',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchSports(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'sports'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Sports',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchTechnology(): Promise<PageContent> {
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'technology'))
			.orderBy(desc(Article.publishedAt));

		return {
			category: 'Technology',
			numberOfArticles: articles.length,
			articles,
			working: true,
		};
	},

	async fetchSavedArticles(): Promise<PageContent> {
		return { category: 'Saved Articles', working: true };
	},
};
