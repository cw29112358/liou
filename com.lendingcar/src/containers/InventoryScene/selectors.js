// /* global window */

import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable, { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import {
  isNaN, max, min, lowerCase,
} from 'lodash';
import Fuse from 'fuse.js';
import moment from 'moment';

import {
  getCalculatedPrice,
  getCalculatedString,
} from 'utils/helpers';

import {
  COLOR_ORDER,
  CAR_TYPE_LIST,
} from './constants';

const colorOrder = fromJS(COLOR_ORDER);

// selectors
export const selectInventorySceneReducer = (state) => state.get('inventoryScene', Immutable.Map());

export const selectAllInventory = createGetSelector(
  selectInventorySceneReducer, 'inventories', Immutable.List()
);
export const selectIsLoading = createGetSelector(
  selectInventorySceneReducer, 'isLoading', true,
);
export const selectSearch = createGetSelector(
  selectInventorySceneReducer, 'search', ''
);
export const selectSortData = createGetSelector(
  selectInventorySceneReducer, 'sortData', Immutable.Map()
);
export const selectFilterData = createGetSelector(
  selectInventorySceneReducer, 'filterData', Immutable.Map()
);

// car field
export function getCalculatedCarType(val) {
  switch (lowerCase(val)) {
    case 'car':
    case 'passenger car':
    case 'sedan':
      return 'sedan';
    case 'suv':
    case 'multipurpose passenger vehicle':
    case 'mpv':
      return 'suv';
    case 'van':
    case 'minivan':
      return 'van';
    case 'truck':
      return 'truck';
    default:
      return 'others';
  }
}
// export function getDepositFinance(price) {
//   const result = window.Installment ? window.Installment.depositFinance(price, 0.1) : {};
//   return fromJS(result);
// }
export function getLatestPromotion(item) {
  if (!item.get('promotions') || item.get('promotions').size <= 0) return null;
  const promotions = item.get('promotions').filter((promotion) => promotion.get('endDate') >= moment().format('YYYY-MM-DD'))
    .sortBy((promotion) => {
      const startDate = promotion.get('startDate');
      return -moment(startDate).unix();
    });
  return promotions.get(0);
}
export function getCalculatedItem(item) {
  let price = item.get('suggestedPrice') || item.get('price') * (1 + 0.12);
  price = getCalculatedPrice(parseInt(price, 10));
  const depositPrice = Math.round(price * 0.88);
  let loanRelated = {};
  if (item.get('isLoanable')) {
    const loanRate = item.get('loanRate') / 100 || 0.25;
    const defaultLoanRate = 0.25;
    loanRelated.monthly = Math.round(depositPrice * 0.85 * loanRate / 12);
    loanRelated.downPayment = depositPrice - Math.round(loanRelated.monthly * 12 / loanRate);
    loanRelated.defaultMonthly = Math.round(depositPrice * 0.85 * defaultLoanRate / 12);
    loanRelated.defaultDownPayment = depositPrice - Math.round(loanRelated.defaultMonthly * 12 / defaultLoanRate);
  } else {
    loanRelated = null;
  }

  // const depositFinance = getDepositFinance(depositPrice);

  return (
    item
      .set('price', price)
      .set('depositPrice', depositPrice)
      .set('loanRelated', loanRelated)
      // .set('isLoanable', true)
      // .set('loanRate', 25)
      // .set('depositFinance', depositFinance)
      .set('promotion', getLatestPromotion(item))
      .update('year', (val) => parseInt(val, 10))
      .update('color', (val) => {
        const color = getCalculatedString(val);

        if (COLOR_ORDER[color]) return color;
        return 'other';
      })
      .update('carType', (val) => getCalculatedCarType(val))
      .update('make', (val) => getCalculatedString(val))
  );
}
export const selectRootInventory = createSelector(
  selectAllInventory,
  (inventory) => (
    inventory
      .filter((item) => (
        item.get('price') > 0
        && new Date().getFullYear() - item.get('year') <= 20
        && !!item.get('make').trim()
        && (item.get('availability') === 'available'
        || item.get('availability') === 'comingsoon')
      ))
      .map((item) => getCalculatedItem(item))
  )
);

export const selectYearRange = createSelector(
  selectRootInventory,
  (inventory) => {
    const yearRangeEnd = new Date().getFullYear();
    const defaultResult = Immutable.List([yearRangeEnd - 10, yearRangeEnd]);
    const reduceResult = inventory.reduce((result, car) => {
      const year = car.get('year');
      if (isNaN(year)) return result;


      return result
        .update(0, (value) => min([value, year]))
        .update(1, (value) => max([value, year]));
    }, defaultResult);

    return reduceResult;
  }
);

export const selectColorOptions = createSelector(
  selectRootInventory,
  (inventory) => {
    let colorOptions = colorOrder;
    if (inventory.size) {
      colorOptions = inventory
        .reduce((result, item) => {
          let color = item.get('color');
          if (!result.has(color)) color = 'other';

          return result
            .updateIn([color, 'num'], (val = 0) => val + 1);
        }, colorOrder)
        .filter((item) => {
          const num = item.get('num');
          return num && num > 0;
        });
    }

    return colorOptions
      .valueSeq()
      .sortBy((objA) => objA.get('order'));
  }
);
export const selectBrandOptions = createSelector(
  selectRootInventory,
  (inventory) => inventory
    .reduce((result, item) => {
      const make = item.get('make');
      if (result.has(make)) return result;

      return result
        .setIn([make, 'label'], make);
    }, Immutable.Map())
    .valueSeq()
    .sortBy((item) => item.get('label'))
);

// search
export const selectSearchedInventory = createSelector(
  selectRootInventory,
  selectSearch,
  (allInventory, searchKeyword) => {
    const searchTrim = searchKeyword.trim();
    if (!searchTrim) return allInventory;

    return fromJS(handleFilterSearch(searchTrim, allInventory.toJS()));
  }
);
function handleFilterSearch(searchKeyword, data) {
  if (!searchKeyword) return data;

  const options = {
    // tokenize: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'make',
      'model',
      'color',
      'year',
      'drivenWheels',
    ],
  };
  const fuse = new Fuse(Object.values(data), options);
  const result = fuse.search(searchKeyword);
  return result;
}

// search => priceRange + yearRange + color + brand
export const makeSelectorFilterDataByKey = (key) => createSelector(
  selectFilterData,
  (filterData) => filterData.get(key)
);
export const selectSearchedFilteredInventory = createSelector(
  selectSearchedInventory,
  makeSelectorFilterDataByKey('priceRange'),
  makeSelectorFilterDataByKey('yearRange'),
  makeSelectorFilterDataByKey('color'),
  makeSelectorFilterDataByKey('brand'),
  (allInventory, priceRange, yearRange, color, brand) => {
    if (!(priceRange || yearRange || color || brand)) return allInventory;

    return allInventory
      .filter((item) => (
        handleFilterRangeSlide(item, priceRange, 'price')
        && handleFilterRangeSlide(item, yearRange, 'year')
        && handleFilterMultiple(item, color, 'color')
        && handleFilterMultiple(item, brand, 'make')
      ));
  }
);
function handleFilterRangeSlide(item, filter, key) {
  if (!filter || !filter.size) return true;

  const target = item.get(key);
  return target >= filter.get(0) && target <= filter.get(1);
}
function handleFilterMultiple(item, filter, key) {
  if (!filter || !filter.size) return true;

  const target = item.get(key);
  return !!filter
    .find((filterItem) => filterItem === target);
}

// search => priceRange + yearRange + color + brand => carType
export const selectSearchedFilteredCarTypeInventory = createSelector(
  selectSearchedFilteredInventory,
  makeSelectorFilterDataByKey('carType'),
  (allInventory, carType) => allInventory
    .filter((item) => (
      handleFilterSingle(item, carType, 'carType')
    ))
);
function handleFilterSingle(item, filter, key) {
  if (!filter) return true;

  return item.get(key) === filter;
}

// default price asc
export const selectPriceSearchedFilterInventory = createSelector(
  selectSearchedFilteredCarTypeInventory,
  (allInventory) => handleOrder(allInventory, 'price', 'highToLow')
);

// order price/year
export const selectOrderedSearchedFilterInventory = createSelector(
  selectPriceSearchedFilterInventory,
  selectSortData,
  (allInventory, sortData) => {
    if (!sortData || !sortData.size) return allInventory;

    const key = sortData.keySeq().get(0);
    const sort = sortData.get(key);
    if (key === 'price' && sort === 'highToLow') return allInventory;
    return handleOrder(allInventory, key, sort);
  }
);
function handleOrder(inventories, key, sort) {
  const sortBase = sort === 'lowToHigh' ? 1 : -1;

  return inventories
    .sortBy((objA) => sortBase * objA.get(key));
}

// homeScene
export const selectInventoryByType = createSelector(
  selectSearchedFilteredInventory,
  (inventory) => {
    const defaultResult = CAR_TYPE_LIST.reduce((result, item) => {
      if (item === 'others') {
        return result.set('all', fromJS({
          type: 'all',
          size: inventory.size,
        }));
      }

      return result.set(item, fromJS({
        type: item,
        size: 0,
      }));
    }, Immutable.Map());

    const reduceResult = inventory.reduce((result, item) => {
      const carType = item.get('carType');
      if (!result.has(carType)) {
        return result;
      }

      return result.updateIn([carType, 'size'], (value) => value + 1);
    }, defaultResult);
    return reduceResult.valueSeq();
  }
);
