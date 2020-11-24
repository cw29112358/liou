/*
 *
 * MyNewsScene reducer
 *
 */
import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,

  SET_NOTIFICATIONS_LAST_READ_TIME,
} from './constants';

const initialState = getImmutableData({
});

function myNewsSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return state.set('isLoading', true);
    case LOAD_NOTIFICATIONS_SUCCESS:
      return state
        .set('notifications', getImmutableData(action.notifications))
        .set('isLoading', false);
    case LOAD_NOTIFICATIONS_FAIL:
      return state
        .set('isLoading', false);

    case SET_NOTIFICATIONS_LAST_READ_TIME:
      return state
        .set('notificationsLastReadTime', action.time);

    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default myNewsSceneReducer;
