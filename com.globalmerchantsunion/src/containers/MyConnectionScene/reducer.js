/*
 *
 * MyConnectionScene reducer
 *
 */
import { getImmutableData } from 'utils/helpers';

import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  LOAD_CONNECTIONS,
  LOAD_CONNECTIONS_SUCCESS,
  LOAD_CONNECTIONS_FAIL,

  LOAD_RECOMMENDS,
  LOAD_RECOMMENDS_SUCCESS,
  LOAD_RECOMMENDS_FAIL,
} from './constants';

const initialState = getImmutableData({});

function MyConnectionSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONNECTIONS:
      return state
        .set('connectionsLoading', true);
    case LOAD_CONNECTIONS_SUCCESS:
      return state
        .set('connectionsLoading', false)
        .set('connections', getImmutableData(action.connections));
    case LOAD_CONNECTIONS_FAIL:
      return state
        .set('connectionsLoading', false);

    case LOAD_RECOMMENDS:
      return state
        .set('recommendsLoading', true);
    case LOAD_RECOMMENDS_SUCCESS:
      return state
        .set('recommendsLoading', false)
        .set('recommends', getImmutableData(action.recommends));
    case LOAD_RECOMMENDS_FAIL:
      return state
        .set('recommendsLoading', false);

    case USER_LOGOUT_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default MyConnectionSceneReducer;
