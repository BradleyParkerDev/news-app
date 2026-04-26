import dotenv from 'dotenv';
import type { PageContent, PageQueryType } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { Article } from '@server/database/schemas/Articles.js';
import { db } from '@server/database/db.js';
import { eq, desc, count } from 'drizzle-orm';

const getPagination = (query: PageQueryType) => {
	const page = Math.max(1, Number(query.page ?? 1));
	const limit = Math.max(1, Number(query.limit ?? 25));
	const offset = (page - 1) * limit;

	return { page, limit, offset };
};

export const newsHelper = {
	client: newsClient,

	async fetchTopHeadlines(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article);
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'Top Headlines',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchBusiness(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'business'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'business'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);
		return {
			category: 'Business',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchEntertainment(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'entertainment'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'entertainment'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'Entertainment',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchGeneral(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'general'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'general'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'General',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchHealth(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'health'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'health'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'Health',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchScience(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'science'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'science'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'Science',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchSports(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'sports'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'sports'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'Sports',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchTechnology(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset } = getPagination(query);
		const articles = await db
			.select()
			.from(Article)
			.where(eq(Article.category, 'technology'))
			.orderBy(desc(Article.publishedAt))
			.limit(limit)
			.offset(offset);

		const [totalResult] = await db
			.select({ totalArticles: count() })
			.from(Article)
			.where(eq(Article.category, 'technology'));
		const totalArticles = Number(totalResult?.totalArticles ?? 0);
		const totalPages = Math.ceil(totalArticles / limit);

		return {
			category: 'Technology',
			page: page,
			limit: limit,
			articlesOnPage: articles.length,
			totalArticles: totalArticles,
			totalPages: totalPages,
			articles: articles,
			working: true,
		};
	},

	async fetchSavedArticles(query: PageQueryType): Promise<PageContent> {
		return { category: 'Saved Articles', working: true };
	},
};
