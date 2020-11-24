/*
 *
 * MyNewsScene actions
 *
 */

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

export function loadNotificationsAction(onSuccess) {
  return {
    type: LOAD_NOTIFICATIONS,
    onSuccess,
  };
}
export function loadNotificationsSuccessAction(notifications) {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}
export function loadNotificationsFailAction(error) {
  return {
    type: LOAD_NOTIFICATIONS_FAIL,
    error,
  };
}

export function setNotificationsLastReadTimeAction(time) {
  return {
    type: SET_NOTIFICATIONS_LAST_READ_TIME,
    time,
  };
}

export function loadInvitationsAction(onSuccess) {
  return {
    type: LOAD_INVITATIONS,
    onSuccess,
  };
}
export function loadInvitationsSuccessAction(invitations) {
  return {
    type: LOAD_INVITATIONS_SUCCESS,
    invitations,
  };
}
export function loadInvitationsFailAction(error) {
  return {
    type: LOAD_INVITATIONS_FAIL,
    error,
  };
}

export function setInvitationIdAction(invitationId) {
  return {
    type: SET_INVITATION_ID,
    invitationId,
  };
}

export function changeInvitationAction(apiType, id) {
  return {
    type: CHANGE_INVITATION,
    apiType,
    id,
  };
}
export function changeInvitationSuccessAction(invitation, apiType) {
  return {
    type: CHANGE_INVITATION_SUCCESS,
    invitation,
    apiType,
  };
}
export function changeInvitationFailAction(error) {
  return {
    type: CHANGE_INVITATION_FAIL,
    error,
  };
}
