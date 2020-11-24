/*
 *
 * CardDetailScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  SET_CARD_ID,
  SET_STORE_INDEX,
} from './constants';

const initialState = fromJS({
});

function cardDetailSceneReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARD_ID:
      return state
        .set('cardId', action.cardId)
        .delete('store');
    case SET_STORE_INDEX:
      return state
        .set('storeIndex', fromJS(action.storeIndex));
    default:
      return state;
  }
}

export default cardDetailSceneReducer;
