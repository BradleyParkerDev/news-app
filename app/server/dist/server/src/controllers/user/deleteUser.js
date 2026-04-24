import { createAuthService } from '../../services/index.js';
import { loggerFactory } from '../../lib/logger/index.js';
import dotenv from 'dotenv';
import { HTTPStatus, } from '../../../../shared/types/common/index.js';
dotenv.config();
const deleteUser = async (req, res) => {
    try {
        const auth = createAuthService(req, res);
        const userDeletionData = req.body;
        const result = await auth.user.deleteUserData(userDeletionData);
        if (!result.success) {
            let statusCode = HTTPStatus.BAD_REQUEST;
            if (result.reason === 'missing_user_id') {
                statusCode = HTTPStatus.UNAUTHORIZED;
            }
            else if (result.reason === 'missing_confirmation') {
                statusCode = HTTPStatus.BAD_REQUEST;
            }
            else if (result.reason === 'not_found') {
                statusCode = HTTPStatus.NOT_FOUND;
            }
            const response = {
                success: false,
                message: result.message,
                statusCode,
                data: null,
            };
            res.status(statusCode).json(response);
            return;
        }
        auth.removeSessionCookie();
        const response = {
            success: true,
            message: 'User has been successfully deleted!',
            statusCode: HTTPStatus.OK,
            data: null,
        };
        res.status(HTTPStatus.OK).json(response);
        loggerFactory.user.info(`DELETE - /api/user/delete-user - userId: ${userDeletionData.userId}`);
    }
    catch (error) {
        loggerFactory.user.error(`DELETE - /api/user/delete-user - error: ${error instanceof Error ? error.message : String(error)}`);
        const response = {
            success: false,
            message: 'Failed to delete user.',
            statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
            data: null,
        };
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
    }
};
export default deleteUser;
