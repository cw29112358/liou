/*
 *
 * PackageProductPage actions
 *
 */

import {
  INVENTORY_CAR_LOAD_ACTION,
  INVENTORY_CAR_LOAD_SUCCESS_ACTION,
  INVENTORY_CAR_LOAD_FAIL_ACTION,

  INVENTORY_CAR_SINGLE_ACTION,
  INVENTORY_CAR_SINGLE_SUCCESS_ACTION,

} from './constants';

export function loadCarDetailAction(carInfo, key) {
  return {
    type: INVENTORY_CAR_LOAD_ACTION,
    carInfo,
    key,
  };
}
export function loadCarDetailSuccessAction(singleCar) {
  return {
    type: INVENTORY_CAR_LOAD_SUCCESS_ACTION,
    singleCar,
  };
}
export function loadCarDetailFailAction(error) {
  return {
    type: INVENTORY_CAR_LOAD_FAIL_ACTION,
    error,
  };
}

export function loadSingleCarAction(carId, key) {
  return {
    type: INVENTORY_CAR_SINGLE_ACTION,
    carId,
    key,
  };
}
export function loadSingleCarSuccessAction(singleCar, key) {
  return {
    type: INVENTORY_CAR_SINGLE_SUCCESS_ACTION,
    singleCar,
    key,
  };
}
