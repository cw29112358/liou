import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { fromJS } from 'immutable';
import * as FirebaseApi from 'apis/firebase';
import { loadInventoryAction } from 'containers/InventoryPage/actions';
import {
  submitFormAction, submitFormSuccessAction, submitFormFailAction,
  sendEmailSuccessAction, sendEmailFailAction,
  chargeSuccessAction, chargeFailAction,
  makeBookingSuccessAction, makeBookingFailAction,
} from './actions';
import { SUBMIT_FORM, SEND_EMAIL, CHARGE, MAKING_BOOKING } from './constants';

export function* sendEmail(action) {
  try {
    yield call(FirebaseApi.sendBookingEmailCloudFunction, action.formObject);
    yield put(sendEmailSuccessAction(action.formObject));
  } catch (err) {
    yield put(sendEmailFailAction(err));
  }
}

export function* makingBooking(action) {
  try {
    const results = yield call(FirebaseApi.makeBookingAPI, action.formObject);
    yield put(makeBookingSuccessAction(results));

    const params = { forceReload: true };
    yield put(loadInventoryAction(params));
  } catch (err) {
    yield put(makeBookingFailAction(err));
  }
}

export function* charge(action) {
  try {
    yield call(FirebaseApi.makePaymentCloudFunction, action.formObject);
    yield put(chargeSuccessAction(action.formObject));
    yield put(submitFormAction(action.formObject));
  } catch (err) {
    yield put(chargeFailAction(err));
  }
}

export function* submitForm(action) {
  try {
    const results = yield call(FirebaseApi.submitBookingFormCloudFunction, action.formObject);
    yield put(submitFormSuccessAction(results));
  } catch (err) {
    yield put(submitFormFailAction(err));
  }
}

export function* watchSubmit() {
  // console.log('saga watch submit');
  const watcher = yield takeLatest(SUBMIT_FORM, submitForm);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchSend() {
  const watcher = yield takeLatest(SEND_EMAIL, sendEmail);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchCharge() {
  const watcher = yield takeLatest(CHARGE, charge);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchMakingBooking() {
  const watcher = yield takeLatest(MAKING_BOOKING, makingBooking);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  // watchSubmit,
  watchSend,
  // watchCharge,
  watchMakingBooking,
];

window.FirebaseApi = FirebaseApi;
