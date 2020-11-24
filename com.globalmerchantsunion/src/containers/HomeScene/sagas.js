import {
  takeLatest,
  call,
  select,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import auth from 'utils/auth';
import { DAEMON, LIST_LIMIT } from 'utils/constants';
import { executeFunction, getImmutableData } from 'utils/helpers';

import { updatePublicProfilesAction } from 'containers/AppRouter/actions';

import {
  LOAD_AREA_CONFIG,
  LOAD_INDUSTRIES,
  LOAD_LOCATION_CITY,
  LOAD_ACTIVITIES,
} from './constants';
import {
  loadAreaConfigSuccessAction, loadAreaConfigFailAction,
  loadIndustriesSuccessAction, loadIndustriesFailAction,
  loadLocationCitySuccessAction, loadLocationCityFailAction,
  loadActivitiesSuccessAction, loadActivitiesFailAction,
} from './actions';
import {
  selectAreaConfig,
  selectIndustries,
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
export function* loadIndustries(action) {
  try {
    const { forceReload } = action.params;
    let result = yield select(selectIndustries);

    if (result.size === 0 || forceReload) {
      result = yield call(StrapiApi.getIndustries);
    }
    yield put(loadIndustriesSuccessAction(result));
  } catch (err) {
    yield put(loadIndustriesFailAction(err));
  }
}
export function* loadActivities(action) {
  try {
    const {
      forceReload = false, area, industry, start = 0, limit = LIST_LIMIT, sort = 'updatedAt:DESC',
    } = action.params;
    const activities = start === 0 ? getImmutableData([]) : yield select(selectActivities);
    let latestResult;

    if (activities.size === 0 || forceReload) {
      auth.set(area, 'localArea');
      auth.set(industry, 'localIndustry');
      const params = {
        area: area === 'all' ? '' : area,
        industry: industry === 'all' ? '' : industry,
        _start: start,
        _limit: limit,
        _sort: sort,
      };
      latestResult = getImmutableData(yield call(StrapiApi.getActivitiesApi, params));
    }
    const newData = activities.concat(latestResult);
    yield put(loadActivitiesSuccessAction(newData, latestResult.size));
    yield put(updatePublicProfilesAction({ list: newData }));
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
export function* watchLoadIndustries() {
  yield takeLatest(LOAD_INDUSTRIES, loadIndustries);
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
    key: 'loadIndustries',
    saga: watchLoadIndustries,
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
