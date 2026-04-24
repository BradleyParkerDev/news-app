import axios from 'axios';
import { clientApiServices } from '../../../services/client/index.js';
import { HTTPStatus } from '../../../../../shared/types/common/index.js';
import { setUser, resetUser } from '../../../../../shared/redux/slices/user/userSlice.js';
import { setAuth, resetAuth } from '../../../../../shared/redux/slices/auth/authSlice.js';
import { setTheme, resetUI } from '../../../../../shared/redux/slices/ui/uiSlice.js';
import { setUserProfileImage, removeUserProfileImage, } from '../../../../../shared/redux/slices/image/imageSlice.js';
export const useUserCrudHelper = ({ dispatch, ui }) => {
    const signUp = async (userRegistrationData) => {
        try {
            const response = await clientApiServices.user.registerNewUser(userRegistrationData);
            const result = response.data;
            return result;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
            throw error;
        }
    };
    const update = async (userUpdateData) => {
        try {
            const response = await clientApiServices.user.updateUserData(userUpdateData);
            const result = response.data;
            if (!result.success) {
                return result;
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
            return result;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
            throw error;
        }
    };
    const deleteUserAccount = async (userAccountDeletionData) => {
        try {
            const response = await clientApiServices.user.deleteUserData(userAccountDeletionData);
            const result = response.data;
            if (result.success) {
                dispatch(resetUser());
                dispatch(resetAuth());
                dispatch(removeUserProfileImage());
                dispatch(resetUI());
                ui.navigateTo('/');
            }
            return result;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
            const fallback = {
                success: false,
                message: 'Failed to delete user account.',
                statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
                data: null,
            };
            return fallback;
        }
    };
    return {
        signUp,
        update,
        deleteUserAccount,
    };
};
