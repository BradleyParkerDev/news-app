import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UIState } from '@shared/types/common/redux/index.js';

const initialState: UIState = {
	appName: '',
	theme: 'light',
	authPageForm: '',
	currentPage: { path: '', content: {}, isLoading: false },
	userSavedArticlesUpdated: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setAppName: (
			state,
			action: PayloadAction<{ appName: UIState['appName'] }>,
		) => {
			state.appName = action.payload.appName;
		},
		setTheme: (
			state,
			action: PayloadAction<{ theme: UIState['theme'] }>,
		) => {
			state.theme = action.payload.theme;
		},
		resetUI: (state) => initialState,

		handleAuthPageFormToggle: (
			state,
			action: PayloadAction<{
				authPageForm: UIState['authPageForm'];
			}>,
		) => {
			state.authPageForm = action.payload.authPageForm;
		},

		loadCurrentPageState: (
			state,
			action: PayloadAction<{
				currentPage: UIState['currentPage'];
			}>,
		) => {
			state.currentPage = action.payload.currentPage;
		},
		toggleCurrentPageIsLoading: (
			state,
			action: PayloadAction<{
				currentPage: UIState['currentPage'];
			}>,
		) => {
			state.currentPage.isLoading = action.payload.currentPage.isLoading;
		},
		toggleUserSavedArticlesUpdated: (
			state,
			action: PayloadAction<{
				userSavedArticlesUpdated: UIState['userSavedArticlesUpdated'];
			}>,
		) => {
			state.userSavedArticlesUpdated =
				action.payload.userSavedArticlesUpdated;
		},
	},
});

export const {
	setAppName,
	setTheme,
	resetUI,
	handleAuthPageFormToggle,
	loadCurrentPageState,
	toggleCurrentPageIsLoading,
	toggleUserSavedArticlesUpdated,
} = uiSlice.actions;
export default uiSlice.reducer;
