import { MainApi } from '@core/api/mainApi';
import { getMainTableResponse } from '@core/store/dataTableSlice';
import { getSavedTickersResponse } from '@core/store/savedTickersSlice';
import { RootState } from '@core/store/store';
import { AnyAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import Token from 'src/types/Token';

export function* getSavedTickers(): SagaIterator {
  const response = yield call(MainApi.getSavedTickers);

  yield put(getSavedTickersResponse({ dataTable: response.stocks }));
}

export function* addSavedTickers({ payload }: AnyAction): SagaIterator {
  try {
    const savedTickers = yield select((state: RootState) => state.savedTickers);

    const newSavedTickers = payload
      .filter(
        (newTicker) =>
          !savedTickers.some(
            (oldTicker) => newTicker.symbol === oldTicker.symbol,
          ),
      )
      .map((obj: Token) => ({ ...obj, expectedPrice: 0 }));

    yield call(MainApi.setSavedTickers, newSavedTickers);
  } catch (error) {}
}

export function* removeSavedTickers({ payload }: AnyAction): SagaIterator {
  try {
    yield call(MainApi.removeSavedTickers, payload);
  } catch (error) {}
}

export function* updateSavedTickers({ payload }: AnyAction): SagaIterator {
  try {
    const { ticker, expectedPrice } = payload;

    yield call(MainApi.updateSavedTicker, ticker, expectedPrice);
  } catch (error) {}
}
