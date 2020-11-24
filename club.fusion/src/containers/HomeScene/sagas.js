import {
  takeLatest,
  call,
  select,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import auth from 'utils/auth';
import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';

import {
  LOAD_AREA_CONFIG,
  LOAD_LOCATION_CITY,
  LOAD_ACTIVITIES,
} from './constants';
import {
  loadAreaConfigSuccessAction, loadAreaConfigFailAction,
  loadLocationCitySuccessAction, loadLocationCityFailAction,
  loadActivitiesSuccessAction, loadActivitiesFailAction,
} from './actions';
import {
  selectAreaConfig,
  selectActivities,
} from './selectors';

export function* loadAreaConfig(action) {
  try {
    const { forceReload } = action.params;
    const areaConfig = yield select(selectAreaConfig);
    let result = areaConfig;

    if (areaConfig.size === 0 || forceReload) {
      result = yield call(StrapiApi.getAllAreaConfigs);
    }
    yield put(loadAreaConfigSuccessAction(result));
  } catch (err) {
    yield put(loadAreaConfigFailAction(err));
  }
}
export function* loadActivities(action) {
  try {
    const { forceReload = false, area, industry } = action.params;
    const activities = yield select(selectActivities);
    let result = activities;

    if (activities.size === 0 || forceReload) {
      auth.set(area, 'localArea');
      auth.set(industry, 'localIndustry');
      const params = {
        area: area === 'all' ? '' : area,
        industry: industry === 'all' ? '' : industry,
      };
      result = yield call(StrapiApi.getActivitiesApi, params);
    }

    yield put(loadActivitiesSuccessAction(result));
    yield put(updatePublicProfilesAction({ list: result }));
  } catch (err) {
    yield put(loadActivitiesFailAction(err));
  }
}
export function* loadLocationCity(action) {
  try {
    const { onSuccess } = action;
    const result = yield call(StrapiApi.getCity);
    yield put(loadLocationCitySuccessAction(result));
    executeFunction(onSuccess, result);
  } catch (err) {
    yield put(loadLocationCityFailAction(err));
  }
}

export function* watchLoadAreaConfig() {
  yield takeLatest(LOAD_AREA_CONFIG, loadAreaConfig);
}
export function* watchLoadLocationCity() {
  yield takeLatest(LOAD_LOCATION_CITY, loadLocationCity);
}
export function* watchLoadActivities() {
  yield takeLatest(LOAD_ACTIVITIES, loadActivities);
}


export default [
  {
    key: 'loadAreaConfig',
    saga: watchLoadAreaConfig,
    mode: DAEMON,
  },
  {
    key: 'loadLocationCity',
    saga: watchLoadLocationCity,
    mode: DAEMON,
  },
  {
    key: 'loadActivities',
    saga: watchLoadActivities,
    mode: DAEMON,
  },
];
