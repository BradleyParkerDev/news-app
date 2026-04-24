import api from '../../../../../../shared/axios/index.js';
export const registerNewUser = (userRegistrationData) => {
    return api.post('/user/register-user', userRegistrationData);
};
