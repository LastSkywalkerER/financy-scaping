import { takeLatest } from 'redux-saga/effects'

import { loginRequest, registerRequest, statusRequest } from '@/core/store/authSlice'
import { getMainTableRequest } from '@/core/store/dataTableSlice'
import {
  addSavedTickersRequest,
  getSavedTickersRequest,
  removeSavedTickersRequest,
  updateSavedTickersRequest,
} from '@/core/store/savedTickersSlice'

import { login, register, status } from './workers/authWorker'
import { getMainTable } from './workers/mainTableWorker'
import {
  addSavedTickers,
  getSavedTickers,
  removeSavedTickers,
  updateSavedTickers,
} from './workers/savedTickersWorker'

export default function* sagaWatcher() {
  yield takeLatest(registerRequest, register)
  yield takeLatest(loginRequest, login)
  yield takeLatest(statusRequest, status)
  yield takeLatest(getMainTableRequest, getMainTable)
  yield takeLatest(getSavedTickersRequest, getSavedTickers)
  yield takeLatest(addSavedTickersRequest, addSavedTickers)
  yield takeLatest(removeSavedTickersRequest, removeSavedTickers)
  yield takeLatest(updateSavedTickersRequest, updateSavedTickers)
}
