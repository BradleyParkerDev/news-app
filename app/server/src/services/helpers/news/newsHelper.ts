import dotenv from 'dotenv';
import type { PageContent, PageQueryType } from '@shared/types/common/index.js';
import { newsClient } from './newsClient.js';
import { Article, SavedArticle } from '@server/database/schemas/index.js';
import { db } from '@server/database/db.js';
import { eq, desc, count, and, getTableColumns, lt } from 'drizzle-orm';

// Load dotenv
dotenv.config();

const getPagination = (query: PageQueryType) => {
	const page = Math.max(1, Number(query.page ?? 1));
	const limit = Math.max(1, Number(query.limit ?? 25));
	const offset = (page - 1) * limit;
	const userId = query.userId ? query.userId : null;

	return { page, limit, offset, userId };
};

const ARTICLE_CLEAN_UP_MODE = process.env.ARTICLE_CLEAN_UP_MODE ?? 'short';
const ARTICLE_CLEAN_UP_SHORT_HOURS = Number(
	process.env.ARTICLE_CLEAN_UP_SHORT_HOURS ?? 24,
);
const ARTICLE_CLEAN_UP_MEDIUM_DAYS = Number(
	process.env.ARTICLE_CLEAN_UP_MEDIUM_DAYS ?? 5,
);
const ARTICLE_CLEAN_UP_LONG_MONTHS = Number(
	process.env.ARTICLE_CLEAN_UP_LONG_MONTHS ?? 18,
);

const getArticleCleanUpDate = () => {
	const now = Date.now();

	switch (ARTICLE_CLEAN_UP_MODE) {
		case 'short':
			return new Date(
				now - ARTICLE_CLEAN_UP_SHORT_HOURS * 60 * 60 * 1000,
			);
		case 'long':
			return new Date(
				now -
					ARTICLE_CLEAN_UP_LONG_MONTHS * 30.42 * 24 * 60 * 60 * 1000,
			);
		case 'medium':
		default:
			return new Date(
				now - ARTICLE_CLEAN_UP_MEDIUM_DAYS * 24 * 60 * 60 * 1000,
			);
	}
};

export const newsHelper = {
	client: newsClient,
	articleCleanUpDate: getArticleCleanUpDate(),

	async fetchTopHeadlines(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);

		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
		} else {
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
		}
	},

	async fetchBusiness(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);
		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
		} else {
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
		}
	},

	async fetchEntertainment(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);

		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		} else {
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		}
	},

	async fetchGeneral(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);

		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		} else {
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		}
	},

	async fetchHealth(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);

		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		} else {
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		}
	},

	async fetchScience(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);

		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		} else {
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		}
	},

	async fetchSports(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);

		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		} else {
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
				page,
				limit,
				articlesOnPage: articles.length,
				totalArticles,
				totalPages,
				articles,
				working: true,
			};
		}
	},

	async fetchTechnology(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);
		if (userId) {
			const articles = await db

				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(Article)
				.leftJoin(
					SavedArticle,
					and(
						eq(SavedArticle.articleId, Article.articleId),
						eq(SavedArticle.userId, userId),
					),
				)

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
		} else {
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
		}
	},
	async fetchSavedArticles(query: PageQueryType): Promise<PageContent> {
		const { page, limit, offset, userId } = getPagination(query);
		if (userId) {
			const articles = await db
				.select({
					...getTableColumns(Article),
					savedArticleId: SavedArticle.savedArticleId,
				})
				.from(SavedArticle)
				.innerJoin(
					Article,
					eq(SavedArticle.articleId, Article.articleId),
				)
				.where(eq(SavedArticle.userId, userId))
				.orderBy(desc(SavedArticle.lastUpdated))
				.limit(limit)
				.offset(offset);

			const [totalResult] = await db
				.select({ totalArticles: count() })
				.from(SavedArticle)
				.where(eq(SavedArticle.userId, userId));

			const totalArticles = Number(totalResult?.totalArticles ?? 0);
			const totalPages = Math.ceil(totalArticles / limit);

			return {
				category: 'Saved Articles',
				page: page,
				limit: limit,
				articlesOnPage: articles.length,
				totalArticles: totalArticles,
				totalPages: totalPages,
				articles: articles,
				working: true,
			};
		}

		return { category: 'Saved Articles', working: true };
	},

	async deleteOlderArticles(): Promise<number> {
		const cleanUpDate = getArticleCleanUpDate();

		const deletedArticles = await db
			.delete(Article)
			.where(lt(Article.createdAt, cleanUpDate))
			.returning({ articleId: Article.articleId });

		return deletedArticles.length;
	},
	async deleteSavedArticle(
		userId: string,
		savedArticleId: string,
	): Promise<void> {
		await db
			.delete(SavedArticle)
			.where(
				and(
					eq(SavedArticle.savedArticleId, savedArticleId),
					eq(SavedArticle.userId, userId),
				),
			);
	},

	async saveArticle(userId: string, articleId: string): Promise<void> {
		const saveArticleValues = {
			userId,
			articleId,
		};

		await db
			.insert(SavedArticle)
			.values({
				userId,
				articleId,
			})
			.onConflictDoNothing({
				target: [SavedArticle.userId, SavedArticle.articleId],
			});
	},
};
