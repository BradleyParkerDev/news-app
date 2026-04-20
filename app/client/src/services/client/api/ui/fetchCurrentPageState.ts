import api from '@shared/axios/index.js';
import type {
	APIResponseType,
	PageContent,
} from '@shared/types/common/index.js';

export const fetchCurrentpageState = async (
	path: string,
): Promise<PageContent> => {
	console.log(`${path}`);
	const response = await api.get<APIResponseType<PageContent>>('/news', {
		params: { path: path },
	});

	return response.data.data;
};
