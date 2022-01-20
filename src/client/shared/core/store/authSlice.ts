import { createSlice } from '@reduxjs/toolkit';

const name: string = 'auth';

export const authSlice = createSlice({
  name,
  initialState: {
    UID: localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name) || '')
      : '',
    token: '',
  },
  reducers: {
    login: (state, action) => {
      state.UID = action.payload.UID;
      state.token = action.payload.token;
      localStorage.setItem(name, JSON.stringify(action.payload.UID));
    },
    logout: (state) => {
      state.UID = '';
      state.token = '';
      localStorage.removeItem(name);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
