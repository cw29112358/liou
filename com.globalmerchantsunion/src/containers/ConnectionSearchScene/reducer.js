/*
 *
 * ConnectionSearchScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CHANGE_SEARCH_ACTION,
} from './constants';

const initialState = fromJS({
});

function connectionSearchSceneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_ACTION: {
      const { key, value } = action;
      return state
        .set('searchKey', key)
        .set('searchValue', value);
    }
    default:
      return state;
  }
}

export default connectionSearchSceneReducer;
