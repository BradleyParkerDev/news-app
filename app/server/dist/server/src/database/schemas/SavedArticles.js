import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { User } from './Users.js';
import { Article } from './Articles.js';
export const SavedArticle = pgTable('saved_articles', {
    savedArticleId: uuid('saved_article_id')
        .primaryKey()
        .defaultRandom()
        .unique(),
    userId: uuid('user_id')
        .notNull()
        .references(() => User.userId, {
        onDelete: 'cascade',
    }),
    articleId: uuid('article_id')
        .notNull()
        .references(() => Article.articleId, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
