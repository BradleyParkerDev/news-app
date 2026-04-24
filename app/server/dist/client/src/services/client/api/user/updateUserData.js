import api from '../../../../../../shared/axios/index.js';
export const updateUserData = (userUpdateData) => {
    return api.put('/user/update-user', userUpdateData);
};
