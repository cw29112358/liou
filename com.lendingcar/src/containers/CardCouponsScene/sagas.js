/*
 *
 * CardCouponsScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  loadCouponsAction,
} from 'containers/CardPackageScene/actions';

import { UPDATE_COUPONS } from './constants';
import {
  updateCouponsSuccessAction, updateCouponsFailAction,
} from './actions';

export function* updateCoupons(action) {
  try {
    const { couponId } = action.params;
    const result = yield call(StrapiApi.updateCouponsApi, couponId);
    if (result.status !== 'unused') {
      yield put(updateCouponsSuccessAction());
      yield put(loadCouponsAction({ forceReload: true }));
    }
  } catch (err) {
    yield put(updateCouponsFailAction(err));
  }
}

export function* watchUpdateCoupons() {
  yield takeLatest(UPDATE_COUPONS, updateCoupons);
}

export default [
  {
    key: 'watchUpdateCoupons',
    saga: watchUpdateCoupons,
    mode: DAEMON,
  },
];
