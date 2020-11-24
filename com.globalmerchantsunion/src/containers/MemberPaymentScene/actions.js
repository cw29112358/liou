/*
 *
 * MemberPaymentScene actions
 *
 */

import {
  MEMBERSHIP_PRICE_LOAD,
  MEMBERSHIP_PRICE_LOAD_SUCCESS,
  MEMBERSHIP_PRICE_LOAD_FAIL,
} from './constants';

export function loadMembershipPriceAction(params = {}) {
  return {
    type: MEMBERSHIP_PRICE_LOAD,
    params,
  };
}
export function loadMembershipPriceSuccessAction(membershipPrice) {
  return {
    type: MEMBERSHIP_PRICE_LOAD_SUCCESS,
    membershipPrice,
  };
}
export function loadMembershipPriceFailAction() {
  return {
    type: MEMBERSHIP_PRICE_LOAD_FAIL,
  };
}
