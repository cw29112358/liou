/*
 *
 * InventoryScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  INVENTORY_LOAD,
  INVENTORY_LOAD_SUCCESS,
  INVENTORY_LOAD_FAIL,

  CHANGE_SEARCH,
  CHANGE_SORT,
  CHANGE_FILTER,
  CHANGE_CLEAR,
} from './constants';

const initialState = getImmutableData({
  filterData: {
    priceLabel: 'unlimited',
  },
});

function inventorySceneReducer(state = initialState, action) {
  switch (action.type) {
    case INVENTORY_LOAD:
      return state.set('isLoading', true);
    case INVENTORY_LOAD_SUCCESS: {
      return state
        .set('inventories', getImmutableData(action.inventoriesObject))
        .set('isLoading', false);
    }
    case INVENTORY_LOAD_FAIL:
      return state
        .set('isLoading', false);

    case CHANGE_SEARCH:
      return state.set('search', getImmutableData(action.value));
    case CHANGE_SORT: {
      if (!action.value) return state.delete('sortData');

      const sortData = getImmutableData({
        [action.name]: action.value,
      });
      return state.set('sortData', sortData);
    }
    case CHANGE_FILTER: {
      if (!action.value) return state.deleteIn(['filterData', action.name]);

      return state.setIn(['filterData', action.name], getImmutableData(action.value));
    }
    case CHANGE_CLEAR:
      return state
        .delete('sortData')
        .deleteIn(['filterData', 'color'])
        .deleteIn(['filterData', 'brand']);

    default:
      return state;
  }
}

export default inventorySceneReducer;
