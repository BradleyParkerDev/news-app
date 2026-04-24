import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isAuth: false,
    authLoading: true,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.authLoading = false;
        },
        resetAuth: () => initialState,
    },
});
export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
