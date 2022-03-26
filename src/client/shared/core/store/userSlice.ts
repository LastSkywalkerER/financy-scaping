import { createSlice } from '@reduxjs/toolkit';

const name: string = 'userName';

export const userSlice = createSlice({
  name,
  initialState: {
    name: '',
    userId: '',
    token: '',
  },
  reducers: {
    setUserName: (state, { payload }) => {
      state.name = payload;
    },
    setUserCredential: (state, { payload }) => {
      const { userId, token } = payload;
      state.userId = userId;
      state.token = token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setUserCredential } = userSlice.actions;

export default userSlice.reducer;
