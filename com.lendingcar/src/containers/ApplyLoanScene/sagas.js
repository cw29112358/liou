/*
 *
 * ApplyLoanScene sagas
 *
 */
import {
  takeLatest,
  // cancel,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import {
  loadLoanBookingsSuccessActions,
  loadLoanBookingsFailActions,
} from './actions';
import { LOAD_LOAN_BOOKIBNGS } from './constants';

export function* loadLoanSaga() {
  try {
    const loanBookings = yield call(StrapiApi.getApplyLoan);
    yield put(loadLoanBookingsSuccessActions(loanBookings));
  } catch (error) {
    yield put(loadLoanBookingsFailActions(error));
  }
}

export function* watchUpdateFavouriteCar() {
  yield takeLatest(LOAD_LOAN_BOOKIBNGS, loadLoanSaga);
}

export default [
  {
    key: 'watchUpdateFavouriteCar',
    saga: watchUpdateFavouriteCar,
  },
];
