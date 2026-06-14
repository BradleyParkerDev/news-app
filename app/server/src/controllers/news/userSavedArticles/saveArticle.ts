import { Request, Response } from 'express';
import { loggerFactory } from '@/server/src/lib/logger/index.js';
import dotenv from 'dotenv';
import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';
import { newsHelper } from '@server/services/helpers/index.js';

dotenv.config();

const saveArticle = async (req: Request, res: Response): Promise<void> => {
	const { userId } = ((req as any).authContext ?? {}) as {
		userId?: string;
	};
	const articleId = req.body.articleId;
	console.log(req.body);
	if (!userId || !articleId) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Missing userId or articleId.',
			statusCode: HTTPStatus.BAD_REQUEST,
			data: null,
		};

		loggerFactory.news.error(
			`POST - ${req.originalUrl} - Missing userId or articleId.`,
		);

		res.status(HTTPStatus.BAD_REQUEST).json(response);
		return;
	}

	try {
		await newsHelper.saveArticle(userId, articleId);

		const response: APIResponseType<null> = {
			success: true,
			message: 'Article successfully saved!',
			statusCode: HTTPStatus.OK,
			data: null,
		};

		loggerFactory.news.info(
			`POST - ${req.originalUrl} - articleId: ${articleId} - userId: ${userId}`,
		);

		res.status(HTTPStatus.OK).json(response);
	} catch (error) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Failed to save article.',
			statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
			data: null,
		};

		loggerFactory.news.error(
			`POST - ${req.originalUrl} - articleId: ${articleId} - userId: ${userId} - Error saving article: ${error}`,
		);

		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
	}
};

export default saveArticle;
