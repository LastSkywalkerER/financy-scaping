import Action from '@core/models/Action';
import { put, call } from 'redux-saga/effects';

export default function* removeDeskWorker(action: Action) {
  yield put();
  yield call(() => {});
}
