import { createSlice } from '@reduxjs/toolkit';
import { themeNames } from '@styles/themes';
import Token from 'src/types/Token';

const name: string = 'dataTable';

export const dataTable = createSlice({
  name,
  initialState: {
    list: [] as Token[],
    filteredList: [] as Token[],
    isLoaded: false,
  },
  reducers: {
    setDataTable: (state, { payload }) => {
      state.list = payload.dataTable;
      state.filteredList = payload.dataTable;
    },
    setDataTableIsLoaded: (state, { payload }) => {
      state.isLoaded = payload.isLoaded;
    },
    setFilteredDataTable: (state, { payload }) => {
      state.filteredList = payload.filteredList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataTable, setDataTableIsLoaded, setFilteredDataTable } =
  dataTable.actions;

export default dataTable.reducer;
