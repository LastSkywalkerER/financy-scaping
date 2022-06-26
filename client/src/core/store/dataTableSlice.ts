import { createSlice } from '@reduxjs/toolkit'

import { themeNames } from '@/styles/themes'
import Token from '@/types/Token'

const name = 'dataTable'

export const dataTable = createSlice({
  name,
  initialState: {
    list: [] as Token[],
    filteredList: [] as Token[],
    isLoaded: false,
  },
  reducers: {
    getMainTableRequest: (state) => {
      state.isLoaded = false
    },
    getMainTableResponse: (state, { payload }) => {
      state.list = payload.dataTable
      state.filteredList = payload.dataTable

      state.isLoaded = true
    },
    setFilteredDataTable: (state, { payload }) => {
      state.filteredList = payload.filteredList
    },
  },
})

// Action creators are generated for each case reducer function
export const { getMainTableRequest, getMainTableResponse, setFilteredDataTable } = dataTable.actions

export default dataTable.reducer
