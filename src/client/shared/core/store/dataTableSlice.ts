import { createSlice } from '@reduxjs/toolkit';
import { themeNames } from '@styles/themes';
import Token from 'src/types/Token';

const name: string = 'dataTable';

export const dataTable = createSlice({
  name,
  initialState: { list: [] as Token[], isLoaded: false },
  reducers: {
    setDataTable: (state, action) => {
      state.list = action.payload.dataTable;
    },
    setDataTableIsLoaded: (state, action) => {
      state.isLoaded = action.payload.isLoaded;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataTable, setDataTableIsLoaded } = dataTable.actions;

export default dataTable.reducer;
