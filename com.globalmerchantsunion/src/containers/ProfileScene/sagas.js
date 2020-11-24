/*
 *
 * ProfileScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';
import { executeFunction, getImmutableData } from 'utils/helpers';

import { DAEMON } from 'utils/constants';

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';

import {
  LOAD_USER_ACTIVITIES,
} from './constants';
import {
  loadUserActivitiesSuccessAction, loadUserActivitiesFailAction,
} from './actions';
import {
  selectSortActivities,
} from './selectors';

export function* loadUserActivities(action) {
  try {
    const { params, onSuccess } = action;
    const currentActivites = params._start === 0 ? getImmutableData([]) : yield select(selectSortActivities); // eslint-disable-line
    const result = getImmutableData(yield call(StrapiApi.getActivitiesApi, params));
    const newData = currentActivites.concat(result);
    yield put(loadUserActivitiesSuccessAction(newData, result.size));
    yield put(updatePublicProfilesAction({ list: newData }));
    executeFunction(onSuccess, newData);
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
