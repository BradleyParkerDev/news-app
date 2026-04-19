// Articles.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const Article = pgTable('articles', {
	articleId: uuid('article_id').primaryKey().defaultRandom().unique(),

	sourceId: text('source_id'),
	sourceName: text('source_name').notNull(),

	author: text('author'),
	title: text('title').notNull(),
	description: text('description'),
	url: text('url').notNull().unique(),
	urlToImage: text('url_to_image'),
	publishedAt: timestamp('published_at'),
	content: text('content'),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
