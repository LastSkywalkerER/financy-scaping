import { MainApi } from '@core/api/mainApi';
import {
  loginRequest,
  loginResponse,
  registerResponse,
} from '@core/store/authSlice';
import { getMainTableResponse } from '@core/store/dataTableSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

export function* register({ payload }: AnyAction): SagaIterator {
  try {
    yield call(MainApi.registerRequest, payload);

    yield put(loginRequest(payload));
  } catch (error) {}
}

export function* login({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(MainApi.loginRequest, payload);

    yield put(loginResponse(response));
  } catch (error) {}
}

export function* status(): SagaIterator {
  try {
    const response = yield call(MainApi.statusRequest);

    yield put(loginResponse(response));
  } catch (error) {}
}
