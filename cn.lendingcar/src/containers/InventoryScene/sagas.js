/*
 *
 * InventoryScene sagas
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
import { getImmutableData } from 'utils/helpers';

import {
  selectArea,
} from 'containers/HomeScene/selectors';

import {
  INVENTORY_LOAD,
} from './constants';
import {
  loadInventorySuccessAction, loadInventoryFailAction,
} from './actions';
import {
  selectAllInventory,
} from './selectors';

export function* loadInventory(action) {
  try {
    const { forceReload, update, area } = action.params;
    const inventories = yield select(selectAllInventory);
    let result = inventories;

    if (inventories.size === 0 || forceReload || update) {
      let areaResult = area;
      if (!areaResult) areaResult = yield select(selectArea);

      const api = update ? StrapiApi.refreshInventoryByArea : StrapiApi.loadInventoryByArea;
      result = yield call(api, areaResult);

      if (update) result = inventories.merge(getImmutableData(result));
    }

    yield put(loadInventorySuccessAction(result));
  } catch (err) {
    yield put(loadInventoryFailAction(err));
  }
}

export function* watchInventory() {
  yield takeLatest(INVENTORY_LOAD, loadInventory);
}

export default [
  {
    key: 'inventoryScene',
    saga: watchInventory,
    mode: DAEMON,
  },
];
