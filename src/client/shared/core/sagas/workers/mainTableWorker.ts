import { MainApi } from '@core/api/mainApi';
import { getMainTableResponse } from '@core/store/dataTableSlice';
import { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export function* getMainTable(): SagaIterator {
  try {
    const response = yield call(MainApi.getMainTable);

    yield put(getMainTableResponse({ dataTable: response.stocks }));
  } catch (error) {}
}
