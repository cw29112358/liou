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
import { executeFunction } from 'utils/helpers';

import { DAEMON } from 'utils/constants';

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';

import {
  LOAD_USER_ACTIVITIES,
} from './constants';
import {
  loadUserActivitiesSuccessAction, loadUserActivitiesFailAction,
} from './actions';

export function* loadUserActivities(action) {
  try {
    const { userId, onSuccess } = action;
    const result = yield call(StrapiApi.getActivitiesApi, {
      user: userId,
    });
    yield put(loadUserActivitiesSuccessAction(result));
    yield put(updatePublicProfilesAction({ list: result }));
    executeFunction(onSuccess, result);
  } catch (error) {
    yield put(loadUserActivitiesFailAction(error));
  }
}

export function* watchLoadUserActivities() {
  yield takeLatest(LOAD_USER_ACTIVITIES, loadUserActivities);
}
export default [
  {
    key: 'watchLoadUserActivities',
    saga: watchLoadUserActivities,
    mode: DAEMON,
  },
];
