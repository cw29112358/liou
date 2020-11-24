/* global translate */

import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment';
import { toLower } from 'lodash';
import { numToPercent } from 'utils/helpers';
export const selectUserInfoSceneReducer = (state) => state.get('userInfoScene', Immutable.Map());
export const selectIsLoading = createGetSelector(
  selectUserInfoSceneReducer, 'isLoading', false
);
export const selectSearch = createGetSelector(
  selectUserInfoSceneReducer, 'searchKey', ''
);
export const selectFilterKey = createGetSelector(
  selectUserInfoSceneReducer, 'filterKey', ''
);
export const selectFilterSort = createGetSelector(
  selectUserInfoSceneReducer, 'filterSort', ''
);
export const selectAllCustomerInfo = createGetSelector(
  selectUserInfoSceneReducer, 'customerInfo', Immutable.List(),
);
export const selectFilterCustomerInfo = createSelector(
  selectAllCustomerInfo,
  selectSearch,
  selectFilterKey,
  selectFilterSort,
  (allCustomerInfo, searchKey, filterKey, filterSort) => {
    const sortByCustomerInfo = allCustomerInfo
      .sortBy((item) => -moment(item.get('createdDate')).unix())
      .map((item) => item
        .set('createdDate', moment(item.get('createdDate')).format('YYYY/MM/DD'))
        .set('referredDate', item.get('referredDate') ? moment(item.get('referredDate')).format('YYYY/MM/DD') : '--')
        .set('membershipSince', item.get('membershipSince') ? moment(item.get('membershipSince')).format('YYYY/MM/DD') : '--')
        .set('refId', item.get('refId') ? item.get('refId') : '--')
        .set('commissionRate', item.get('commissionRate') ? handleCommissionRate(item.get('commissionRate')) : '--')
        .set('customerCount', item.get('customerCount') ? item.get('customerCount') : '--')
        .set('email', item.get('email') ? item.get('email') : '--')
        .set('firstName', item.get('firstName') ? item.get('firstName') : translate('unKnown'))
        .set('lastName', item.get('lastName') ? item.get('lastName') : '')
        .set('membershipLevel', item.get('membershipLevel') ? item.get('membershipLevel') : 'nonMembers'));
    if ((!searchKey && !filterKey)) return sortByCustomerInfo;
    return filterSortBy(sortByCustomerInfo, searchKey, filterKey, filterSort);
  }
);
function handleCommissionRate(commissionRate) {
  return `${numToPercent(commissionRate.get('basic'))}  ${numToPercent(commissionRate.get('premium'))}  ${numToPercent(commissionRate.get('deluxe'))}`;
}
function filterSortBy(sortByCustomerInfo, searchKey, filterKey, filterSort) {
  switch (filterSort) {
    case 'level':
      return filterSortByLevel(sortByCustomerInfo, filterKey);
    case 'date':
      return filterSortByDate(sortByCustomerInfo, filterKey);
    case 'search':
      return filterSortBySearch(sortByCustomerInfo, searchKey);
    default:
      return sortByCustomerInfo;
  }
}
function filterSortByLevel(sortByCustomerInfo, filterKey) {
  return sortByCustomerInfo.filter((item) => item.get('membershipLevel') === filterKey);
}
function filterSortByDate(sortByCustomerInfo, filterKey) {
  return sortByCustomerInfo.filter((item) => {
    const createdDate = item.get('createdDate');
    const currentDate = moment();
    const currentMonthStart = moment().startOf('month');
    const lastThreeMonths = moment().subtract(3, 'months');
    const halfYear = moment().subtract(6, 'months');
    const oneYear = moment().subtract(1, 'years');
    switch (filterKey) {
      case moment().format('YYYY/MM'):
        return isBetweenDate(createdDate, currentMonthStart, currentDate);
      case 'threeMonths':
        return isBetweenDate(createdDate, lastThreeMonths, currentDate);
      case 'halfYear':
        return isBetweenDate(createdDate, halfYear, currentDate);
      case 'oneYear':
        return isBetweenDate(createdDate, oneYear, currentDate);
      default:
        return true;
    }
  });
}
function filterSortBySearch(sortByCustomerInfo, searchKey) {
  return sortByCustomerInfo.filter((item) => {
    const firstName = item.get('firstName') || 'firstName';
    const lastName = item.get('lastName') || 'lastName';
    const fullName = toLower(`${firstName} ${lastName}`);
    return fullName.indexOf(toLower(searchKey)) !== -1;
  });
}
function isBetweenDate(createdDate, prevDate, nextDate) {
  return moment(createdDate).isBetween(prevDate, nextDate);
}
