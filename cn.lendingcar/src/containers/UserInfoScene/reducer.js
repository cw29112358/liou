/*
 *
 * UserInfoScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHANGE_SEARCH,
  CHANGE_FILTER,
  GET_CUSTOMER_INFO,
  GET_CUSTOMER_INFO_SUCCESS,
  GET_CUSTOMER_INFO_FAIL,
} from './constants';

const initialState = fromJS({
});

function userInfoSceneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      return state.set('searchKey', action.searchKey)
        .set('filterSort', action.filterSort);
    case CHANGE_FILTER:
      return state.set('filterKey', action.filterKey)
        .set('filterSort', action.filterSort);
    case GET_CUSTOMER_INFO:
      return state.set('isLoading', false);
    case GET_CUSTOMER_INFO_SUCCESS:
      return state.set('isLoading', true)
        .set('customerInfo', fromJS(action.customerInfo));
    case GET_CUSTOMER_INFO_FAIL:
      return state.set('isLoading', true)
        .set('error', action.error);
    default:
      return state;
  }
}

export default userInfoSceneReducer;
