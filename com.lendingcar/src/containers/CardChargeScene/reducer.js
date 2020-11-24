/*
 *
 * CardChargeScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHARGE_CARD,
  CHARGE_CARD_SUCCESS,
  CHARGE_CARD_FAIL,
} from './constants';

const initialState = fromJS({});

function cardChargeSceneReducer(state = initialState, action) {
  switch (action.type) {
    case CHARGE_CARD:
      return state.set('isLoading', true);
    case CHARGE_CARD_SUCCESS:
      return state.set('isLoading', false);
    case CHARGE_CARD_FAIL:
      return state;
    default:
      return state;
  }
}

export default cardChargeSceneReducer;
