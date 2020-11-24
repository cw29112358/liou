/*
 *
 * TripScene reducer
 *
 */
import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_TRIP,
  LOAD_TRIP_SUCCESS,
  LOAD_TRIP_FAIL,

  CHANGE_TAB,
} from './constants';

const initialState = getImmutableData({
});

function tripSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TRIP:
      return state.set('isLoading', true);
    case LOAD_TRIP_SUCCESS: {
      return state
        .set('trips', getImmutableData(action.tripsObject))
        .set('isLoading', false);
    }
    case LOAD_TRIP_FAIL:
      return state
        .set('isLoading', false);

    case CHANGE_TAB:
      return state
        .set('tab', action.tab);

    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default tripSceneReducer;
