import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    userName: '',
};
// Create the slice
export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload.userData);
            const { firstName, lastName, emailAddress, userName } = action.payload.userData;
            if (firstName !== undefined)
                state.firstName = firstName;
            if (lastName !== undefined)
                state.lastName = lastName;
            if (emailAddress !== undefined)
                state.emailAddress = emailAddress;
            if (userName !== undefined)
                state.userName = userName;
        },
        resetUser: () => initialState,
    },
});
export const { setUser, resetUser } = usersSlice.actions;
export default usersSlice.reducer;
