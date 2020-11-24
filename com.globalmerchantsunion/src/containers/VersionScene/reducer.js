/*
 *
 * VersionScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_APP_VERSION,
  LOAD_APP_VERSION_SUCCESS,
  LOAD_APP_VERSION_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function versionSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APP_VERSION: {
      return state
        .set('isLoading', true)
        .set('msg', '');
    }
    case LOAD_APP_VERSION_SUCCESS: {
      return state
        .set('isLoading', false)
        .set('versions', getImmutableData(action.versions));
    }
    case LOAD_APP_VERSION_FAIL: {
      return state
        .set('isLoading', false)
        .set('msg', action.error.message);
    }

    default:
      return state;
  }
}

export default versionSceneReducer;
