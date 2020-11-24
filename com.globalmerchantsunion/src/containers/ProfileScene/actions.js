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

export function loadUserActivitiesAction(params, isFirstLoad, onSuccess) {
  return {
    type: LOAD_USER_ACTIVITIES,
    params,
    isFirstLoad,
    onSuccess,
  };
}
export function loadUserActivitiesSuccessAction(activities, loadContentLength) {
  return {
    type: LOAD_USER_ACTIVITIES_SUCCESS,
    activities,
    loadContentLength,
  };
}
export function loadUserActivitiesFailAction(error) {
  return {
    type: LOAD_USER_ACTIVITIES_FAIL,
    error,
  };
}
