/*
 *
 * RentCarScene constants
 *
 */
import emptyImg from './assets/empty.png';
import vImg from './assets/v2x.png';
import carDefault from './assets/car_default.png';
import dealerDefault from './assets/dealer_default.png';

export const LOAD_AREA_CONFIG = 'src/AppRouter/LOAD_AREA_CONFIG';
export const LOAD_AREA_CONFIG_SUCCESS = 'src/AppRouter/LOAD_AREA_CONFIG_SUCCESS';
export const LOAD_AREA_CONFIG_FAIL = 'src/AppRouter/LOAD_AREA_CONFIG_FAIL';

export const LOAD_LOCATION_CITY = 'src/AppRouter/LOAD_LOCATION_CITY';
export const LOAD_LOCATION_CITY_SUCCESS = 'src/AppRouter/LOAD_LOCATION_CITY_SUCCESS';
export const LOAD_LOCATION_CITY_FAIL = 'src/AppRouter/LOAD_LOCATION_CITY_FAIL';

export const LOAD_RENTAL_INVENTORY = 'src/RentCarScene/LOAD_RENTAL_INVENTORY';
export const LOAD_RENTAL_INVENTORY_SUCCESS = 'src/RentCarScene/LOAD_RENTAL_INVENTORY_SUCCESS';
export const LOAD_RENTAL_INVENTORY_FAIL = 'src/RentCarScene/LOAD_RENTAL_INVENTORY_FAIL';


export const RENT_FORM_CONTEXT = {
  pickupLocation: 'pickupLocation',
  returnLocation: 'returnLocation',
  buttonPrivilege: 'buttonPrivilege',
  pickupTimeTips: 'pickupTimeTips',
  returnTimes: 'returnTime',
  sevenDays: 'sevenDays',
  rentNow: 'rentNow',
  rentTipsDescription: 'rentTipsDescription',
  empty: emptyImg,
  vImg,
  back: 'back',
  selectPlace: 'selectPlace',
  pickupTimeHeader: 'pickupTimeHeader',
  returnTimeHeader: 'returnTimeHeader',
  sorryToEmpty: 'sorryToEmpty',
  returnTimeHeadBottom: 'returnTimeHeadBottom',
  cancel: 'cancel',
  confirm: 'confirm',
};

export const CAR_RENT_CONTEXT = {
  carRentRate: 'carRentRate',
  carRentTitle: 'carRentTitle',
  tips1: 'carRentTips1',
  tips2: 'carRentTips2',
  bookNow: 'bookNow',
  oldPrice: 'oldPrice',
  membersPrice: 'membersPrice',
  carDefault,
  dealerDefault,
};

export const MEMBER_MODAL_CONTEXT = {
  youAre: 'youAre',
  noMember: 'noMember',
  noMemberPrice: 'noMemberPrice',
  memberForMore: 'memberForMore',
  richForBooking: 'richForBooking',
  buttonPrivilege: 'buttonPrivilege',
};
