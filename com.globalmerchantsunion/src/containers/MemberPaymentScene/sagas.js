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

import { selectMemberShipPrice } from './selectors';
import { MEMBERSHIP_PRICE_LOAD } from './constants';
import {
  loadMembershipPriceSuccessAction, loadMembershipPriceFailAction,
} from './actions';

export function* loadMembershipPrice(action) {
  try {
    let result;
    const membershipPrice = yield select(selectMemberShipPrice);
    const { forceReload } = action.params;
    if (membershipPrice.size === 0 || forceReload) {
      result = yield call(StrapiApi.getMembershipPrice);
      result = result || {};
    } else {
      result = membershipPrice;
    }
    yield put(loadMembershipPriceSuccessAction(result));
  } catch (err) {
    yield put(loadMembershipPriceFailAction(err));
  }
}

export function* watchLoadMembershipPrice() {
  yield takeLatest(MEMBERSHIP_PRICE_LOAD, loadMembershipPrice);
}

export default [
  {
    key: 'watchLoadMembershipPrice',
    saga: watchLoadMembershipPrice,
    mode: DAEMON,
  },
];
