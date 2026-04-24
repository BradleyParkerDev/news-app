import api from '../../../../../../shared/axios/index.js';
export const fetchCurrentpageState = async (path) => {
    const response = await api.get(`/news${path}`, {
        params: { path },
    });
    return response.data.data;
};
