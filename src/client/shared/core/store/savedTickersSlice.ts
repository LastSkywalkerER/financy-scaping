import { createSlice } from '@reduxjs/toolkit';
import { themeNames } from '@styles/themes';
import Token from 'src/types/Token';

const name: string = 'savedTickers';

export const savedTickers = createSlice({
  name,
  initialState: {
    list: [] as Token[],
    filteredList: [] as Token[],
    isLoaded: false,
  },
  reducers: {
    setSavedTickers: (state, { payload }) => {
      state.filteredList = payload.dataTable;
      state.list = payload.dataTable;
    },
    setSavedTickersIsLoaded: (state, { payload }) => {
      state.isLoaded = payload.isLoaded;
    },
    addSavedTickers: (state, { payload }) => {
      state.filteredList = [...state.list, ...payload.dataTable];
      state.list = [...state.list, ...payload.dataTable];
    },
    deleteSavedTickers: (state, { payload }) => {
      state.filteredList = state.list.filter(
        (ticker) => payload.deleteIds.indexOf(ticker.symbol) === -1,
      );
      state.list = state.list.filter(
        (ticker) => payload.deleteIds.indexOf(ticker.symbol) === -1,
      );
    },
    setFilteredSavedTickers: (state, { payload }) => {
      state.filteredList = payload.filteredList;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSavedTickers,
  setSavedTickersIsLoaded,
  addSavedTickers,
  deleteSavedTickers,
  setFilteredSavedTickers,
} = savedTickers.actions;

export default savedTickers.reducer;
