import { AnyAction } from '@reduxjs/toolkit'
import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { MainApi } from '@/core/api/mainApi'
import { authFail, loginRequest, loginResponse } from '@/core/store/authSlice'
import { getMainTableResponse } from '@/core/store/dataTableSlice'

export function* register({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(MainApi.registerRequest, payload)

    yield put(loginRequest(payload))
  } catch (error) {
    yield put(authFail())
  }
}

export function* login({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(MainApi.loginRequest, payload)

    yield put(loginResponse(response))
  } catch (error) {
    yield put(authFail())
  }
}

export function* status(): SagaIterator {
  try {
    const response = yield call(MainApi.statusRequest)

    yield put(loginResponse(response))
  } catch (error) {
    yield put(authFail())
  }
}
