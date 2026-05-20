import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import type { APIResponseType } from '@shared/types/common/index.js';
import { HTTPStatus } from '@shared/types/common/index.js';
import { toggleUserSavedArticlesUpdated } from '@shared/redux/slices/ui/uiSlice.js';

export const useNewsHelper = () => {
	const dispatch = useAppDispatch();
	const image = useAppSelector((state) => state.image);

	const { profileImageUrl, profileImageKey } = image;

	const deleteArticle = async (savedArticleId: string) => {
		try {
			const response =
				await clientApiServices.news.deleteSavedArticleFromClient(
					savedArticleId,
				);
			const result = response.data;

			console.log(result);

			result.success
				? dispatch(
						toggleUserSavedArticlesUpdated({
							userSavedArticlesUpdated: true,
						}),
					)
				: '';

			return result;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data) {
				return error.response.data;
			}

			const fallback: APIResponseType<null> = {
				success: false,
				message: 'Failed to delete saved article.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};

			return fallback;
		}
	};

	const saveArticle = async (articleId: string) => {
		try {
			const response =
				await clientApiServices.news.saveArticleFromClient(articleId);
			const result = response.data;

			console.log(result);
			result.success
				? dispatch(
						toggleUserSavedArticlesUpdated({
							userSavedArticlesUpdated: true,
						}),
					)
				: '';
			return result;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data) {
				return error.response.data;
			}

			const fallback: APIResponseType<null> = {
				success: false,
				message: 'Failed to saved article for user.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};

			return fallback;
		}
	};

	return {
		deleteArticle,
		saveArticle,
	};
};
