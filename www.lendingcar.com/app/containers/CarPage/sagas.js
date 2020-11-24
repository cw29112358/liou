import { take, call, put, takeLatest, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as FirebaseApi from 'apis/firebase';
import { loadInventoryAction } from 'containers/InventoryPage/actions';
import { selectAllInventory } from 'containers/InventoryPage/selectors';
import { selectArea } from 'containers/App/selectors';
import { LOAD_CAR } from './constants';
import { loadCarSuccessAction, loadCarFailAction } from './actions';

export function* getSingleCarInfo(action) {
  try {
    const { forceReload, carId } = action.params;
    const area = yield select(selectArea);

    const inventories = yield select(selectAllInventory);// if inventory has loaded before, skip calling API
    let carObject = {};
    if (inventories.size === 0 || forceReload) {
      yield put(loadInventoryAction({ forceReload: true }));
      carObject = yield call(FirebaseApi.getSingleCarByArea, carId, area);
    } else {
      const inventoriesObject = inventories.toJS();
      carObject = inventoriesObject[carId];
    }
    yield put(loadCarSuccessAction(carObject));
  } catch (err) {
    yield put(loadCarFailAction(err));
  }
}

export function* watchSingleCar() {
  const watcher = yield takeLatest(LOAD_CAR, getSingleCarInfo);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  watchSingleCar,
];
