import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  LOAD_PROJECT_DETAIL,
} from './constants';
import {
  loadProjectDetailSuccessAction, loadProjectDetailFailAction,
} from './actions';

export function* loadProjectDetail(action) {
  try {
    const { projectId } = action.params;
    const result = yield call(StrapiApi.getActivityApi, projectId);
    yield put(loadProjectDetailSuccessAction(result));
  } catch (err) {
    yield put(loadProjectDetailFailAction(err));
  }
}

export function* watchLoadProjectDetail() {
  yield takeLatest(LOAD_PROJECT_DETAIL, loadProjectDetail);
}

export default [
  {
    key: 'watchLoadProjectDetail',
    saga: watchLoadProjectDetail,
    mode: DAEMON,
  },
];
