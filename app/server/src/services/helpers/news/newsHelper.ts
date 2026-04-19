import dotenv from 'dotenv';
import { type APIResultType, HTTPStatus } from '@shared/types/common/index.js';

dotenv.config();

const newsAPIKey = process.env.NEWS_API_KEY;

export const newsHelper = {
	async fetchTopStories() {},
	async fetchBusiness() {},
	async fetchEntertainment() {},
	async fetchGeneral() {},
	async fetchHealth() {},
	async fetchScience() {},
	async fetchSports() {},
	async fetchTechnology() {},
	async fetchSavedArticles() {},
};
