/*
*
* BookingPage constants
*
*/
export const CREATE_FORM = 'app/BookingPage/CREATE_FORM';

export const SUBMIT_FORM = 'app/BookingPage/SUBMIT_FORM';
export const SUBMIT_FORM_SUCCESS = 'app/BookingPage/SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_FAIL = 'app/BookingPage/SUBMIT_FORM_FAIL';

export const SAVE_FORM = 'app/BookingPage/SAVE_FORM';
export const SAVE_FORM_ELEMENT = 'app/BookingPage/SAVE_FORM_ELEMENT';

export const SEND_EMAIL = 'app/BookingPage/SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'app/BookingPage/SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAIL = 'app/BookingPage/SEND_EMAIL_FAIL';

export const CHARGE = 'app/BookingPage/CHARGE';
export const CHARGE_SUCCESS = 'app/BookingPage/CHARGE_SUCCESS';
export const CHARGE_FAIL = 'app/BookingPage/CHARGE_FAIL';

export const MAKING_BOOKING = 'app/BookingPage/MAKING_BOOKING';
export const MAKING_BOOKING_SUCCESS = 'app/BookingPage/MAKING_BOOKING_SUCCESS';
export const MAKING_BOOKING_FAIL = 'app/BookingPage/MAKING_BOOKING_FAIL';

export const BOOKING_DEBUG_DATA = {
  driverLicenseType: 'United States',
  driverLicenseNum: 'dl123sk1j4',
  driverLicenseState: 'ca',

  paymentCardNum: '4242424242424242',
  paymentCardType: 'Visa',
  paymentExp: '11/21',
  paymentCvv: '212',
  paymentName: 'test script',
  paymentAddress1: '3350 Scott Blvd',
  paymentAddress2: '',
  paymentCity: 'Santa Clara',
  paymentState: 'CA',
  paymentZip: '95054',
  paymentCountry: 'unitedStates',
};

export const LEASINGUSERKEYS = [
  'uid',
  'firstName',
  'lastName',
  'birthday',
  'phoneNumber',
  'email',
  'address',
  'city',
  'zipCode',
  'driverLicenseType',
  'driverLicenseNum',
  'driverLicenseState',
];

// const d = new Date();
// const initDob = `${d.getFullYear() - 21}-${(`0${d.getMonth() + 1}`).slice(-2)}-${(`0${d.getDate()}`).slice(-2)}`;
