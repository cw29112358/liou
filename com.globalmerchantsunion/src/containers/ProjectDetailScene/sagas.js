import {
  takeLatest,
  select,
  call,
  put,
} from 'redux-saga/effects';

import {
  loadActivitiesAction,
} from 'containers/HomeScene/actions';
import {
  selectArea,
  selectIndustry,
} from 'containers/HomeScene/selectors';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  SETUP_VIEW_COUNT,
} from './constants';

export function* stepUpViewCount(action) {
  try {
    const { id } = action;
    const area = yield select(selectArea);
    const industry = yield select(selectIndustry);
    yield call(StrapiApi.stepUpViewCount, id);
    yield put(loadActivitiesAction({
      forceReload: true,
      area,
      industry,
    }));
  } catch (err) {
    console.log(err);
  }
}

export function* watchStepUpViewCount() {
  yield takeLatest(SETUP_VIEW_COUNT, stepUpViewCount);
}

export default [
  {
    key: 'watchStepUpViewCount',
    saga: watchStepUpViewCount,
    mode: DAEMON,
  },
];
