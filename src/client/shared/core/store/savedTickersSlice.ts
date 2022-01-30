import { createSlice } from '@reduxjs/toolkit';
import { themeNames } from '@styles/themes';
import Token from 'src/types/Token';

const name: string = 'savedTickers';

export const savedTickers = createSlice({
  name,
  initialState: { list: [] as Token[], isLoaded: false },
  reducers: {
    setSavedTickers: (state, action) => {
      state.list = action.payload.dataTable;
    },
    setSavedTickersIsLoaded: (state, action) => {
      state.isLoaded = action.payload.isLoaded;
    },
    addSavedTickers: (state, action) => {
      state.list = [...state.list, ...action.payload.dataTable];
    },
    deleteSavedTickers: (state, action) => {
      state.list = state.list.filter(
        (ticker) => action.payload.deleteIds.indexOf(ticker.symbol) === -1,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSavedTickers,
  setSavedTickersIsLoaded,
  addSavedTickers,
  deleteSavedTickers,
} = savedTickers.actions;

export default savedTickers.reducer;
