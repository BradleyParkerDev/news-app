import api from '../../../../../../shared/axios/index.js';
import axios from 'axios';
export const toggleUserTheme = async (theme) => {
    try {
        const { data: result } = await api.put('/ui/update-user-theme', {
            theme,
        });
        return result;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            return error.response.data;
        }
        throw error;
    }
};
