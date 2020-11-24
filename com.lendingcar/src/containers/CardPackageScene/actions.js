/*
 *
 * CardPackageScene actions
 *
 */

import {
  LOAD_CARDS,
  LOAD_CARDS_SUCCESS,
  LOAD_CARDS_FAIL,

  LOAD_COUPONS,
  LOAD_COUPONS_SUCCESS,
  LOAD_COUPONS_FAIL,
} from './constants';

export function loadCardsAction(params = {}) {
  return {
    type: LOAD_CARDS,
    params,
  };
}
export function loadCardsSuccessAction(cards) {
  return {
    type: LOAD_CARDS_SUCCESS,
    cards,
  };
}
export function loadCardsFailAction(error) {
  return {
    type: LOAD_CARDS_FAIL,
    error,
  };
}

export function loadCouponsAction(params = {}) {
  return {
    type: LOAD_COUPONS,
    params,
  };
}
export function loadCouponsSuccessAction(coupons) {
  return {
    type: LOAD_COUPONS_SUCCESS,
    coupons,
  };
}
export function loadCouponsFailAction(error) {
  return {
    type: LOAD_COUPONS_FAIL,
    error,
  };
}
