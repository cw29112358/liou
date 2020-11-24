/*
 *
 * MyHomeScene actions
 *
 */

import {
  LOAD_MEMBERSHIPS_POINT,
  LOAD_MEMBERSHIPS_POINT_SUCCESS,
  LOAD_MEMBERSHIPS_POINT_FAIL,
} from './constants';

export function loadLoadMembershipsPointAction() {
  return {
    type: LOAD_MEMBERSHIPS_POINT,
  };
}
export function loadLoadMembershipsPointSuccessAction(points) {
  return {
    type: LOAD_MEMBERSHIPS_POINT_SUCCESS,
    points,
  };
}
export function loadLoadMembershipsPointFailAction(error) {
  return {
    type: LOAD_MEMBERSHIPS_POINT_FAIL,
    error,
  };
}
