/*
 *
 * MemberScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  MEMBERSHIP_PRICE_LOAD,
  MEMBERSHIP_PRICE_LOAD_SUCCESS,
  MEMBERSHIP_PRICE_LOAD_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function memberSceneReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBERSHIP_PRICE_LOAD:
      return state.set('isLoading', true);
    case MEMBERSHIP_PRICE_LOAD_SUCCESS: {
      return state
        .set('membershipPrice', getImmutableData(action.membershipPrice))
        .set('isLoading', false);
    }
    case MEMBERSHIP_PRICE_LOAD_FAIL:
      return state
        .set('isLoading', false);

    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default memberSceneReducer;
