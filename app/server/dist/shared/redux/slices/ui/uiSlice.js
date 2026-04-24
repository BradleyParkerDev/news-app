import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    appName: '',
    theme: 'light',
    authPageForm: '',
    currentPage: { path: '', content: {}, isLoading: false },
};
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAppName: (state, action) => {
            state.appName = action.payload.appName;
        },
        setTheme: (state, action) => {
            state.theme = action.payload.theme;
        },
        resetUI: (state) => initialState,
        handleAuthPageFormToggle: (state, action) => {
            state.authPageForm = action.payload.authPageForm;
        },
        loadCurrentPageState: (state, action) => {
            state.currentPage = action.payload.currentPage;
        },
        toggleCurrentIsLoading: (state, action) => {
            state.currentPage.isLoading = action.payload.currentPage.isLoading;
        },
    },
});
export const { setAppName, setTheme, resetUI, handleAuthPageFormToggle, loadCurrentPageState, toggleCurrentIsLoading, } = uiSlice.actions;
export default uiSlice.reducer;
