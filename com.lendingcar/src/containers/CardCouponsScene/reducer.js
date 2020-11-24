/*
 *
 * CardCouponsScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  UPDATE_COUPONS,
  UPDATE_COUPONS_SUCCESS,
  UPDATE_COUPONS_FAIL,
} from './constants';

const initialState = fromJS({});

function cardCouponsSceneReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COUPONS:
      return state.set('isLoading', true);
    case UPDATE_COUPONS_SUCCESS:
      return state.set('isLoading', false);
    case UPDATE_COUPONS_FAIL:
      return state;
    default:
      return state;
  }
}

export default cardCouponsSceneReducer;
