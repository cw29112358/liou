/*
 *
 * VersionScene actions
 *
 */

import {
  LOAD_APP_VERSION,
  LOAD_APP_VERSION_SUCCESS,
  LOAD_APP_VERSION_FAIL,
} from './constants';

export function loadAppVersionAction(params = {}) {
  return {
    type: LOAD_APP_VERSION,
    params,
  };
}
export function loadAppVersionSuccessAction(versions) {
  return {
    type: LOAD_APP_VERSION_SUCCESS,
    versions,
  };
}
export function loadAppVersionFailAction(error) {
  return {
    type: LOAD_APP_VERSION_FAIL,
    error,
  };
}
