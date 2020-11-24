/*
 *
 * MyConnectionScene sagas
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

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';

import {
  LOAD_CONNECTIONS,
  LOAD_RECOMMENDS,
} from './constants';
import {
  loadConnectionsSuccessAction, loadConnectionsFailAction,
  loadRecommendsSuccessAction, loadRecommendsFailAction,
} from './actions';
import {
  selectConnections,
} from './selectors';

export function* loadConnections(action) {
  try {
    const { forceReload = false } = action.params;
    const myConnections = yield select(selectConnections);
    let result = myConnections;
    if (myConnections.size === 0 || forceReload) {
      result = yield call(StrapiApi.getMyConnectionsApi);
    }
    yield put(loadConnectionsSuccessAction(result));
    yield put(updatePublicProfilesAction({ list: result }));
  } catch (err) {
    yield put(loadConnectionsFailAction(err));
  }
}
export function* loadRecommends() {
  try {
    const result = yield call(StrapiApi.getRecommendConnections);
    yield put(loadRecommendsSuccessAction(result));
    yield put(updatePublicProfilesAction({ list: result }));
  } catch (err) {
    yield put(loadRecommendsFailAction(err));
  }
}

export function* watchLoadConnections() {
  yield takeLatest(LOAD_CONNECTIONS, loadConnections);
}
export function* watchloadRecommends() {
  yield takeLatest(LOAD_RECOMMENDS, loadRecommends);
}

export default [
  {
    key: 'watchLoadConnections',
    saga: watchLoadConnections,
    mode: DAEMON,
  },
  {
    key: 'watchloadRecommends',
    saga: watchloadRecommends,
    mode: DAEMON,
  },
];
