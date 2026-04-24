import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
export const NEWS_CATEGORIES = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
];
export const newsCategoryEnum = pgEnum('news_category', NEWS_CATEGORIES);
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
    category: newsCategoryEnum('category').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
