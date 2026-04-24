import api from '../../../../../../shared/axios/index.js';
export const loginUser = (loginCredentials) => {
    return api.post('/auth/login-user', loginCredentials);
};
