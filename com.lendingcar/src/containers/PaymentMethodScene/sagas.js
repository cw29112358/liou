/*
 *
 * MemberPaymentScene sagas
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

import { PURCHASE_MEMBERSHIP } from './constants';
import {
  purchaseMembershipSuccessAction, purchaseMembershipFailAction,
} from './actions';

export function* purchaseMembership(action) {
  try {
    const { formObj, onSuccess } = action;
    const result = yield call(StrapiApi.purchaseMembership, formObj);
    const paymentAmount = Number(result.paymentAmount);
    yield put(purchaseMembershipSuccessAction(result));
    executeFunction(onSuccess, paymentAmount);
  } catch (err) {
    yield put(purchaseMembershipFailAction(err));
  }
}

export function* watchPurchaseMembership() {
  yield takeLatest(PURCHASE_MEMBERSHIP, purchaseMembership);
}

export default [
  {
    key: 'watchPurchaseMembership',
    saga: watchPurchaseMembership,
    mode: DAEMON,
  },
];
