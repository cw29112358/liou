/*
 *
 * CardChargeScene actions
 *
 */

import {
  CHARGE_CARD,
  CHARGE_CARD_SUCCESS,
  CHARGE_CARD_FAIL,
} from './constants';

export function chargeCardAction(formObj, onSuccess) {
  return {
    type: CHARGE_CARD,
    formObj,
    onSuccess,
  };
}
export function chargeCardSuccessAction(result) {
  return {
    type: CHARGE_CARD_SUCCESS,
    result,
  };
}
export function chargeCardFailAction(error) {
  return {
    type: CHARGE_CARD_FAIL,
    error,
  };
}
