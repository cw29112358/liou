/*
 *
 * ConnectionSearchScene actions
 *
 */

import {
  CHANGE_SEARCH_ACTION,
} from './constants';

export function changeSearchAction(key, value) {
  return {
    type: CHANGE_SEARCH_ACTION,
    key,
    value,
  };
}
