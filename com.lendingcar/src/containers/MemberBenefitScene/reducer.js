/*
 *
 * MemberScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  LOAD_BENEFITS,
  LOAD_BENEFITS_SUCCESS,
  LOAD_BENEFITS_FAIL,

  LOAD_USER_APPOINTMENT,
  LOAD_USER_APPOINTMENT_SUCCESS,
  LOAD_USER_APPOINTMENT_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function memberBenefitSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BENEFITS:
      return state.set('isLoading', true);
    case LOAD_BENEFITS_SUCCESS: {
      return state
        .set('benefitsData', getImmutableData(action.benefitsData))
        .set('isLoading', false);
    }
    case LOAD_BENEFITS_FAIL:
      return state
        .set('isLoading', false);

    case LOAD_USER_APPOINTMENT:
      return state.set('isLoading', true);
    case LOAD_USER_APPOINTMENT_SUCCESS: {
      return state
        .set('appointments', getImmutableData(action.appointments))
        .set('isLoading', false);
    }
    case LOAD_USER_APPOINTMENT_FAIL:
      return state
        .set('isLoading', false);

    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default memberBenefitSceneReducer;
