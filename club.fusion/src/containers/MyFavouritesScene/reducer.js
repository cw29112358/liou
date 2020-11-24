/*
 *
 * MyFavouritesScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  LOAD_MY_FAVOURITES,
  LOAD_MY_FAVOURITES_SUCCESS,
  LOAD_MY_FAVOURITES_FAIL,

  UPDATE_FAVOURITES,
  UPDATE_FAVOURITES_SUCCESS,
  UPDATE_FAVOURITES_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function MyFavouritesSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_FAVOURITES:
      return state.set('isLoading', true);
    case LOAD_MY_FAVOURITES_SUCCESS:
      return state.set('favourites', getImmutableData(action.favourites))
        .set('isLoading', false);
    case LOAD_MY_FAVOURITES_FAIL:
      return state;

    case UPDATE_FAVOURITES:
      return state.set('isLoading', true);
    case UPDATE_FAVOURITES_SUCCESS:
      return state.set('isLoading', false);
    case UPDATE_FAVOURITES_FAIL:
      return state;

    case USER_LOGOUT_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default MyFavouritesSceneReducer;
