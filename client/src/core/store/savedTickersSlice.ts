import { createSlice } from '@reduxjs/toolkit'

import { isTickerListContainTicker } from '@/core/utilities/operationsWithTickers'
import Token from '@/types/Token'

const name = 'savedTickers'

export const savedTickers = createSlice({
  name,
  initialState: {
    list: [] as Token[],
    filteredList: [] as Token[],
    isLoaded: false,
  },
  reducers: {
    getSavedTickersRequest: (state) => {
      state.isLoaded = false
    },
    getSavedTickersResponse: (state, { payload }) => {
      state.filteredList = payload.dataTable
      state.list = payload.dataTable

      state.isLoaded = true
    },
    addSavedTickersRequest: (state, { payload }) => {
      const newList = payload.filter(
        (ticker: Token) => !isTickerListContainTicker(state.list, ticker),
      )

      state.filteredList = [...state.list, ...newList]
      state.list = [...state.list, ...newList]
    },
    removeSavedTickersRequest: (state, { payload }) => {
      const newList = state.list.filter((ticker) => !isTickerListContainTicker(payload, ticker))

      state.filteredList = newList
      state.list = newList
    },
    updateSavedTickersRequest: (state, { payload }) => {
      const { ticker, expectedPrice } = payload

      const newTickers = state.list.map((savedTicker) => {
        if (savedTicker.symbol === ticker.symbol) {
          return { ...savedTicker, expectedPrice }
        }
        return savedTicker
      })

      state.filteredList = newTickers
      state.list = newTickers
    },
    setFilteredSavedTickersRequest: (state, { payload }) => {
      state.filteredList = payload.filteredList
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getSavedTickersRequest,
  getSavedTickersResponse,
  addSavedTickersRequest,
  removeSavedTickersRequest,
  updateSavedTickersRequest,
  setFilteredSavedTickersRequest,
} = savedTickers.actions

export default savedTickers.reducer
