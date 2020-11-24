/*
 *
 * CarPage actions
 *
 */

import {
  LOAD_CAR,
  LOAD_CAR_SUCCESS,
  LOAD_CAR_FAIL,
  CHANGE_PLAN,
  CHANGE_TYPE,
} from './constants';

export function loadCarAction(params = {}) {
  return {
    type: LOAD_CAR,
    params,
  };
}

export function loadCarSuccessAction(carObject) {
  return {
    type: LOAD_CAR_SUCCESS,
    carObject,
  };
}

export function loadCarFailAction(error) {
  return {
    type: LOAD_CAR_FAIL,
    error,
  };
}

export function changePlanAction(curPlanType) {
  return {
    type: CHANGE_PLAN,
    curPlanType,
  };
}

export function changePlanCategoryAction(curPlanCategory) {
  return {
    type: CHANGE_TYPE,
    curPlanCategory,
  };
}
