/*
 *
 * ProfileScene sagas
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
  LOAD_MEMBERSHIPS_POINT,
} from './constants';
import {
  loadLoadMembershipsPointSuccessAction, loadLoadMembershipsPointFailAction,
} from './actions';

export function* loadLoadMembershipsPoint() {
  try {
    const result = yield call(StrapiApi.getMembershipsPoint);
    yield put(loadLoadMembershipsPointSuccessAction(result));
  } catch (error) {
    yield put(loadLoadMembershipsPointFailAction(error));
  }
}

export function* watchLoadMembershipsPoint() {
  yield takeLatest(LOAD_MEMBERSHIPS_POINT, loadLoadMembershipsPoint);
}
export default [
  {
    key: 'watchLoadMembershipsPoint',
    saga: watchLoadMembershipsPoint,
    mode: DAEMON,
  },
];
