/*
 *
 * BookingDetailsScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { updateMembershipAction } from 'containers/AppRouter/actions';
import { loadInventoryAction } from 'containers/InventoryScene/actions';
import { loadTripAction } from 'containers/TripScene/actions';

import { MAKING_BOOKING } from './constants';
import { makeBookingSuccessAction, makeBookingFailAction } from './actions';

export function* makingBooking(action) {
  try {
    const { formObject, onSuccess } = action;
    const results = yield call(StrapiApi.makeBookingAPI, formObject);
    yield put(makeBookingSuccessAction(results));

    executeFunction(onSuccess);
    yield put(updateMembershipAction());
    yield put(loadInventoryAction({ forceReload: true }));
    yield put(loadTripAction({ forceReload: true }));
  } catch (err) {
    yield put(makeBookingFailAction(err));
  }
}
export function* watchMakingBooking() {
  yield takeLatest(MAKING_BOOKING, makingBooking);
}
export default [
  {
    key: 'watchMakingBooking',
    saga: watchMakingBooking,
    mode: DAEMON,
  },
];
