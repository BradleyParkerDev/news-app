import axios from 'axios';
import { clientApiServices } from '../../../services/client/index.js';
import { HTTPStatus } from '../../../../../shared/types/common/index.js';
import { setUser, resetUser } from '../../../../../shared/redux/slices/user/userSlice.js';
import { setAuth, resetAuth } from '../../../../../shared/redux/slices/auth/authSlice.js';
import { setTheme, resetUI } from '../../../../../shared/redux/slices/ui/uiSlice.js';
import { setUserProfileImage, removeUserProfileImage, } from '../../../../../shared/redux/slices/image/imageSlice.js';
export const useUserAuthHelper = ({ dispatch, ui }) => {
    const login = async (loginCredentials) => {
        try {
            const loginResponse = await clientApiServices.auth.loginUser(loginCredentials);
            const loginResult = loginResponse.data;
            if (!loginResult.success) {
                return loginResult;
            }
            const userResponse = await clientApiServices.user.fetchUserData();
            const userResult = userResponse.data;
            if (!userResult.success || !userResult.data) {
                return userResult;
            }
            const { user: userData, image, theme } = userResult.data;
            dispatch(setUser({ userData }));
            dispatch(setAuth({ isAuth: true }));
            dispatch(setUserProfileImage({
                profileImageUrl: image?.profileImageUrl ?? null,
                profileImageKey: image?.profileImageKey ?? null,
            }));
            dispatch(setTheme({ theme }));
            ui.navigateTo(`/user/${userData.userName}`);
            return loginResult;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
            const fallback = {
                success: false,
                message: 'Login failed.',
                statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
                data: null,
            };
            return fallback;
        }
    };
    const logout = async () => {
        try {
            const response = await clientApiServices.auth.logoutUser();
            const result = response.data;
            if (result.success) {
                dispatch(resetUser());
                dispatch(resetAuth());
                dispatch(removeUserProfileImage());
                dispatch(resetUI());
            }
            return result;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
            const fallback = {
                success: false,
                message: 'Something went wrong. Please try again.',
                statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
                data: null,
            };
            return fallback;
        }
    };
    return {
        login,
        logout,
    };
};
