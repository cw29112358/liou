/*
 *
 * MemberScene sagas
 *
 */
import {
  takeLatest,
  select,
  call,
  put,
} from 'redux-saga/effects';
import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import { selectMemberBenefitsData } from './selectors';
import {
  LOAD_BENEFITS,

  LOAD_USER_APPOINTMENT,
} from './constants';
import {
  loadBenefitsSuccessAction, loadBenefitsFailAction,

  loadUserAppointmentSuccessAction, loadUserAppointmentFailAction,
} from './actions';

export function* loadMemberBenefits() {
  try {
    let result;
    const benefitsData = yield select(selectMemberBenefitsData);

    if (benefitsData.size === 0) {
      result = yield call(StrapiApi.getBenefits);
    } else {
      result = benefitsData;
    }
    yield put(loadBenefitsSuccessAction(result));
  } catch (err) {
    yield put(loadBenefitsFailAction(err));
  }
}

export function* loadUserAppointment() {
  try {
    const result = yield call(StrapiApi.getUserAppointment);
    yield put(loadUserAppointmentSuccessAction(result));
  } catch (err) {
    yield put(loadUserAppointmentFailAction(err));
  }
}

export function* watchLoadMemberBenefits() {
  yield takeLatest(LOAD_BENEFITS, loadMemberBenefits);
}

export function* watchLoadUserAppointment() {
  yield takeLatest(LOAD_USER_APPOINTMENT, loadUserAppointment);
}

export default [
  {
    key: 'watchLoadMemberBenefits',
    saga: watchLoadMemberBenefits,
    mode: DAEMON,
  },
  {
    key: 'watchLoadUserAppointment',
    saga: watchLoadUserAppointment,
    mode: DAEMON,
  },
];
