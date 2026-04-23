import dotenv from 'dotenv';

dotenv.config();

const newsAPIKey = process.env.NEWS_API_KEY ?? '';
const baseURL =
	process.env.NEWS_API_BASE_URL ?? 'https://newsapi.org/v2/top-headlines';

export const newsClient = {
	async getArticlesFromAPI(category: string) {
		switch (category) {
			case 'business':
				return await fetch(
					`${baseURL}?country=us&category=business&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			case 'entertainment':
				return await fetch(
					`${baseURL}?country=us&category=entertainment&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			case 'general':
				return await fetch(
					`${baseURL}?country=us&category=general&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			case 'health':
				return await fetch(
					`${baseURL}?country=us&category=health&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			case 'science':
				return await fetch(
					`${baseURL}?country=us&category=science&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			case 'sports':
				return await fetch(
					`${baseURL}?country=us&category=sports&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			case 'technology':
				return await fetch(
					`${baseURL}?country=us&category=technology&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);

			default:
				return await fetch(
					`${baseURL}?country=us&pageSize=100&page=1&apiKey=${newsAPIKey}`,
				);
		}
	},
};
