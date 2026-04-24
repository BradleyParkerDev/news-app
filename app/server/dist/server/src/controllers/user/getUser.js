import { createAuthService, createUiService } from '../../services/index.js';
import { loggerFactory } from '../../lib/logger/index.js';
import dotenv from 'dotenv';
import { HTTPStatus, } from '../../../../shared/types/common/index.js';
dotenv.config();
const getUser = async (req, res) => {
    const auth = createAuthService(req, res);
    const ui = createUiService(req, res);
    const userId = req.body.userId;
    const userData = await auth.user.getUserData({ userId });
    if (!userData) {
        const response = {
            success: false,
            message: 'User not found.',
            statusCode: HTTPStatus.NOT_FOUND,
            data: null,
        };
        res.status(HTTPStatus.NOT_FOUND).json(response);
        loggerFactory.user.info('GET - /api/user/get-user - user not found');
        return;
    }
    const theme = await ui.getUserTheme();
    const userProfileImage = await auth.image.getUserProfileImage(userId);
    const user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailAddress: userData.emailAddress,
        userName: userData.userName,
    };
    const response = {
        success: true,
        message: 'User data successfully retrieved!',
        statusCode: HTTPStatus.OK,
        data: {
            user,
            image: {
                profileImageUrl: userProfileImage?.imageUrl ?? null,
                profileImageKey: userProfileImage?.imageKey ?? null,
            },
            theme,
        },
    };
    res.status(HTTPStatus.OK).json(response);
    loggerFactory.user.info(`GET - /api/user/get-user - userId: ${userData.userId}`);
};
export default getUser;
