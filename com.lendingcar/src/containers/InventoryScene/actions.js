/*
 *
 * InventoryScene actions
 *
 */

import {
  INVENTORY_LOAD,
  INVENTORY_LOAD_SUCCESS,
  INVENTORY_LOAD_FAIL,

  CHANGE_SEARCH,
  CHANGE_SORT,
  CHANGE_FILTER,
  CHANGE_CLEAR,
} from './constants';

export function loadInventoryAction(params = {}) {
  return {
    type: INVENTORY_LOAD,
    params,
  };
}
export function loadInventorySuccessAction(inventoriesObject) {
  return {
    type: INVENTORY_LOAD_SUCCESS,
    inventoriesObject,
  };
}
export function loadInventoryFailAction(error) {
  return {
    type: INVENTORY_LOAD_FAIL,
    error,
  };
}

export function changeSearchAction(value) {
  return {
    type: CHANGE_SEARCH,
    value,
  };
}
export function changeSortAction(name, value) {
  return {
    type: CHANGE_SORT,
    name,
    value,
  };
}
export function changeFilterAction(name, value) {
  return {
    type: CHANGE_FILTER,
    name,
    value,
  };
}
export function changeClearAction() {
  return {
    type: CHANGE_CLEAR,
  };
}
