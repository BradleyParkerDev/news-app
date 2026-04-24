import type { InferSelectModel } from 'drizzle-orm';
import { Article } from '@server/database/schemas/Articles.js';

export type SavedArticleType = InferSelectModel<typeof Article>;

export const articleCategories = [
	'business',
	'entertainment',
	'general',
	'health',
	'science',
	'sports',
	'technology',
] as const;

export type ArticleCategoryType = (typeof articleCategories)[number];

export type NewsAPISourceType = {
	id: string | null;
	name: string;
};

export type NewsAPIArticleType = {
	source: NewsAPISourceType;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
};

export type NewsAPIResponseType = {
	status: string;
	totalResults: number;
	articles: NewsAPIArticleType[];
};

export type ArticlesReturnType = Record<
	ArticleCategoryType,
	NewsAPIArticleType[]
>;
