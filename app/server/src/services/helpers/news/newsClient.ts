import dotenv from 'dotenv';
import { loggerFactory } from '@server/lib/logger/index.js';
import {
	ArticlesReturnType,
	ArticleCategoryType,
	articleCategories,
	type NewsAPIArticleType,
	type NewsAPIResponseType,
} from '@/shared/types/common/news/NewsArticleTypes.js';
import { APICall, Article } from '@server/database/schemas/index.js';
import { db } from '@server/database/db.js';
import { eq } from 'drizzle-orm';

// Load dotenv
dotenv.config();

// NewsAPI URL
const newsAPIKey = process.env.NEWS_API_KEY ?? '';
const baseURL =
	process.env.NEWS_API_BASE_URL ?? 'https://newsapi.org/v2/top-headlines';

// Frequency of NewsAPI Calls
const NEWS_API_CALL_FREQUENCY =
	process.env.NEWS_API_CALL_FREQUENCY ?? 'minutes';
const CALL_NEWS_API_MINUTES = Number(process.env.CALL_NEWS_API_MINUTES ?? 30);
const CALL_NEWS_API_HOURS = Number(process.env.CALL_NEWS_API_HOURS ?? 1);

const getArticleUpdateFrequencyMs = () => {
	switch (NEWS_API_CALL_FREQUENCY) {
		case 'minutes':
			return CALL_NEWS_API_MINUTES * 60 * 1000;
		case 'hourly':
		default:
			return CALL_NEWS_API_HOURS * 60 * 60 * 1000;
	}
};

const emptyArticlesResult = (): ArticlesReturnType => ({
	business: [],
	entertainment: [],
	general: [],
	health: [],
	science: [],
	sports: [],
	technology: [],
});

export const newsClient = {
	apiName: 'NewsAPI',
	categories: articleCategories,
	apiCallFrequencyMs: getArticleUpdateFrequencyMs(),

	async fetchLatestArticlesFromAPI(): Promise<ArticlesReturnType | null> {
		const newsAPILastCalledAt = await this.checkLastAPICall();
		const now = Date.now();

		if (
			newsAPILastCalledAt !== null &&
			now - newsAPILastCalledAt < this.apiCallFrequencyMs
		) {
			loggerFactory.externalAPI.info(
				`[NewsAPI] - Not enough time has passed to call NewsAPI.`,
			);
			return null;
		}

		const apiCallResult = emptyArticlesResult();
		let totalArticlesAddedToDatabase = 0;

		// Nested for loop

		// Fetch articles from the NewsAPI
		for (let i = 0; i < this.categories.length; i++) {
			const category = this.categories[i];
			apiCallResult[category] = await this.getArticlesFromAPI(category);

			// Save articles in the database
			for (let j = 0; j < apiCallResult[category].length; j++) {
				const article = apiCallResult[category][j];

				// Check if article already exists in the database
				const articleExistsInDatabase =
					await this.checkIfArticleExistsInDatabase(article.url);

				if (articleExistsInDatabase) {
					continue;
				}

				// Save article if it does not exist in the database
				const savedArticleResult = await this.saveArticleToDatabase(
					article,
					category,
				);

				if (savedArticleResult) {
					totalArticlesAddedToDatabase++;
				}
			}
		}

		loggerFactory.externalAPI.info(
			`[NewsAPI] - Total articles added to database: ${totalArticlesAddedToDatabase}.`,
		);

		await this.updateLastAPICall();

		return apiCallResult;
	},

	async checkLastAPICall(): Promise<number | null> {
		try {
			const [apiCallRecord] = await db
				.select()
				.from(APICall)
				.where(eq(APICall.apiName, this.apiName));

			// If NewsAPI doesn't exist in database, create it and return null.
			if (!apiCallRecord) {
				await db
					.insert(APICall)
					.values({ apiName: this.apiName, lastUpdated: null });
				return null;
			}

			if (!apiCallRecord.lastUpdated) {
				return null;
			}

			return apiCallRecord.lastUpdated.getTime();
		} catch (error) {
			loggerFactory.externalAPI.error(
				`[NewsAPI] - Error checking NewsAPI last API call in database, error: ${error}.`,
			);
			return null;
		}
	},

	async updateLastAPICall(): Promise<void> {
		try {
			await db
				.update(APICall)
				.set({ lastUpdated: new Date() })
				.where(eq(APICall.apiName, this.apiName));
		} catch (error) {
			loggerFactory.externalAPI.error(
				`[NewsAPI] - Error updating NewsAPI last API call in database, error: ${error}.`,
			);
		}
	},

	async checkIfArticleExistsInDatabase(url: string): Promise<boolean> {
		try {
			if (!url) {
				return false;
			}

			const [foundArticle] = await db
				.select()
				.from(Article)
				.where(eq(Article.url, url));

			return Boolean(foundArticle);
		} catch (error) {
			loggerFactory.externalAPI.error(
				`[NewsAPI] - Error checking if article already exists in database, error: ${error}.`,
			);
			return false;
		}
	},

	async saveArticleToDatabase(
		article: NewsAPIArticleType,
		category: ArticleCategoryType,
	) {
		try {
			const [savedArticle] = await db
				.insert(Article)
				.values({
					sourceId: article.source.id,
					sourceName: article.source.name,
					author: article.author,
					title: article.title,
					description: article.description,
					url: article.url,
					urlToImage: article.urlToImage,
					publishedAt: new Date(article.publishedAt),
					content: article.content,
					category,
				})
				.returning();

			return savedArticle;
		} catch (error) {
			loggerFactory.externalAPI.error(
				`[NewsAPI] - Error saving article to database, error: ${error}.`,
			);
			return null;
		}
	},

	async getArticlesFromAPI(
		category: ArticleCategoryType,
	): Promise<NewsAPIArticleType[]> {
		let response: Response;

		switch (category) {
			case 'business':
				response = await fetch(
					`${baseURL}?country=us&category=business&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;

			case 'entertainment':
				response = await fetch(
					`${baseURL}?country=us&category=entertainment&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;

			case 'general':
				response = await fetch(
					`${baseURL}?country=us&category=general&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;

			case 'health':
				response = await fetch(
					`${baseURL}?country=us&category=health&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;

			case 'science':
				response = await fetch(
					`${baseURL}?country=us&category=science&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;

			case 'sports':
				response = await fetch(
					`${baseURL}?country=us&category=sports&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;

			case 'technology':
				response = await fetch(
					`${baseURL}?country=us&category=technology&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
				break;
		}

		if (!response.ok) {
			loggerFactory.externalAPI.error(
				`[NewsAPI] - Failed to fetch ${category} articles. Status: ${response.status}`,
			);
			return [];
		}

		const data: NewsAPIResponseType = await response.json();
		return data.articles ?? [];
	},
};
