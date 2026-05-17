import type { ArticleType } from '@shared/types/common/news/NewsArticleTypes.js';

export type PageContent = {
	category?: string;
	page?: number;
	limit?: number;
	articlesOnPage?: number;
	totalArticles?: number;
	totalPages?: number;
	articles?: ArticleType[];
	working?: boolean;
};
export type PageQueryType = {
	page?: string;
	limit?: string;
	path?: string;
	userId?: string | null;
};
