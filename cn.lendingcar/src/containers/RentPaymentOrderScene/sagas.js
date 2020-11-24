/*
 *
 * MemberPaymentScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import Alipay from '@0x5e/react-native-alipay';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';
import { selectOrderResult } from 'containers/BookingDetailsScene/selectors';

import { updateMembershipAction } from 'containers/AppRouter/actions';

import { RentPayment } from './constants';
import {
  RentPaymentSuccessAction, RentPaymentFailAction,
} from './actions';

export function* RentPaymentOrder(action) {
  try {
    const { formObj, onSuccess } = action;
    const { bookingFee } = formObj;
    const orderResult = yield select(selectOrderResult);
    const alipayResult = yield call(Alipay.pay, orderResult.url);
    const confirmOrderResult = yield call(StrapiApi.confirmAlipay, alipayResult);
    if (alipayResult.resultStatus !== '9000') {
      throw new Error('purchase fail');
    }
    const totalAmount = Number(confirmOrderResult.ok ? bookingFee : confirmOrderResult.totalAmount);
    yield put(RentPaymentSuccessAction(confirmOrderResult));
    yield put(updateMembershipAction()); // 更新设置该用户是否为会员
    executeFunction(onSuccess, totalAmount);
  } catch (err) {
    yield put(RentPaymentFailAction(err));
  }
}

export function* watchPurchaseMembership() {
  yield takeLatest(RentPayment, RentPaymentOrder);
}

export default [
  {
    key: 'watchPurchaseMembership',
    saga: watchPurchaseMembership,
    mode: DAEMON,
  },
];
