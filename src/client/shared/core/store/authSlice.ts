import { createSlice } from "@reduxjs/toolkit";

const name: string = "authUID";

export const authSlice = createSlice({
  name,
  initialState: {
    value: "",
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
