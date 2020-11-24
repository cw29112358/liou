/*
 *
 * MyConnectionScene actions
 *
 */

import {
  LOAD_CONNECTIONS,
  LOAD_CONNECTIONS_SUCCESS,
  LOAD_CONNECTIONS_FAIL,

  LOAD_RECOMMENDS,
  LOAD_RECOMMENDS_SUCCESS,
  LOAD_RECOMMENDS_FAIL,
} from './constants';

export function loadConnectionsAction(params = {}) {
  return {
    type: LOAD_CONNECTIONS,
    params,
  };
}
export function loadConnectionsSuccessAction(connections) {
  return {
    type: LOAD_CONNECTIONS_SUCCESS,
    connections,
  };
}
export function loadConnectionsFailAction(error) {
  return {
    type: LOAD_CONNECTIONS_FAIL,
    error,
  };
}

export function loadRecommendsAction(params = {}) {
  return {
    type: LOAD_RECOMMENDS,
    params,
  };
}
export function loadRecommendsSuccessAction(recommends) {
  return {
    type: LOAD_RECOMMENDS_SUCCESS,
    recommends,
  };
}
export function loadRecommendsFailAction(error) {
  return {
    type: LOAD_RECOMMENDS_FAIL,
    error,
  };
}
