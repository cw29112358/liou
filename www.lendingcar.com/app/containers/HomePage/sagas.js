import {
  take,
  call,
  put,
  cancel,
  takeLatest,
  select,
} from 'redux-saga/effects';
import * as FirebaseApi from 'apis/firebase';
import { LOCATION_CHANGE } from 'react-router-redux';
import { INVENTORY_LOAD } from './constants';
import { loadHomeShowcaseCarsSuccessAction, loadHomeShowcaseCarsFailAction } from './actions';
import { selectAllInventory } from './selectors';

export function* loadInventory() {
  try {
    let inventoriesObject = yield select(selectAllInventory);// if inventory has loaded before, skip calling API
    if (inventoriesObject.size === 0) {
      inventoriesObject = yield call(FirebaseApi.loadPackageAPI, 'popular');
    }
    // TODO: Temporarily using json from static folder.
    // const inventoriesObject = POPULAR_DEAL_PACKAGE;
    yield put(loadHomeShowcaseCarsSuccessAction(inventoriesObject));
  } catch (err) {
    yield put(loadHomeShowcaseCarsFailAction(err));
  }
}

export function* watchInventory() {
  const watcher = yield takeLatest(INVENTORY_LOAD, loadInventory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  watchInventory,
];
