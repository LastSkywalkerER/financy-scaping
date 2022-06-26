import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { MainApi } from '@/core/api/mainApi'
import { getMainTableResponse } from '@/core/store/dataTableSlice'

export function* getMainTable(): SagaIterator {
  try {
    const response = yield call(MainApi.getMainTable)

    yield put(getMainTableResponse({ dataTable: response.stocks }))
  } catch (error) {
    console.error(error)
  }
}
