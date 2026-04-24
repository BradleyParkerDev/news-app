import api from '../../../../../../shared/axios/index.js';
export const deleteUserData = (userAccountDeletionData) => {
    return api.delete('/user/delete-user', {
        data: userAccountDeletionData,
    });
};
