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
import Alipay from '@0x5e/react-native-alipay';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { updateMembershipAction } from 'containers/AppRouter/actions';

import { PURCHASE_MEMBERSHIP } from './constants';
import {
  purchaseMembershipSuccessAction, purchaseMembershipFailAction,
} from './actions';

export function* purchaseMembership(action) {
  try {
    const { formObj: { level, paymenMethod }, onSuccess } = action;
    const orderInfo = {
      level,
      paymenMethod,
      // paymentAmount: 0.01, // use in test
    };
    const orderResult = yield call(StrapiApi.purchaseMembership, orderInfo);
    const alipayResult = yield call(Alipay.pay, orderResult.url);
    const confirmOrderResult = yield call(StrapiApi.confirmAlipay, alipayResult);
    if (alipayResult.resultStatus !== '9000') {
      throw new Error('purchase fail');
    }
    const totalAmount = Number(confirmOrderResult.totalAmount);
    yield put(purchaseMembershipSuccessAction(confirmOrderResult));
    yield put(updateMembershipAction());
    executeFunction(onSuccess, totalAmount);
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
