import api from '@shared/axios/index.js';
export const deleteSavedArticleFromClient = (articleId: string) => {
	return api.delete('/news/delete-saved-article', {
		data: { articleId: articleId },
	});
};
