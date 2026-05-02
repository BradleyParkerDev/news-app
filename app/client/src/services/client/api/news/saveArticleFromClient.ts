import api from '@shared/axios/index.js';
export const saveArticleFromClient = (articleId: string) => {
	return api.post('/news/save-article', {
		articleId: articleId,
	});
};
