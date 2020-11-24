/*
 *
 * CardCouponsScene actions
 *
 */

import {
  UPDATE_COUPONS,
  UPDATE_COUPONS_SUCCESS,
  UPDATE_COUPONS_FAIL,
} from './constants';

export function updateCouponsAction(params) {
  return {
    type: UPDATE_COUPONS,
    params,
  };
}

export function updateCouponsSuccessAction() {
  return {
    type: UPDATE_COUPONS_SUCCESS,
  };
}

export function updateCouponsFailAction() {
  return {
    type: UPDATE_COUPONS_FAIL,
  };
}
