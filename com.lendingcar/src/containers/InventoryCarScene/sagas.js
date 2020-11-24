import {
  takeLatest,
  put,
  select,
  call,
} from 'redux-saga/effects';
import Immutable, { fromJS } from 'immutable';

import { DAEMON } from 'utils/constants';

import * as StrapiApi from 'apis/strapi';


import {
  INVENTORY_CAR_LOAD_ACTION,
  INVENTORY_CAR_SINGLE_ACTION,

} from './constants';
import {
  loadCarDetailSuccessAction,
  loadCarDetailFailAction,

  loadSingleCarSuccessAction,

} from './actions';
import {
  selectCarInfoGroup,
} from './selectors';

export function* loadPackageProduct(action) {
  try {
    const carInfoGroup = yield select(selectCarInfoGroup);
    let result;
    if (carInfoGroup.size > 0) {
      result = Immutable.Map();
    } else {
      const singleCar = yield call(StrapiApi.getSingleCar, action.carInfo);
      result = fromJS(singleCar);
    }
    yield put(loadCarDetailSuccessAction(result));
  } catch (error) {
    yield put(loadCarDetailFailAction(error));
  }
}

export function* watchLoadPackageProduct() {
  yield takeLatest(INVENTORY_CAR_LOAD_ACTION, loadPackageProduct);
}
export function* loadSingleCar(action) {
  try {
    const singleCar = yield call(StrapiApi.getSingleCar, action.carId);
    const result = fromJS(singleCar);
    yield put(loadSingleCarSuccessAction(result, 0));
    yield put(loadCarDetailSuccessAction(result, 0));
  } catch (error) {
    yield put(loadCarDetailFailAction(error));
  }
}


export function* watchLoadSingleCar() {
  yield takeLatest(INVENTORY_CAR_SINGLE_ACTION, loadSingleCar);
}

export default [
  {
    key: 'watchLoadPackageProduct',
    saga: watchLoadPackageProduct,
    mode: DAEMON,
  },
  {
    key: 'watchLoadSingleCar',
    saga: watchLoadSingleCar,
    mode: DAEMON,
  },
];
