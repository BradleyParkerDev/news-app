import type { SavedArticleType } from '@shared/types/common/news/NewsArticleTypes.js';

export type PageContent = {
	category?: string;
	page?: number;
	limit?: number;
	articlesOnPage?: number;
	totalArticles?: number;
	totalPages?: number;
	articles?: SavedArticleType[];
	working?: boolean;
};
export type PageQueryType = {
	page?: string;
	limit?: string;
	path?: string;
};
