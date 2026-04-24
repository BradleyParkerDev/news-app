import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    profileImageUrl: null,
    profileImageKey: null,
};
export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setUserProfileImage: (state, action) => {
            console.log(action.payload.profileImageUrl);
            state.profileImageUrl = action.payload.profileImageUrl;
            state.profileImageKey = action.payload.profileImageKey;
        },
        removeUserProfileImage: () => initialState,
    },
});
export const { setUserProfileImage, removeUserProfileImage } = imageSlice.actions;
export default imageSlice.reducer;
