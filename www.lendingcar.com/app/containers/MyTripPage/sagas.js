import {
  call,
  put,
  select,
  takeLatest,
  cancel,
  take,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as FirebaseApi from 'apis/firebase';
import {
  MYTRIP_LOAD,
} from './constants';
import {
  loadMyTripSuccessAction,
  loadMyTripFailAction,
} from './actions';
import {
  selectTrips,
} from './selectors';

export function* loadTrips(action) {
  try {
    let tripsObject = yield select(selectTrips);
    tripsObject = yield call(FirebaseApi.loadMyTripsAPI, action.uid);
    tripsObject = Object.values(tripsObject).sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    yield put(loadMyTripSuccessAction(tripsObject));
  } catch (err) {
    yield put(loadMyTripFailAction(err));
  }
}

export function* watchTrips() {
  const watcher = yield takeLatest(MYTRIP_LOAD, loadTrips);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchTrips,
];
