/*
 *
 * InventoryPage reducer
 *
 */

import Immutable, { fromJS } from 'immutable';
import {
  INVENTORY_LOAD,
  INVENTORY_LOAD_SUCCESS,
  INVENTORY_LOAD_FAIL,

  LOAD_PACKAGE,
  LOAD_PACKAGE_SUCCESS,
  LOAD_PACKAGE_FAIL,

  CHANGE_FILTER,
  CHANGE_CONFIG,
  CHANGE_PAGE,
  CHANGE_SEARCH,

  CHANGE_COLOR_FILTER,
  CHANGE_MULTICOLOR_FILTER,
  CHANGE_MULTIMAKE_FILTER,
  CHANGE_ORDER,
  CHANGE_AVAILABILITY,
  CHANGE_YEARRANGE,
  CHANGE_PRICERANGE,
}
from './constants';

const initialState = fromJS({
  config: {
    page: 0,
    itemCountPerPage: 10,
  },
  filter: {
    make: '',
    year: '',
  },
  colorFilter: {
    color: '',
  },
  multiFilter: {
    make: [],
    color: [],
  },
  orderType: 'none',
  availability: '', // TODO: temporarily used for comment out available toggle
  yearRange: [],
  priceRange: [],
  search: '',
  inventories: {},
  isLoading: true,
});

function inventoryPageReducer(state = initialState, action) {
  switch (action.type) {
    case INVENTORY_LOAD:
      return state.set('isLoading', true);
    case INVENTORY_LOAD_SUCCESS: {
      return state
        .set('inventories', fromJS(action.inventoriesObject))
        .set('isLoading', false);
    }
    case INVENTORY_LOAD_FAIL:
      return state
        .set('isLoading', false);

    case LOAD_PACKAGE:
      return state;
    case LOAD_PACKAGE_SUCCESS: {
      return state.set('inventories', fromJS(action.carPackage));
    }
    case LOAD_PACKAGE_FAIL:
      return state;

    case CHANGE_FILTER:
      {
        if (action.filter.make !== undefined) {
          return state.set('filter', fromJS(action.filter))
          .setIn(['config', 'page'], 0)
          .set('search', '');
        }
        return state.set('filter', state.get('filter').merge(fromJS(action.filter)))
        .setIn(['config', 'page'], 0)
        .set('search', '');
      }
    case CHANGE_CONFIG:
      return state.set('config', state.get('config').merge(fromJS(action.config)));
    case CHANGE_PAGE:
      return state.setIn(['config', 'page'], action.pageNumber);
    case CHANGE_SEARCH:
      {
        return state
          .set('search', action.keyword)
          .set('filter', Immutable.Map())
          .set('orderType', 'none')
          .setIn(['config', 'page'], 0)
          .setIn(['multiFilter', 'make'], Immutable.List())
          .setIn(['multiFilter', 'color'], Immutable.List());
      }

    case CHANGE_COLOR_FILTER:
      {
        if (action.colorFilter.color !== undefined) {
          return state.set('colorFilter', fromJS(action.colorFilter))
            .setIn(['config', 'page'], 0)
            .set('search', '')
            .set('filter', Immutable.Map());
        }
        return state.set('colorFilter', state.get('colorFilter').merge(fromJS(action.colorFilter)))
          .setIn(['config', 'page'], 0)
          .set('search', '')
          .set('filter', Immutable.Map());
      }
    case CHANGE_MULTICOLOR_FILTER:
      {
        if (action.multiFilterColor !== undefined && action.multiFilterColor !== '') {
          return state.setIn(['multiFilter', 'color'],
          (state.getIn(['multiFilter', 'color']).indexOf(action.multiFilterColor) === -1)
          ? state.getIn(['multiFilter', 'color']).insert(0, action.multiFilterColor)
        : state.getIn(['multiFilter', 'color']).delete(state.getIn(['multiFilter', 'color']).indexOf(action.multiFilterColor)))
              .setIn(['config', 'page'], 0)
              .set('search', '')
              .set('orderType', 'none')
              .set('filter', Immutable.Map());
        }
        return state.setIn(['multiFilter', 'color'], state.getIn(['multiFilter', 'color']).merge(fromJS(action.multiFilterColor)))
            .setIn(['config', 'page'], 0)
            .set('search', '')
            .set('orderType', 'none')
            .set('filter', Immutable.Map());
      }
    case CHANGE_MULTIMAKE_FILTER:
      {
        if (action.multiFilterMake !== undefined && action.multiFilterMake !== '') {
          return state.setIn(['multiFilter', 'make'],
            (state.getIn(['multiFilter', 'make']).indexOf(action.multiFilterMake) === -1)
            ? state.getIn(['multiFilter', 'make']).insert(0, action.multiFilterMake)
          : state.getIn(['multiFilter', 'make']).delete(state.getIn(['multiFilter', 'make']).indexOf(action.multiFilterMake)))
                .setIn(['config', 'page'], 0)
                .set('search', '')
                .set('orderType', 'none')
                .set('filter', Immutable.Map());
        }
        return state.setIn(['multiFilter', 'make'], state.getIn(['multiFilter', 'make']).merge(fromJS(action.multiFilterMake)))
              .setIn(['config', 'page'], 0)
              .set('search', '')
              .set('orderType', 'none')
              .set('filter', Immutable.Map());
      }
    case CHANGE_ORDER:
      {
        const orderType = action.orderType !== undefined ? action.orderType : state.get('orderType');
        return state.set('orderType', fromJS(orderType))
            .setIn(['config', 'page'], 0);
      }
    case CHANGE_AVAILABILITY:
      return state.set('availability', action.availability);
    case CHANGE_YEARRANGE:
      return state.set('yearRange', action.yearRange);
    case CHANGE_PRICERANGE:
      return state.set('priceRange', action.priceRange);

    default:
      return state;
  }
}

export default inventoryPageReducer;
