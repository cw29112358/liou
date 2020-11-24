/*
 *
 * ApplyLoanScene actions
 *
 */

import {
  LOAD_LOAN_BOOKIBNGS,
  LOAD_LOAN_BOOKIBNGS_SUCCESS,
  LOAD_LOAN_BOOKIBNGS_FAIL,
} from './constants';

export function loadLoanBookingsActions() {
  return {
    type: LOAD_LOAN_BOOKIBNGS,
  };
}
export function loadLoanBookingsSuccessActions(loanBookings) {
  return {
    type: LOAD_LOAN_BOOKIBNGS_SUCCESS,
    loanBookings,
  };
}
export function loadLoanBookingsFailActions(error) {
  return {
    type: LOAD_LOAN_BOOKIBNGS_FAIL,
    error,
  };
}
