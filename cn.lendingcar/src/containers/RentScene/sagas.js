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

import {
  selectArea,
} from 'containers/HomeScene/selectors';

import {
  LOAD_RENTAL_INVENTORY,
} from './constants';
import {
  loadRentInventorySuccessAction,
  loadRentInventoryFailAction,
} from './actions';
import {
  selectRentInventory,
} from './selectors';

export function* loadRentInventory(action) {
  try {
    const {
      forceReload,
      area,
      pickupTime,
      returnTime,
    } = action.params;
    // 选择 rentScene 的 rentInventory 短租库存
    const inventories = yield select(selectRentInventory);
    let result = inventories;

    // 如果短租库存为0或者 强制重新获取，则重新获取短租库存
    if (inventories.size === 0 || forceReload) {
      let areaResult = { area, pickupTime, returnTime };
      if (!areaResult) areaResult = yield select(selectArea);
      const api = StrapiApi.loadRentalInventoryByArea; // api/car/rentalInventory?area=${area}&pickupTime=${pickupTime}&returnTime=${returnTime}
      result = yield call(api, areaResult); // 根据取车区域、取车和还车时间获取短租库存车列表
    }

    yield put(loadRentInventorySuccessAction(result)); // 保存新获取的短租车列表至 rentScene 的 rentInventory 中
  } catch (err) {
    yield put(loadRentInventoryFailAction(err));
  }
}

export function* watchInventory() {
  yield takeLatest(LOAD_RENTAL_INVENTORY, loadRentInventory);
}

export default [
  {
    key: 'rentCarScene',
    saga: watchInventory,
    mode: DAEMON,
  },
];
