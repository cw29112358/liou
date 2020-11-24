/*
 *
 * InventoryPage actions
 *
 */

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

export function loadPackageAction(packageId) {
  return {
    type: LOAD_PACKAGE,
    packageId,
  };
}
export function loadPackageSuccessAction(carPackage) {
  return {
    type: LOAD_PACKAGE_SUCCESS,
    carPackage,
  };
}
export function loadPackageFailAction(error) {
  return {
    type: LOAD_PACKAGE_FAIL,
    error,
  };
}

export function changeFilterAction(filter) {
  return {
    type: CHANGE_FILTER,
    filter,
  };
}
export function changeConfigAction(config) {
  return {
    type: CHANGE_CONFIG,
    config,
  };
}
export function changePageAction(pageNumber) {
  return {
    type: CHANGE_PAGE,
    pageNumber,
  };
}
export function changeSearchAction(keyword) {
  return {
    type: CHANGE_SEARCH,
    keyword,
  };
}

export function changeColorFilterAction(colorFilter) {
  return {
    type: CHANGE_COLOR_FILTER,
    colorFilter,
  };
}
export function changeMultiColorFilterAction(multiFilterColor) {
  return {
    type: CHANGE_MULTICOLOR_FILTER,
    multiFilterColor,
  };
}
export function changeMultiMakeFilterAction(multiFilterMake) {
  return {
    type: CHANGE_MULTIMAKE_FILTER,
    multiFilterMake,
  };
}
export function changeOrderAction(orderType) {
  return {
    type: CHANGE_ORDER,
    orderType,
  };
}
export function changeAvailabilityAction(availability) {
  return {
    type: CHANGE_AVAILABILITY,
    availability,
  };
}
export function changeYearRangeAction(yearRange) {
  return {
    type: CHANGE_YEARRANGE,
    yearRange,
  };
}
export function changePriceRangeAction(priceRange) {
  return {
    type: CHANGE_PRICERANGE,
    priceRange,
  };
}
