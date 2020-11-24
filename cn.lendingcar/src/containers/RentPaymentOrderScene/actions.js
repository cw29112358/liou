/*
 *
 * MemberPaymentScene actions
 *
 */

import {
  RentPayment,
  RentPaymentSUCCESS,
  RentPaymentFAIL,
} from './constants';

export function RentPaymentAction(formObj, onSuccess) {
  return {
    type: RentPayment,
    formObj,
    onSuccess,
  };
}
export function RentPaymentSuccessAction(result) {
  return {
    type: RentPaymentSUCCESS,
    result,
  };
}
export function RentPaymentFailAction(error) {
  return {
    type: RentPaymentFAIL,
    error,
  };
}
