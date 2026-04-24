import { newsClient } from './newsClient.js';
import { Article } from '../../../database/schemas/Articles.js';
import { db } from '../../../database/db.js';
import { eq, desc } from 'drizzle-orm';
export const newsHelper = {
    client: newsClient,
    async fetchTopHeadlines() {
        const articles = await db
            .select()
            .from(Article)
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Top Headlines',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchBusiness() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'business'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Business',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchEntertainment() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'entertainment'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Entertainment',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchGeneral() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'general'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'General',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchHealth() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'health'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Health',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchScience() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'science'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Science',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchSports() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'sports'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Sports',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchTechnology() {
        const articles = await db
            .select()
            .from(Article)
            .where(eq(Article.category, 'technology'))
            .orderBy(desc(Article.publishedAt));
        return {
            category: 'Technology',
            numberOfArticles: articles.length,
            articles,
            working: true,
        };
    },
    async fetchSavedArticles() {
        return { category: 'Saved Articles', working: true };
    },
};
