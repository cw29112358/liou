/*
 *
 * VersionScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';
import { DAEMON } from 'utils/constants';

import {
  loadAppVersionSuccessAction, loadAppVersionFailAction,
} from './actions';
import { LOAD_APP_VERSION } from './constants';
import {
  selectVersions,
} from './selectors';

export function* loadAppVersion(action) {
  try {
    const { forceReload } = action.params;
    const versions = yield select(selectVersions);
    let result = versions;

    if (versions.size === 0 || forceReload) {
      result = yield call(StrapiApi.loadAppVersion);
    }

    yield put(loadAppVersionSuccessAction(result));
  } catch (error) {
    yield put(loadAppVersionFailAction(error));
  }
}

export function* watchGetAppVersion() {
  yield takeLatest(LOAD_APP_VERSION, loadAppVersion);
}

export default [
  {
    key: 'versionScene',
    saga: watchGetAppVersion,
    mode: DAEMON,
  },
];
