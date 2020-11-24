import {
  take,
  call,
  put,
  cancel,
  takeLatest,
  select,
}
from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { map, assign, camelCase } from 'lodash';

import * as FirebaseApi from 'apis/firebase';
import { selectArea } from 'containers/App/selectors';
import {
  INVENTORY_LOAD,
  LOAD_PACKAGE,
} from './constants';
import {
  loadInventorySuccessAction, loadInventoryFailAction,
  loadPackageSuccessAction, loadPackageFailAction,
 } from './actions';
import {
  selectAllInventory,
} from './selectors';

export function* loadInventory(action) {
  try {
    const { forceReload } = action.params;
    const area = yield select(selectArea);

    const inventories = yield select(selectAllInventory);// if inventory has loaded before, skip calling API
    let inventoriesObject = {};
    if (inventories.size === 0 || forceReload || area) {
      inventoriesObject = yield call(FirebaseApi.loadInventoryByArea, area);
      map(inventoriesObject, (car) => assign(car, { make: camelCase(car.make) }));
    } else {
      inventoriesObject = inventories.toJS();
    }
    yield put(loadInventorySuccessAction(inventoriesObject));
  } catch (err) {
    yield put(loadInventoryFailAction(err));
  }
}
export function* loadPackage(action) {
  try {
    let packagesObject = yield select(selectAllInventory);
    if (packagesObject.size === 0) {
      packagesObject = yield call(FirebaseApi.loadPackageAPI, action.packageId);
    }
    yield put(loadPackageSuccessAction(packagesObject));
  } catch (err) {
    yield put(loadPackageFailAction(err));
  }
}

export function* watchInventory() {
  const watcher = yield takeLatest(INVENTORY_LOAD, loadInventory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* watchPackage() {
  yield takeLatest(LOAD_PACKAGE, loadPackage);
}

// All sagas to be loaded
export default [
  watchInventory,
  watchPackage,
];
