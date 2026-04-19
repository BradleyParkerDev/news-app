// ArticleCategories.ts
import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { Article } from './Articles.js';
import { NewsCategory } from './NewsCategories.js';

export const ArticleCategory = pgTable('article_categories', {
	articleCategoryId: uuid('article_category_id')
		.primaryKey()
		.defaultRandom()
		.unique(),

	articleId: uuid('article_id')
		.notNull()
		.references(() => Article.articleId, {
			onDelete: 'cascade',
		}),

	newsCategoryId: uuid('news_category_id')
		.notNull()
		.references(() => NewsCategory.newsCategoryId, {
			onDelete: 'cascade',
		}),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
