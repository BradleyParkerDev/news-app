// NewsCategories.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const NewsCategory = pgTable('news_categories', {
	newsCategoryId: uuid('news_category_id')
		.primaryKey()
		.defaultRandom()
		.unique(),

	name: text('name').notNull().unique(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
