import {
  takeLatest,
  call,
  select,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import {
  LOAD_AREA_CONFIG,
  LOAD_LOCATION_CITY,
} from './constants';
import {
  loadAreaConfigSuccessAction, loadAreaConfigFailAction,
  loadLocationCitySuccessAction, loadLocationCityFailAction,
} from './actions';
import {
  selectAreaConfig,
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

export default [
  {
    key: 'homeSaga',
    saga: watchLoadAreaConfig,
    mode: DAEMON,
  },
  {
    key: 'loadLocationCity',
    saga: watchLoadLocationCity,
    mode: DAEMON,
  },
];
