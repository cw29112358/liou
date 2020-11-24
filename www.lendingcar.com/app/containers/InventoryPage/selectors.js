import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';
import { fromJS, Map, List } from 'immutable';
import Fuse from 'fuse.js';
// import orderBy from 'lodash/orderBy';
// import { getDaysByStartDate } from 'utils/helpers';
import { selectPassengers, selectTerm, selectDate, selectSize } from 'containers/App/selectors';
import { assign, zipObject, toNumber, pick, orderBy, isNaN, min, max, camelCase, isNil } from 'lodash';
import lodashFilter from 'lodash/filter';

export const selectInventoryRoot = (state) => {
  const path = window.location.pathname.split('/')[1];
  if (path === 'packages') {
    return state.get('packages', Map());
  }
  return state.get('inventoryPage', Map());
};

export const selectAllInventory = createGetSelector(
  selectInventoryRoot, 'inventories', Map()
);

/*
 * single filter
 */
export const selectFilter = createGetSelector(
  selectInventoryRoot, 'filter', Map()
);
export const selectFilteredInventory = createSelector(
  selectFilter,
  selectAllInventory,
  (filter, inventory) => handleFilter(filter, inventory),
);
function handleFilter(filterMap, inventory) {
  if (!filterMap) return inventory;
  return inventory.filter((car) => {
    const keys = filterMap.keySeq();

    function filterByKey(key) {
      if (!filterMap.get(key)) return true;
      const carValue = car.get(key, '').toLowerCase().replace(/\s/g, '');
      const filterValue = filterMap.get(key, '').toLowerCase().replace(/\s/g, '');
      return carValue === filterValue;
    }
    return keys.every(filterByKey);
  });
}

// function handleColorFilter(colorFilterMap, inventory) {
//   if (!colorFilterMap) return inventory;
//   return inventory.filter((car) => {
//     if (!colorFilterMap.get('color')) return true;
//     const carValue = car.get('color', '').toLowerCase().replace(/\s/g, '');
//     const filterValue = colorFilterMap.get('color', '').toLowerCase().replace(/\s/g, '');
//     return carValue === filterValue;
//   });
// }

export const selectConfig = createGetSelector(
  selectInventoryRoot, 'config', Map()
);
export const selectPage = createGetSelector(
  selectConfig, 'page'
);
export const selectItemCountPerPage = createGetSelector(
  selectConfig, 'itemCountPerPage'
);

export const selectSearch = createGetSelector(
  selectInventoryRoot, 'search'
);
export const selectSearchedInventory = createSelector(
  selectSearch,
  selectAllInventory,
  (searchKeyword, allInventory) => handleSearch(searchKeyword, allInventory)
);
function handleSearch(searchKeyword, allInventory) {
  if (!searchKeyword || searchKeyword.length === 0) return allInventory;
  return fromJS(search(searchKeyword, allInventory.toJS()));
}
function search(keyword, data) {
  const options = {
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'make',
      'model',
      'color',
      'year',
    ],
  };
  const fuse = new Fuse(Object.values(data), options);
  const result = fuse.search(keyword);
  return result;
}

export const selectSelectedInventory = createSelector(
  selectSearch,
  selectFilteredInventory,
  selectSearchedInventory,
  (searchKeyword, filteredIventory, searchedInventory) => handleSelectedInventory(searchKeyword, filteredIventory, searchedInventory)
);
function handleSelectedInventory(searchKeyword, filteredIventory, searchedInventory) {
  let data = new Map();
  if (searchKeyword === '') {
    data = filteredIventory;
  } else {
    data = searchedInventory;
  }
  return data;
}

export const selectTotalCount = createSelector(
  selectSelectedInventory,
  (inventory) => inventory.size
);

export const selectCalculatedInventory = createSelector(
  selectSelectedInventory,
  selectDate,
  selectTerm,
  (inventory, date, term) => inventory.map((car) => handleCalculatePrice(car, date, term))
);
function handleCalculatePrice(car, date, term) {
  if (car.size === 0) {
    return car.merge(fromJS({
      plan: {
        type: 'lease',
        unit: 'month',
        daysOfRental: 0,
        dailyRent: 0,
        dailyInsurance: 0,
        deposit: 200,
        downpayment: 0,
      } }));
  }
  const priceAdjust = isNil(car.get('priceAdjust')) || Number(car.get('priceAdjust')) === 0 ? 100 : Number(car.get('priceAdjust'));
  // const price = Number(car.get('price')) * (priceAdjust / 100);
  // const days = Number(getDaysByStartDate(date, term));
  // const plan = window.m(price, days);

  const carClass = car.get('carClass');
  const leasePrice = car.get('leasePrice') ? car.get('leasePrice') : null;
  const leaseDeposit = car.get('leaseDeposit') ? car.get('leaseDeposit') : null;
  const occupancy = car.get('occupancy') ? Number(car.get('occupancy')) : 4;
  const plan = window.m(carClass, term, priceAdjust, leasePrice, leaseDeposit, occupancy);

  return car.set('plan', fromJS(plan));
}

export const selectMakeFilteredInventory = createSelector(
  selectFilter,
  selectCalculatedInventory,
  (filter, inventory) => fromJS(handleMakeFilter(filter, inventory)),
);
function handleMakeFilter(filterMap, inventory) {
  if (!filterMap) return inventory;
  return inventory.filter((car) => {
    if (!filterMap.get('make')) return true;
    const carValue = car.get('make', '').toLowerCase().replace(/\s/g, '');
    const filterValue = filterMap.get('make', '').toLowerCase().replace(/\s/g, '');
    return carValue === filterValue;
  });
}

export const selectYearRangeData = createSelector(
  selectCalculatedInventory,
  (inventory) => {
    let yearRangeEnd = new Date().getFullYear();
    let yearRangeStart = yearRangeEnd - 10;
    const defaultResult = Map({
      yearRangeStart,
      yearRangeEnd,
    });

    const yearResult = inventory.reduce((result, car) => {
      const year = parseInt(car.get('year'), 10);
      if (isNaN(year)) return result;

      return result
        .set('yearRangeStart', min([result.get('yearRangeStart'), year]))
        .set('yearRangeEnd', max([result.get('yearRangeEnd'), year]));
    }, defaultResult);

    yearRangeEnd = yearResult.get('yearRangeEnd');
    yearRangeStart = yearResult.get('yearRangeStart');
    const yearRange = yearRangeEnd - yearRangeStart;
    const yearMarks = {
      0: yearRangeStart,
      [yearRange]: yearRangeEnd,
    };
    return yearResult
      .set('yearRange', yearRange)
      .set('yearMarks', yearMarks);
  }
);

export const selectPriceRangeData = createSelector(
  selectCalculatedInventory,
  (inventory) => {
    const priceRangeStart = 0;
    let priceRangeEnd = 500;
    const defaultResult = Map({
      priceRangeStart,
      priceRangeEnd,
    });

    const priceResult = inventory.reduce((result, car) => {
      // const price = parseInt(car.get('price'), 10);
      const price = parseFloat(car.getIn(['plan', 'dailyRent'], 0)) * 30; // Note: now is monthly rate
      if (isNaN(price)) return result;

      return result.set('priceRangeEnd', max([result.get('priceRangeEnd'), price]));
    }, defaultResult);

    priceRangeEnd = priceResult.get('priceRangeEnd');
    priceRangeEnd = Math.ceil(priceRangeEnd / 100) * 100;
    const priceMarks = {
      0: priceRangeStart,
      [priceRangeEnd]: priceRangeEnd,
    };
    return priceResult
      .set('priceRangeEnd', priceRangeEnd)
      .set('priceRange', priceRangeEnd - priceRangeStart)
      .set('priceMarks', priceMarks);
  }
);

// Note: allInventory => makeOptions
export const selectMakeOptions = createSelector(
  selectAllInventory,
  (inventory) => createOptionsFor('make', inventory, '')
);
// Note:
// allInventory => filteredInventory
// allInventory => searchedInventory
// filteredInventory + searchedInventory
// => selectedInventory
// => calculatedInventory
// => makeFilteredInventory => ColorOptions
export const selectColorOptions = createSelector(
  selectMakeFilteredInventory,
  (inventory) => createOptionsFor('color', inventory, '')
);
function createOptionsFor(key, inventory, defaultKey) {
  const inventoryObject = inventory.toJS();
  const hash = {};
  const constructHash = (car) => {
    // I changed the value of the id to ensure the normal use of the function(filter color id is '').
    const carOption = car[key] ? camelCase(car[key].replace(/\s/g, '')) : defaultKey;
    const carName = car[key] || defaultKey;
    hash[carOption] = hash[carOption] || {
      id: carOption,
      name: carName,
      count: 0,
    };
    hash[carOption].count += 1;
  };
  Object.values(inventoryObject).forEach(constructHash);

  const ordered = Object.values(hash);
  const res = orderBy(ordered, ['id', 'count'], ['asc', 'desc']);
  return fromJS(res);
}

// Note:
// allInventory => filteredInventory
// allInventory => searchedInventory
// filteredInventory + searchedInventory
// => selectedInventory
// => calculatedInventory
// => currentPageInventory
export const selectCurrentPageInventory = createSelector(
  selectPage,
  selectItemCountPerPage,
  selectCalculatedInventory,
  selectTotalCount,
  (currPage, itemCount, selectedInventory, totalCount) => handleCurrentPage(currPage, itemCount, selectedInventory, totalCount),
);

function handleCurrentPage(currPage, itemCount, selectedInventory, totalCount) {
  const start = currPage * itemCount;
  const end = (currPage === (totalCount / itemCount)) ? totalCount : (start + itemCount);
  return selectedInventory.slice(start, end);
}

/*
 * color filter
 */
export const selectColorFilter = createGetSelector(
  selectInventoryRoot, 'colorFilter', Map()
);
export const selectColorFilterFilteredInventory = createSelector(
  selectColorFilter,
  selectAllInventory,
  (filter, inventory) => handleFilter(filter, inventory),
  // (filter, inventory) => handleColorFilter(filter, inventory),
);

// Note: allInventory => colorFilterColorOptions
export const selectColorFilterColorOptions = createSelector(
  selectAllInventory,
  (inventory) => createOptionsFor('color', inventory, 'other')
);
// Note: allInventory => colorFilterInventory => colorFilterMakeOptions
export const selectColorFilterMakeOptions = createSelector(
  selectColorFilterFilteredInventory,
  (inventory) => createOptionsFor('make', inventory, '')
);

export const selectColorFilterSelectedInventory = createSelector(
  selectSearch,
  selectColorFilterFilteredInventory,
  selectSearchedInventory,
  (searchKeyword, filteredIventory, searchedInventory) => handleSelectedInventory(searchKeyword, filteredIventory, searchedInventory)
);
export const selectTotalColorFilterCount = createSelector(
  selectColorFilterSelectedInventory,
  (inventory) => inventory.size
);
export const selectColorFilterCalculatedInventory = createSelector(
  selectColorFilterSelectedInventory,
  selectDate,
  selectTerm,
  (inventory, date, term) => inventory.map((car) => handleCalculatePrice(car, date, term))
);
// Note:
// allInventory => ColorFilterFilteredInventory
// allInventory => searchedInventory
// ColorFilterFilteredInventory + searchedInventory
// => ColorFilterSelectedInventory
// => ColorFilterCalculatedInventory
// => ColorFilterCurrentPageInventory
export const selectColorFilterCurrentPageInventory = createSelector(
  selectPage,
  selectItemCountPerPage,
  selectColorFilterCalculatedInventory,
  selectTotalColorFilterCount,
  (currPage, itemCount, selectedInventory, totalCount) => handleCurrentPage(currPage, itemCount, selectedInventory, totalCount),
);

/*
 * multi filter
 */
export const selectMultiFilter = createGetSelector(
  selectInventoryRoot, 'multiFilter', Map()
);
export const selectMultiFilterMake = createGetSelector(
  selectMultiFilter, 'make', List()
);
export const selectMultiFilteredMakeInventory = createSelector(
  selectMultiFilterMake,
  selectAllInventory,
  (multiFilterMakeList, inventory) => handleMultiFilter(multiFilterMakeList, inventory, 'make'),
);
function handleMultiFilter(multiFilterOptionList, inventory, key) {
  if (!multiFilterOptionList || multiFilterOptionList.size === 0) return inventory;
  const optionArray = multiFilterOptionList.toArray();
  let optionResult = fromJS({});
  const optionAll = optionArray.map((item) =>
    inventory.filter((car) => {
      const carValue = camelCase(car.get(key, '').replace(/\s/g, ''));
      return carValue === item;
    })
  );

  for (let i = 0; i < optionAll.length; i += 1) {
    optionResult = optionResult.merge(optionAll[i]);
  }
  return optionResult;
}

export const selectMultiFilterColor = createGetSelector(
  selectMultiFilter, 'color', List()
);
export const selectMultiFilteredColorInventory = createSelector(
  selectMultiFilterColor,
  selectMultiFilteredMakeInventory,
  (multiFilterColorList, inventory) => handleMultiFilter(multiFilterColorList, inventory, 'color'),
);
export const selectMultiFilterSelectedInventory = createSelector(
  selectSearch,
  selectMultiFilteredColorInventory,
  selectSearchedInventory,
  (searchKeyword, filteredIventory, searchedInventory) => handleSelectedInventory(searchKeyword, filteredIventory, searchedInventory)
);

export const selectIsLoading = createGetSelector(
  selectInventoryRoot, 'isLoading'
);
export const selectYearRange = createGetSelector(
  selectInventoryRoot, 'yearRange'
);
export const selectPriceRange = createGetSelector(
  selectInventoryRoot, 'priceRange'
);
export const selectAvailability = createGetSelector(
  selectInventoryRoot, 'availability'
);
export const selectOrderType = createGetSelector(
  selectInventoryRoot, 'orderType'
);
export const selectMultiFilterCalculatedInventory = createSelector(
  selectMultiFilterSelectedInventory,
  selectAvailability,
  selectYearRange,
  selectPassengers,
  selectDate,
  selectTerm,
  selectPriceRange,
  selectSize,
  (inventory, availability, yearRange, passengers, date, term, priceRange, size) => {
    const isAvailable = (car) => {
      if (!availability) return true;
      return car.get('availability') === availability;
    };
    const isWithInYearRange = (car) => {
      if (!yearRange.length) return true;
      const year = car.get('year');
      return year >= yearRange[0] && year <= yearRange[1];
    };
    const isWithInPriceRange = (car) => {
      if (!priceRange.length) return true;
      const price = parseFloat(car.getIn(['plan', 'dailyRent'], 0)) * 30; // Note: now is monthly rate
      return price >= priceRange[0] && price <= priceRange[1];
    };
    // const isEqualToPassengers = (car) => {
    //   if (!car.get('occupancy')) {
    //     const newCar = car.set('occupancy', 4);
    //     return Number(newCar.get('occupancy')) >= Number(passengers);
    //   }
    //   return Number(car.get('occupancy')) >= Number(passengers);
    // };
    const isEqualToSize = (car) => {
      if (size === 'all') return true;
      if (!car.get('size')) {
        const newCar = car.set('size', 'standard');
        return newCar.get('size') === size;
      }
      return camelCase(car.get('size')) === size;
    };
    const isShow = (car) => {
      const dailyRent = Number(car.getIn(['plan', 'dailyRent']));
      const yearType = typeof car.get('year');
      if (car.get('year') && dailyRent > 0 && yearType !== 'object') return true;
      return false;
    };
    return inventory
      .filter(isAvailable)
      .filter(isWithInYearRange)
      // .filter(isEqualToPassengers)
      .filter(isEqualToSize)
      .map((car) => handleCalculatePrice(car, date, term))
      .filter(isShow)
      .filter(isWithInPriceRange);
  }
);
export const selectOrderedInventory = createSelector(
  selectMultiFilterCalculatedInventory,
  selectOrderType,
  (inventory, orderType) => handleOrders(inventory, orderType)
);
function handleOrders(inventory, orderType) {
  const inventoryArray = Object.values(inventory.toJS());
  const inventoryWithPriceArray = inventoryArray.map((car) =>
    assign(car,
          zipObject(['dailyRent'], [toNumber(Object.values(pick(Object.values(pick(car, 'plan'))[0], 'dailyRent'))[0])]),
          zipObject(['needPreOrder'], [!!car.needPreOrder])
  ));
  const resultRent = lodashFilter(inventoryWithPriceArray, (o) => o.dailyRent);
  const resultYear = lodashFilter(inventoryWithPriceArray, (o) => o.year);
  let priceInventory = [];
  switch (orderType) {
    case 'none':
    // priceInventory = inventoryWithPriceArray;
      priceInventory = orderBy(inventoryWithPriceArray, ['availability', 'needPreOrder', 'id'], ['asc', 'asc', 'asc']);
      break;
    case 'NaN':
      priceInventory = lodashFilter(inventoryWithPriceArray, ['dailyRent', NaN]);
      break;
    case 'desc':
      priceInventory = orderBy(resultRent, ['dailyRent'], ['desc']);
      break;
    case 'asc':
      priceInventory = orderBy(resultRent, ['dailyRent'], ['asc']);
      break;
    case 'descYear':
      priceInventory = orderBy(resultYear, ['year'], ['desc']);
      break;
    case 'ascYear':
      priceInventory = orderBy(resultYear, ['year'], ['asc']);
      break;
    default:break;
  }
  return fromJS(priceInventory);
}
export const selectTotalMutltiFilterCount = createSelector(
  selectOrderedInventory,
  (inventory) => inventory.size
);

// Note:
// allInventory
// => MultiFilteredMakeInventory
// => MultiFilteredColorInventory
// allInventory
// => searchedInventory
// MultiFilteredColorInventory + searchedInventory
// => MultiFilterSelectedInventory
// => MultiFilterCalculatedInventory
// => OrderedInventory
// => MultiFilterCurrentPageInventory
export const selectMultiFilterCurrentPageInventory = createSelector(
  selectPage,
  selectItemCountPerPage,
  selectOrderedInventory,
  selectTotalMutltiFilterCount,
  (currPage, itemCount, selectedInventory, totalCount) => handleCurrentPage(currPage, itemCount, selectedInventory, totalCount),
);

// export const selectAllCalculatedInventory = createSelector(
//   selectAllInventory,
//   selectDate,
//   selectTerm,
//   (inventory, date, term) => inventory.map((car) => handleCalculatePrice(car, date, term))
// );

// export const selectPriceSortedInventory = createSelector(
//     selectAllCalculatedInventory,
//   createPriceSortFor.bind(this, 'desc')
//     // (inventory) => handlePriceSort(inventory, sortType)
//   );
