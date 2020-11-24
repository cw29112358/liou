/*
 *
 * ProjectDetailScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_PROJECT_DETAIL,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_DETAIL_FAIL,
} from './constants';

const initialState = getImmutableData({});

function projectDetailSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT_DETAIL:
      return state.set('isLoading', true);
    case LOAD_PROJECT_DETAIL_SUCCESS:
      return state.set('isLoading', false);
    case LOAD_PROJECT_DETAIL_FAIL:
      return state;
    default:
      return state;
  }
}

export default projectDetailSceneReducer;
