import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import {
	loadCurrentPageState,
	toggleCurrentPageIsLoading,
	toggleUserSavedArticlesUpdated,
} from '@shared/redux/slices/ui/uiSlice.js';
import { clientApiServices } from '@client/services/client/index.js';

export const useUIPageHelper = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { currentPage, userSavedArticlesUpdated } = useAppSelector(
		(state) => state.ui,
	);
	const userName = useAppSelector((state) => state.user.userName);

	useEffect(() => {
		const routePath = location.pathname;
		const routeSearch = location.search;
		const fullRoute = `${routePath}${routeSearch}`;

		if (
			currentPage.path === fullRoute &&
			currentPage.isLoading === false &&
			userSavedArticlesUpdated === false
		) {
			return;
		}

		let isMounted = true;

		const getApiPath = () => {
			if (routePath === '/') {
				return `/top-headlines${routeSearch}`;
			}

			if (routePath === `/user/${userName}`) {
				return `/saved-articles${routeSearch}`;
			}

			return `${routePath}${routeSearch}`;
		};

		const getPageData = async () => {
			dispatch(
				toggleCurrentPageIsLoading({
					currentPage: { isLoading: true },
				}),
			);

			try {
				const apiPath = getApiPath();
				console.log(apiPath);
				const pageContent =
					await clientApiServices.ui.fetchCurrentpageState(apiPath);

				if (!isMounted) return;
				console.log(pageContent);
				dispatch(
					loadCurrentPageState({
						currentPage: {
							path: fullRoute,
							content: pageContent,
							isLoading: false,
						},
					}),
				);
				dispatch(
					toggleUserSavedArticlesUpdated({
						userSavedArticlesUpdated: false,
					}),
				);
			} catch {
				if (!isMounted) return;

				dispatch(
					loadCurrentPageState({
						currentPage: {
							path: fullRoute,
							content: {},
							isLoading: false,
						},
					}),
				);
				dispatch(
					toggleUserSavedArticlesUpdated({
						userSavedArticlesUpdated: false,
					}),
				);
			}
		};

		void getPageData();

		return () => {
			isMounted = false;
			dispatch(
				toggleUserSavedArticlesUpdated({
					userSavedArticlesUpdated: false,
				}),
			);
		};
	}, [
		location.pathname,
		location.search,
		userName,
		userSavedArticlesUpdated,
		dispatch,
	]);
};
