import { createSlice } from '@reduxjs/toolkit';

const name: string = 'auth';

export const authSlice = createSlice({
  name,
  initialState: {
    userId: '',
    token: '',
  },
  reducers: {
    loginStore: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logoutStore: (state) => {
      state.userId = '';
      state.token = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStore, logoutStore } = authSlice.actions;

export default authSlice.reducer;
