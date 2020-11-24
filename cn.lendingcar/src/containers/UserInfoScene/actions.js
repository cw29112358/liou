/*
 *
 * UserInfoScene actions
 *
 */

import {
  CHANGE_SEARCH,
  CHANGE_FILTER,
  GET_CUSTOMER_INFO,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAIL,
} from './constants';

export function changeSearchAction(searchKey, filterSort) {
  return {
    type: CHANGE_SEARCH,
    searchKey,
    filterSort,
  };
}
export function changeFilterAction(filterKey, filterSort) {
  return {
    type: CHANGE_FILTER,
    filterKey,
    filterSort,
  };
}
export function getCustomerAction() {
  return {
    type: GET_CUSTOMER_INFO,
  };
}
export function getCustomerActionSuccess(result) {
  return {
    type: GET_CUSTOMER_INFO_SUCCESS,
    customerInfo: result,
  };
}
export function getCustomerActionFail(error) {
  return {
    type: GET_CUSTOMER_INFO_FAIL,
    error,
  };
}
