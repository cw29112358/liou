/*
 *
 * MemberPaymentScene actions
 *
 */

import {
  PURCHASE_MEMBERSHIP,
  PURCHASE_MEMBERSHIP_SUCCESS,
  PURCHASE_MEMBERSHIP_FAIL,
} from './constants';

export function purchaseMembershipAction(formObj, onSuccess) {
  return {
    type: PURCHASE_MEMBERSHIP,
    formObj,
    onSuccess,
  };
}
export function purchaseMembershipSuccessAction(result) {
  return {
    type: PURCHASE_MEMBERSHIP_SUCCESS,
    result,
  };
}
export function purchaseMembershipFailAction(error) {
  return {
    type: PURCHASE_MEMBERSHIP_FAIL,
    error,
  };
}
