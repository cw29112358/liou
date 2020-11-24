/*
 *
 * TripScene actions
 *
 */

import {
  LOAD_TRIP,
  LOAD_TRIP_SUCCESS,
  LOAD_TRIP_FAIL,

  CHANGE_TAB,
} from './constants';

export function loadTripAction(params = {}) {
  return {
    type: LOAD_TRIP,
    params,
  };
}
export function loadTripSuccessAction(tripsObject) {
  return {
    type: LOAD_TRIP_SUCCESS,
    tripsObject,
  };
}
export function loadTripFailAction(error) {
  return {
    type: LOAD_TRIP_FAIL,
    error,
  };
}

export function changeTabAction(tab) {
  return {
    type: CHANGE_TAB,
    tab,
  };
}
