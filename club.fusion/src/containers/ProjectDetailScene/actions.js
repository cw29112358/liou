/*
 *
 * ProjectDetailScene actions
 *
 */

import {
  LOAD_PROJECT_DETAIL,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_DETAIL_FAIL,
} from './constants';

export function loadProjectDetailAction(params = {}) {
  return {
    type: LOAD_PROJECT_DETAIL,
    params,
  };
}
export function loadProjectDetailSuccessAction(activities) {
  return {
    type: LOAD_PROJECT_DETAIL_SUCCESS,
    activities,
  };
}
export function loadProjectDetailFailAction(error) {
  return {
    type: LOAD_PROJECT_DETAIL_FAIL,
    error,
  };
}
