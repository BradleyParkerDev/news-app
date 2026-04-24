import api from '../../../../../../shared/axios/index.js';
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/image/upload-image', formData);
};
