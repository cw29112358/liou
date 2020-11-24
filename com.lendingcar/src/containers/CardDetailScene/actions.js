/*
 *
 * CardDetailScene actions
 *
 */

import {
  SET_CARD_ID,
  SET_STORE_INDEX,
} from './constants';

export function setCardIdAction(cardId) {
  return {
    type: SET_CARD_ID,
    cardId,
  };
}
export function setStoreIndexAction(storeIndex) {
  return {
    type: SET_STORE_INDEX,
    storeIndex,
  };
}
