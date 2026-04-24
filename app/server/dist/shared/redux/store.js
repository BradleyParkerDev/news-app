// app/shared/redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/auth/authSlice.js';
import uiReducer from '../redux/slices/ui/uiSlice.js';
import userReducer from '../redux/slices/user/userSlice.js';
import imageReducer from '../redux/slices/image/imageSlice.js';
// Combine Reducers
const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    image: imageReducer,
});
// Create Redux Store
export function createStore(preloadedState) {
    return configureStore({
        reducer,
        preloadedState,
        // Always enable Redux DevTools in the browser; extension will no-op if absent.
        devTools: true,
    });
}
