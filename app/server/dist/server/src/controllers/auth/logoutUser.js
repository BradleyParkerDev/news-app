import { loggerFactory } from '../../lib/logger/index.js';
import { createAuthService } from '../../services/index.js';
import dotenv from 'dotenv';
import { HTTPStatus, } from '../../../../shared/types/common/index.js';
dotenv.config();
const logoutUser = async (req, res) => {
    try {
        const auth = createAuthService(req, res);
        const { sessionId, userId } = req.body;
        if (!sessionId) {
            const response = {
                success: false,
                message: 'Session ID is required to log out.',
                statusCode: HTTPStatus.BAD_REQUEST,
                data: null,
            };
            res.status(HTTPStatus.BAD_REQUEST).json(response);
            return;
        }
        await auth.deleteUserSession(sessionId);
        auth.removeSessionCookie();
        auth.clearReqBody();
        // Create a fresh guest session after logout/session reset
        await auth.createUserSession();
        const response = {
            success: true,
            message: 'Session ended successfully.',
            statusCode: HTTPStatus.OK,
            data: null,
        };
        res.status(HTTPStatus.OK).json(response);
        loggerFactory.auth.info(`DELETE - /api/auth/logout-user - sessionType: ${userId ? 'Authenticated' : 'Guest'} - userId: ${userId ?? 'unknown'} - sessionId: ${sessionId}`);
    }
    catch (error) {
        loggerFactory.auth.error(`DELETE - /api/auth/logout-user - error: ${error instanceof Error ? error.message : String(error)}`);
        const response = {
            success: false,
            message: 'Failed to end session.',
            statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
            data: null,
        };
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
    }
};
export default logoutUser;
