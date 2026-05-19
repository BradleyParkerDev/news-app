import api from '@shared/axios/index.js';
export const deleteSavedArticleFromClient = (savedArticleId: string) => {
	return api.delete('/news/delete-saved-article', {
		data: { savedArticleId: savedArticleId },
	});
};
