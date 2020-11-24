/*
 *
 * TriPage actions
 *
 */
import {
  MYTRIP_LOAD,
  MYTRIP_LOAD_SUCCESS,
  MYTRIP_LOAD_FAIL,
  MYTRIP_NOTLATEST,
  USER_LOGOUT_MYTIRP,
} from './constants';

export function loadMyTripAction(uid) {
  return {
    type: MYTRIP_LOAD,
    uid,
  };
}

export function loadMyTripSuccessAction(tripsObject) {
  return {
    type: MYTRIP_LOAD_SUCCESS,
    tripsObject,
  };
}

export function loadMyTripFailAction(error) {
  return {
    type: MYTRIP_LOAD_FAIL,
    error,
  };
}

export function setNotLatestAction() {
  return {
    type: MYTRIP_NOTLATEST,
  };
}

export function userLogOutInitMytripAction() {
  return {
    type: USER_LOGOUT_MYTIRP,
  };
}
