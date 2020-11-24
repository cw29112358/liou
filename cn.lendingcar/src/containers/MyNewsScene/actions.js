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
} from './constants';

export function loadNotificationsAction() {
  return {
    type: LOAD_NOTIFICATIONS,
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
