/*
 *
 * TripScene sagas
 *
 */
import {
  takeLatest,
  call,
  select,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  LOAD_TRIP,
} from './constants';
import {
  loadTripSuccessAction, loadTripFailAction,
} from './actions';
import {
  selectAllTrips,
} from './selectors';

export function* loadTrip(action) {
  try {
    const { forceReload } = action.params;
    const trips = yield select(selectAllTrips);
    let result;

    if (trips.size === 0 || forceReload) {
      result = yield call(StrapiApi.loadMyTripsAPI);
    } else {
      result = trips;
    }
    yield put(loadTripSuccessAction(result));
  } catch (err) {
    yield put(loadTripFailAction(err));
  }
}

export function* watchLoadTrip() {
  yield takeLatest(LOAD_TRIP, loadTrip);
}

export default [
  {
    key: 'watchLoadTrip',
    saga: watchLoadTrip,
    mode: DAEMON,
  },
];
