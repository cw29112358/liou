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

import { CHARGE_CARD } from './constants';
import {
  chargeCardSuccessAction, chargeCardFailAction,
} from './actions';

export function* chargeCard(action) {
  try {
    const { formObj, onSuccess } = action;
    const result = yield call(StrapiApi.chargeCardApi, formObj);
    const actualAmount = Number(result.actualAmount);
    yield put(chargeCardSuccessAction(result));
    executeFunction(onSuccess, actualAmount);
  } catch (err) {
    yield put(chargeCardFailAction(err));
  }
}

export function* watchChargeCard() {
  yield takeLatest(CHARGE_CARD, chargeCard);
}

export default [
  {
    key: 'watchChargeCard',
    saga: watchChargeCard,
    mode: DAEMON,
  },
];
