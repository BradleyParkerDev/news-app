import { Request, Response } from 'express';
import { loggerFactory } from '@/server/src/lib/logger/index.js';
import dotenv from 'dotenv';
import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';
import { newsHelper } from '@server/services/helpers/index.js';

dotenv.config();

const deleteSavedArticle = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const userId = req.body.userId;
	const savedArticleId = req.body.savedArticleId;

	if (!userId || !savedArticleId) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Missing userId or savedArticleId.',
			statusCode: HTTPStatus.BAD_REQUEST,
			data: null,
		};

		loggerFactory.news.error(
			`DELETE - ${req.originalUrl} - Missing userId or savedArticleId.`,
		);

		res.status(HTTPStatus.BAD_REQUEST).json(response);
		return;
	}

	try {
		await newsHelper.deleteSavedArticle(userId, savedArticleId);

		const response: APIResponseType<null> = {
			success: true,
			message: 'Saved article successfully deleted!',
			statusCode: HTTPStatus.OK,
			data: null,
		};

		loggerFactory.news.info(
			`DELETE - ${req.originalUrl} - savedArticleId: ${savedArticleId} - userId: ${userId}`,
		);

		res.status(HTTPStatus.OK).json(response);
	} catch (error) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Failed to delete saved article.',
			statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
			data: null,
		};

		loggerFactory.news.error(
			`DELETE - ${req.originalUrl} - savedArticleId: ${savedArticleId} - userId: ${userId} - Error deleting saved article: ${error}`,
		);

		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
	}
};

export default deleteSavedArticle;
