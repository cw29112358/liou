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

  LOAD_INVITATIONS,
  LOAD_INVITATIONS_SUCCESS,
  LOAD_INVITATIONS_FAIL,

  SET_INVITATION_ID,

  CHANGE_INVITATION,
  CHANGE_INVITATION_SUCCESS,
  CHANGE_INVITATION_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function myNewsSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return state
        .set('notificationsLoading', true);
    case LOAD_NOTIFICATIONS_SUCCESS:
      return state
        .set('notifications', getImmutableData(action.notifications))
        .set('notificationsLoading', false);
    case LOAD_NOTIFICATIONS_FAIL:
      return state
        .set('notificationsLoading', false);

    case SET_NOTIFICATIONS_LAST_READ_TIME:
      return state
        .set('notificationsLastReadTime', action.time);

    case LOAD_INVITATIONS:
      return state
        .set('invitationsLoading', true);
    case LOAD_INVITATIONS_SUCCESS:
      return state
        .set('invitations', getImmutableData(action.invitations))
        .set('invitationsLoading', false);
    case LOAD_INVITATIONS_FAIL:
      return state
        .set('invitationsLoading', false);

    case SET_INVITATION_ID:
      return state.set('invitationId', action.invitationId);

    case CHANGE_INVITATION:
      return state.set('done', action.apiType === 'read');
    case CHANGE_INVITATION_SUCCESS: {
      const { invitation } = action;
      const findIndex = state
        .get('invitations')
        .findIndex((item) => item.get('id') === invitation.id);

      return state
        .set('done', true)
        .updateIn(['invitations', findIndex], (value) => (
          value
            .merge(getImmutableData(invitation))
            .set('isRead', true)
        ));
    }
    case CHANGE_INVITATION_FAIL:
      return state.set('done', true);

    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default myNewsSceneReducer;
