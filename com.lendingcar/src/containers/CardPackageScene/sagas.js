/*
 *
 * CardPackageScene sagas
 *
 */
import {
  takeLatest,
  call,
  select,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  LOAD_CARDS,

  LOAD_COUPONS,
} from './constants';
import {
  selectMyCards,
  selectMyCoupons,
} from './selectors';
import {
  loadCardsSuccessAction, loadCardsFailAction,
  loadCouponsSuccessAction, loadCouponsFailAction,
} from './actions';

export function* loadMyCards(action) {
  try {
    const { forceReload } = action.params;
    const myCards = yield select(selectMyCards);
    let result = myCards;

    if (myCards.size === 0 || forceReload) {
      result = yield call(StrapiApi.getMyCardsApi);
    }
    yield put(loadCardsSuccessAction(result));
  } catch (err) {
    yield put(loadCardsFailAction(err));
  }
}

export function* loadMyCoupons(action) {
  try {
    const { forceReload } = action.params;
    const myCoupons = yield select(selectMyCoupons);
    let result = myCoupons;

    if (myCoupons.size === 0 || forceReload) {
      result = yield call(StrapiApi.getMyCouponsApi);
    }
    yield put(loadCouponsSuccessAction(result));
  } catch (err) {
    yield put(loadCouponsFailAction(err));
  }
}

export function* watchLoadMyCards() {
  yield takeLatest(LOAD_CARDS, loadMyCards);
}

export function* watchLoadMyCoupons() {
  yield takeLatest(LOAD_COUPONS, loadMyCoupons);
}

export default [
  {
    key: 'watchLoadMyCards',
    saga: watchLoadMyCards,
    mode: DAEMON,
  },
  {
    key: 'watchLoadMyCoupons',
    saga: watchLoadMyCoupons,
    mode: DAEMON,
  },
];
