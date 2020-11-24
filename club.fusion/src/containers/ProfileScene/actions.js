/*
 *
 * ProfileScene actions
 *
 */

import {
  LOAD_USER_ACTIVITIES,
  LOAD_USER_ACTIVITIES_SUCCESS,
  LOAD_USER_ACTIVITIES_FAIL,
} from './constants';

export function loadUserActivitiesAction(userId, isFirstLoad, onSuccess) {
  return {
    type: LOAD_USER_ACTIVITIES,
    userId,
    isFirstLoad,
    onSuccess,
  };
}
export function loadUserActivitiesSuccessAction(activities) {
  return {
    type: LOAD_USER_ACTIVITIES_SUCCESS,
    activities,
  };
}
export function loadUserActivitiesFailAction(error) {
  return {
    type: LOAD_USER_ACTIVITIES_FAIL,
    error,
  };
}
