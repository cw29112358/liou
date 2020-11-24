/*
 *
 * CardPackageScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';
import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  LOAD_CARDS,
  LOAD_CARDS_SUCCESS,
  LOAD_CARDS_FAIL,

  LOAD_COUPONS,
  LOAD_COUPONS_SUCCESS,
  LOAD_COUPONS_FAIL,
} from './constants';

const initialState = getImmutableData({});

function cardPackageSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARDS:
      return state.set('isLoading', true);
    case LOAD_CARDS_SUCCESS: {
      return state.set('cards', getImmutableData(action.cards))
        .set('isLoading', false);
    }
    case LOAD_CARDS_FAIL:
      return state;
    case LOAD_COUPONS:
      return state.set('isLoading', true);
    case LOAD_COUPONS_SUCCESS: {
      return state.set('coupons', getImmutableData(action.coupons))
        .set('isLoading', false);
    }
    case LOAD_COUPONS_FAIL:
      return state;

    case USER_LOGOUT_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default cardPackageSceneReducer;
