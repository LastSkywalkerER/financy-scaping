import { StorageNames } from '@core/constants';
import {
  addToStorage,
  removeFromStorage,
} from '@core/utilities/storageManager';
import { createSlice } from '@reduxjs/toolkit';

const name: string = 'auth';

export const userSlice = createSlice({
  name,
  initialState: {
    name: 'Test',
    userId: '',
    token: '',
    loading: true,
  },
  reducers: {
    setUserName: (state, { payload }) => {
      state.name = payload;
    },
    registerRequest: (state, { payload }) => {
      state.loading = true;
    },
    registerResponse: (state) => {
      state.loading = false;
    },
    loginRequest: (state, { payload }) => {
      state.loading = true;
    },
    loginResponse: (state, { payload }) => {
      const { userId, token } = payload;

      addToStorage(StorageNames.TOKEN, token);

      state.userId = userId;
      state.token = token;
      state.loading = false;
    },
    statusRequest: (state) => {},
    logout: (state) => {
      state.userId = '';
      state.token = '';

      removeFromStorage(StorageNames.TOKEN);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserName,
  registerRequest,
  registerResponse,
  loginRequest,
  loginResponse,
  statusRequest,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
