import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService, createUiService } from '@server/services/index.js';
import dotenv from 'dotenv';
import {
	type APIResponseType,
	type LoginCredentialsDataType,
	HTTPStatus,
} from '@shared/types/common/index.js';

dotenv.config();

const getScienceArticles = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const auth = createAuthService(req, res);
	const ui = createUiService(req, res);
};

export default getScienceArticles;
