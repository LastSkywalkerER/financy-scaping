import { createSlice } from '@reduxjs/toolkit';
import { themeNames } from '@styles/themes';

const name: string = 'authUID';

export const authSlice = createSlice({
  name,
  initialState: {
    value: localStorage.getItem('themeName')
      ? (JSON.parse(localStorage.getItem('themeName') || '') as string)
      : (themeNames.LIGHT as string),
  },
  reducers: {
    toggleTheme: (state) => {
      state.value =
        state.value === themeNames.LIGHT ? themeNames.DARK : themeNames.LIGHT;
      localStorage.setItem('themeName', JSON.stringify(state.value));
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = authSlice.actions;

export default authSlice.reducer;
