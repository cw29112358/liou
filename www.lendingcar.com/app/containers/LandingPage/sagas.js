import {
  take,
  // call,
  put,
  cancel,
  takeLatest,
  // select,
} from 'redux-saga/effects';
// import * as FirebaseApi from 'apis/firebase';
import { LOCATION_CHANGE } from 'react-router-redux';
import { map, assign } from 'lodash';
import { CAR_INFO, LENDING_LOAD } from './constants';
import { loadLendingShowCarsAction, loadLendingDataFailAction } from './actions';
// import { selectAllInventory } from './selectors';

export function* loadLandingCar() {
  try {
    // TODO: Temporarily using json from static folder.
    const carInfo = CAR_INFO;
    map(carInfo, (info) => assign(info, { rentalPrice: info.leasePrice.split('/')[0] }, { rentalUnit: info.leasePrice.split('/')[1] || '' }));
    yield put(loadLendingShowCarsAction(carInfo));
  } catch (err) {
    yield put(loadLendingDataFailAction(err));
  }
}

export function* watchSearchBar() {
  const watcher = yield takeLatest(LENDING_LOAD, loadLandingCar);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  watchSearchBar,
];
