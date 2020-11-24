/*
 *
 * UserInfoScene constants
 *
 */
import moment from 'moment';
export const CHANGE_SEARCH = 'src/UserInfoScene/CHANGE_SEARCH';
export const CHANGE_FILTER = 'src/UserInfoScene/CHANGE_FILTER';
export const GET_CUSTOMER_INFO = 'src/UserInfoScene/GET_CUSTOMER_INFO';
export const GET_CUSTOMER_INFO_SUCCESS = 'src/UserInfoScene/GET_CUSTOMER_INFO_SUCCESS';
export const GET_CUSTOMER_INFO_FAIL = 'src/UserInfoScene/GET_CUSTOMER_INFO_FAIL';

export const FILTER_OPTIONS = [
  {
    label: 'level',
    isShowRightChildren: true,
  },
  {
    label: 'date',
    isShowRightChildren: true,
  },
  {
    label: 'search',
  },
];
export const LEVEL_OPTIONS = [
  {
    label: 'nonMembers',
  },
  {
    label: 'basic',
  },
  {
    label: 'premium',
  },
  {
    label: 'deluxe',
  },
];
export const DATE_OPTIONS = [
  {
    label: moment().format('YYYY/MM'),
    isTranslate: false,
  },
  {
    label: 'threeMonths',
  },
  {
    label: 'halfYear',
  },
  {
    label: 'fullYear',
  },
];
