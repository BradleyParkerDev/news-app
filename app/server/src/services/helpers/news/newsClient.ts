import dotenv from 'dotenv';

dotenv.config();

const newsAPIKey = process.env.NEWS_API_KEY ?? '';
const baseURL =
	process.env.NEWS_API_BASE_URL ?? 'https://newsapi.org/v2/top-headlines';

export const newsClient = {
	category: '',

	async getArticlesFromAPI() {
		switch (this.category) {
			case 'top-headlines':
				return await fetch(
					`${baseURL}?country=us&apiKey=${newsAPIKey}`,
				);

			case 'business':
				return await fetch(
					`${baseURL}?country=us&category=business&apiKey=${newsAPIKey}`,
				);

			case 'entertainment':
				return await fetch(
					`${baseURL}?country=us&category=entertainment&apiKey=${newsAPIKey}`,
				);

			case 'general':
				return await fetch(
					`${baseURL}?country=us&category=general&apiKey=${newsAPIKey}`,
				);

			case 'health':
				return await fetch(
					`${baseURL}?country=us&category=health&apiKey=${newsAPIKey}`,
				);

			case 'science':
				return await fetch(
					`${baseURL}?country=us&category=science&apiKey=${newsAPIKey}`,
				);

			case 'sports':
				return await fetch(
					`${baseURL}?country=us&category=sports&apiKey=${newsAPIKey}`,
				);

			case 'technology':
				return await fetch(
					`${baseURL}?country=us&category=technology&apiKey=${newsAPIKey}`,
				);

			default:
				return await fetch(
					`${baseURL}?country=us&apiKey=${newsAPIKey}`,
				);
		}
	},
};
