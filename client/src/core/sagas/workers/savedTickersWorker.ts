import { AnyAction } from '@reduxjs/toolkit'
import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { MainApi } from '@/core/api/mainApi'
import { getSavedTickersResponse } from '@/core/store/savedTickersSlice'
import Token from '@/types/Token'

export function* getSavedTickers(): SagaIterator {
  const response = yield call(MainApi.getSavedTickers)

  yield put(getSavedTickersResponse({ dataTable: response.tickers }))
}

export function* addSavedTickers({ payload }: AnyAction): SagaIterator {
  try {
    const newSavedTickers = payload.map((obj: Token) => ({
      ...obj,
      expectedPrice: 0,
    }))

    yield call(MainApi.setSavedTickers, newSavedTickers)
  } catch (error) {
    console.error(error)
  }
}

export function* removeSavedTickers({ payload }: AnyAction): SagaIterator {
  try {
    yield call(MainApi.removeSavedTickers, payload)
  } catch (error) {
    console.error(error)
  }
}

export function* updateSavedTickers({ payload }: AnyAction): SagaIterator {
  try {
    const { ticker, expectedPrice } = payload

    yield call(MainApi.updateSavedTicker, ticker, expectedPrice)
  } catch (error) {
    console.error(error)
  }
}
