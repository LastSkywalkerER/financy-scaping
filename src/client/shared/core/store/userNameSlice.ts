import { createSlice } from '@reduxjs/toolkit';

const name: string = 'userName';

export const authSlice = createSlice({
  name,
  initialState: {
    value: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName } = authSlice.actions;

export default authSlice.reducer;
