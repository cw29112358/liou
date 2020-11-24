/*
 *
 * MyFavouritesScene actions
 *
 */

import {
  LOAD_MY_FAVOURITES,
  LOAD_MY_FAVOURITES_SUCCESS,
  LOAD_MY_FAVOURITES_FAIL,

  UPDATE_FAVOURITES,
  UPDATE_FAVOURITES_SUCCESS,
  UPDATE_FAVOURITES_FAIL,
} from './constants';

export function loadMyFavouritesAction(params = {}) {
  return {
    type: LOAD_MY_FAVOURITES,
    params,
  };
}
export function loadMyFavouritesSuccessAction(favourites) {
  return {
    type: LOAD_MY_FAVOURITES_SUCCESS,
    favourites,
  };
}
export function loadMyFavouritesFailAction(error) {
  return {
    type: LOAD_MY_FAVOURITES_FAIL,
    error,
  };
}

export function updateFavouritesAction(projectId) {
  return {
    type: UPDATE_FAVOURITES,
    projectId,
  };
}
export function updateFavouritesSuccessAction(favourites) {
  return {
    type: UPDATE_FAVOURITES_SUCCESS,
    favourites,
  };
}
export function updateFavouritesFailAction(error) {
  return {
    type: UPDATE_FAVOURITES_FAIL,
    error,
  };
}
