import { loggerFactory } from '../../lib/logger/index.js';
import { createAuthService, createUiService } from '../../services/index.js';
import dotenv from 'dotenv';
import { HTTPStatus, } from '../../../../shared/types/common/index.js';
dotenv.config();
const getGeneralArticles = async (req, res) => {
    createAuthService(req, res);
    const ui = createUiService(req, res);
    const path = req.query.path;
    const sessionId = req.body?.sessionId ?? 'unknown';
    const currentPage = await ui.page.getPageContent();
    const response = {
        success: true,
        message: `User wants data from this path: ${path}`,
        statusCode: HTTPStatus.OK,
        data: currentPage,
    };
    loggerFactory.news.info(`GET - ${req.originalUrl} - sessionId: ${sessionId}`);
    res.status(HTTPStatus.OK).json(response);
};
export default getGeneralArticles;
