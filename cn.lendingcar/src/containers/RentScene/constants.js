/*
 *
 * RentScene constants
 *
 */
import carImage from './assets/sedanImage.png';
export const LOAD_AREA_CONFIG = 'src/AppRouter/LOAD_AREA_CONFIG';
export const LOAD_AREA_CONFIG_SUCCESS = 'src/AppRouter/LOAD_AREA_CONFIG_SUCCESS';
export const LOAD_AREA_CONFIG_FAIL = 'src/AppRouter/LOAD_AREA_CONFIG_FAIL';

export const LOAD_LOCATION_CITY = 'src/AppRouter/LOAD_LOCATION_CITY';
export const LOAD_LOCATION_CITY_SUCCESS = 'src/AppRouter/LOAD_LOCATION_CITY_SUCCESS';
export const LOAD_LOCATION_CITY_FAIL = 'src/AppRouter/LOAD_LOCATION_CITY_FAIL';
export const SAVE_TIME_ADDRESS = 'src/RentScene/saveTimeAddress';

export const LOAD_RENTAL_INVENTORY = 'src/RentCarScene/LOAD_RENTAL_INVENTORY';
export const LOAD_RENTAL_INVENTORY_SUCCESS = 'src/RentCarScene/LOAD_RENTAL_INVENTORY_SUCCESS';
export const LOAD_RENTAL_INVENTORY_FAIL = 'src/RentCarScene/LOAD_RENTAL_INVENTORY_FAIL';

export const RENT_CONTENT = {
  title: 'rent',
  tips: 'rentTips',
  imgName: carImage,
};

export const RENT_FORM_CONTEXT = {
  pickupLocation: 'pickupLocation',
  returnLocation: 'returnLocation',
  buttonPrivilege: 'buttonPrivilege',
  pickupTimeTips: 'pickupTimeTips',
  returnTimes: 'returnTime',
  sevenDays: 'sevenDays',
  rentNow: 'rentNow',
  rentTipsDescription: 'rentTipsDescription',
  back: 'back',
  selectPlace: 'selectPlace',
  pickupTimeHeader: 'pickupTimeHeader',
  returnTimeHeader: 'returnTimeHeader',
  returnTimeHeadBottom: 'returnTimeHeadBottom',
};
