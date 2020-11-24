/*
 *
 * AppointmentSuccessScene sagas
 *
 */
import {
  takeLatest,
  // cancel,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  LOAD_APPOINTMENT,
} from './constants';
import {
  loadAppointmentSuccessAction,
  loadAppointmentFailAction,
} from './actions';

export function* loadAppointment(action) {
  try {
    const { appointmentId } = action;
    const result = yield call(StrapiApi.getMembershipAppointment, appointmentId);
    yield put(loadAppointmentSuccessAction(result));
    console.log('Good job! Success inject sagas in AppointmentSuccessScene');
  } catch (error) {
    console.log('Opps! There seem to be some problems When we use sagas, please check it');
    yield put(loadAppointmentFailAction(error));
  }
}

export function* watchLoadAppointment() {
  yield takeLatest(LOAD_APPOINTMENT, loadAppointment);
}

export default [
  {
    key: 'watchLoadAppointment',
    saga: watchLoadAppointment,
    mode: DAEMON,
  },
];
