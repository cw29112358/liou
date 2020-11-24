/* global window FormData */
/* global translate */
import DeviceInfo from 'react-native-device-info';
import { camelCase } from 'lodash';

import request from 'utils/request';
import {
  getStrapiBase,
  getErrorMessage,
} from 'utils/helpers';
// import installment from './installment';

const STRAPI_BASE = getStrapiBase();
const deviceID = DeviceInfo.getUniqueID();

export function reportFetchError(err, isAlert = true) {
  console.warn(err);
  const errorMessage = err.message !== 'Unexpected token < in JSON at position 0'
    ? getErrorMessage(err)
    : translate('parseJSONError');

  if (isAlert) window.alert('error', camelCase(errorMessage));
  return Promise.reject(err);
}
function requestWithAlert(url, options) {
  return request(url, options)
    .catch((err) => reportFetchError(err, options.isAlert));
}

// Note: endpoint is singular and all small case, endpoint can include url parameters
export function getStrapi(endpoint, headers = {}, isAlert) {
  const url = `${STRAPI_BASE}/${endpoint}`;
  return requestWithAlert(url, {
    method: 'GET',
    headers,
    isAlert,
  });
}
export function createStrapi(endpoint, body, headers = {}) {
  const url = `${STRAPI_BASE}/${endpoint}`;
  return requestWithAlert(url, {
    method: 'POST',
    headers,
    body,
  });
}
export function updateStrapi(endpoint, body, headers = {}) {
  const url = `${STRAPI_BASE}/${endpoint}`;
  return requestWithAlert(url, {
    method: 'PUT',
    headers,
    body,
  });
}
export function deleteStrapi(endpoint, headers = {}) {
  const url = `${STRAPI_BASE}/${endpoint}`;
  return requestWithAlert(url, {
    method: 'DELETE',
    headers,
  });
}

/* 1. from */
export function loadForm(path) {
  return getStrapi(path);
}
export function updateForm(formObject, path) {
  return updateStrapi(path, formObject);
}
export function setForm(formObject, path) {
  return createStrapi(path, formObject);
}
export function uploadRefFile(ref, refId, field, fileBuffer) {
  // Reference: https://strapi.io/documentation/3.x.x/guides/upload.html#examples

  // Note 1: Browser defined FormData needs a blob for file.
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append

  // Note 2: React native defined FormData needs a object: { uri }.
  // https://github.com/facebook/react-native/blob/56fef9b6225ffc1ba87f784660eebe842866c57d/Libraries/Network/FormData.js#L72

  // Note 3: React native example of fetch FormData.
  // https://github.com/facebook/react-native/blob/56fef9b6225ffc1ba87f784660eebe842866c57d/Libraries/Network/FormData.js#L34
  // https://github.com/facebook/react-native/issues/5308#issuecomment-282932755
  // https://github.com/facebook/react-native/issues/5308#issuecomment-215036161

  // Note 4: RN debugger originalFormData does not support uri.
  // https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md#limitations

  // Conclusion:
  // 1. File value uses { uri, name, type }. 2. Disable 'Debug JS Remotely'.

  const body = new FormData();
  body.append('ref', ref.toString());
  body.append('refId', refId.toString());
  body.append('field', field.toString());
  body.append('files', fileBuffer);

  const url = `${STRAPI_BASE}/upload`;
  return requestWithAlert(url, {
    method: 'POST',
    body,
    isFormData: true,
  });
}

/* 2. user */
// login
export function signIn(user) {
  const body = {
    countryCode: user.countryCode,
    identifier: user.phoneNumber,
    password: user.password,
  };
  return createStrapi('auth/local', body);
}
export function submitPhoneNumberAccountVerification(countryCode, phoneNumber) {
  const body = {
    countryCode,
    phoneNumber,
  };
  return createStrapi('auth/local/submitPhoneNumberAccountVerification', body);
}
export function signInByVerificationCode(user) {
  const body = {
    countryCode: user.countryCode,
    identifier: user.phoneNumber,
    verificationCode: user.verificationCode,
  };
  return createStrapi('auth/local', body);
}
export function logInByJwtToken() {
  return getStrapi('auth/local', {}, false);
}

// signOut
export function signOut() {
  return Promise.resolve();
}

// signup
export function submitPhoneNumberVerification(countryCode, phoneNumber) {
  const body = {
    phoneNumber,
    countryCode,
  };
  return createStrapi('auth/local/submitPhoneNumberVerification', body);
}
export function verifyPhoneNumber(countryCode, phoneNumber, verificationCode) {
  const body = {
    countryCode,
    phoneNumber,
    verificationCode,
  };
  return createStrapi('auth/local/verifyPhoneNumber', body);
}
export function signUp(user) {
  const body = {
    countryCode: user.countryCode,
    identifier: user.phoneNumber,
    verificationCode: user.verificationCode,
    password: user.password,
    refId: user.refId,
  };
  return createStrapi('auth/local/register', body);
}

// export function verifyNewPhoneNumber(phoneNumber, verificationCode) {
//   const body = {
//     phoneNumber,
//     verificationCode,
//   };
//   return createStrapi('auth/local/verifyNewPhoneNumber', body);
// }

// resetUserPassword/changeUserPassword
export function resetUserPassword(newPassword) {
  const body = {
    password: newPassword,
  };
  return createStrapi('auth/local/resetPassword', body);
}
export function changeUserPassword(oldPassword, newPassword) {
  const body = {
    oldPassword,
    newPassword,
  };
  return createStrapi('auth/local/changePassword', body);
}

/* 3. other */
export function getAllAreaConfigs() {
  return getStrapi('areaConfig.json');
}
export function getCity() {
  const url = 'api/locale/city';
  return getStrapi(url);
}
export function loadInventoryByArea(area) {
  const url = `api/car/inventory?area=${area}`;
  return getStrapi(url);
}
export function refreshInventoryByArea(area) {
  const url = `api/car/inventoryRefresh?area=${area}`;
  return getStrapi(url);
}

// installment
// const getInstallment = () => {
//   const INTEREST_RATE = 0.1;
//   const downPaymentF = (deposit, percentage) => Math.round(deposit * percentage);
//   const monthlyPaymentF = (deposit, downPayment, interestRate) => Math.round((deposit - downPayment) * interestRate / 12);
//   const prepaidF = (monthlyPayment) => monthlyPayment * 12;
//
//   const depositFinanceF = (deposit, percentage, interestRate = INTEREST_RATE) => {
//     const downPayment = downPaymentF(deposit, percentage);
//     const monthlyPayment = monthlyPaymentF(deposit, downPayment, interestRate);
//     const prepaid = prepaidF(monthlyPayment);
//     return {
//       percentage,
//       interestRate,
//       downPayment,
//       monthlyPayment,
//       prepaid,
//     };
//   };
//
//   const Installment = {
//     depositFinance: depositFinanceF,
//     downPayment: downPaymentF,
//     monthlyPayment: monthlyPaymentF,
//     prepaid: prepaidF,
//   };
//   return Installment;
// };
// export function loadInstallment() {
//   // window.Installment = eval('var add = function (a,b){ return a+b;}');
//   // console.log(window.Installment);
//
//   // window.Installment = eval(installment);
//
//   const Installment = getInstallment();
//   window.Installment = Installment;
//
//   // return fetch(`${STRAPI_BASE}/installment.js`)
//   //   .then((d) => d.text())
//   //   .then(() => {
//   //     const Installment = eval(f); // eslint-disable-line
//   //     window.Installment = Installment;
//   //   });
// }

// car
export function setCarFilterConfig(carFilterConfig) {
  const url = 'api/recommendation/save';
  return createStrapi(url, carFilterConfig);
}
export function getSingleCarByArea(carId, area) {
  const url = `api/car?area=${area}&carId=${carId}`;
  return getStrapi(url);
}
export function getSingleCar(id) {
  const url = `api/car/${id}`;
  return getStrapi(url);
}
export function getFavouriteCar() {
  const url = 'api/favourite/me';
  return getStrapi(url);
}
export function updateFavouriteCar(formObject) {
  const url = 'api/favourite';
  return createStrapi(url, formObject);
}

// booking
export function makeBookingAPI(formObject) {
  const url = 'api/booking/purchase';
  const format = (obj) => {
    const newObj = { ...obj };
    newObj.bookingFee = Number(obj.bookingFee);
    newObj.deposit = Number(obj.deposit);
    newObj.rate = Number(obj.rate);
    newObj.totalDue = Number(obj.totalDue);
    return newObj;
  };
  return createStrapi(url, format(formObject));
}
export function loadMyTripsAPI() {
  const url = 'api/booking';
  return getStrapi(url);
}

// setting
export function sendContactUsEmail(formObject) {
  const body = {
    email: formObject.email || '',
    phoneNumber: formObject.phoneNumber,
    firstName: formObject.firstName || '',
    message: formObject.message,
    source: deviceID,
  };
  const url = 'api/profile/feedbackEmail';
  return createStrapi(url, body);
}
export function loadAppVersion() {
  return getStrapi('appVersion.json');
}

// notification
export function saveNotificationToken(token, platform) {
  const url = 'api/notificationtoken';
  return createStrapi(url, {
    deviceId: deviceID,
    token,
    platform,
  });
}
export function getNotifications() {
  const url = 'api/notification/me';
  return getStrapi(url);
}
export function setNotificationsReadAll() {
  const url = 'api/notification/readAll';
  return createStrapi(url);
}

// agent
export function getAgentPerformance() {
  const url = 'api/agent/performance';
  return getStrapi(url);
}
export function getAgentProfit() {
  const url = 'api/agent/profit';
  return getStrapi(url);
}
export function getAgentCustomer() {
  const url = 'api/agent/customer';
  return getStrapi(url);
}
// membership
export function getMembershipPrice() {
  const url = 'api/membership/price';
  return getStrapi(url);
}
export function getMembershipStatus() {
  const url = 'api/membership/me';
  return getStrapi(url);
}
export function purchaseMembership(formObject) {
  const url = 'api/membership';
  return createStrapi(url, formObject);
}
export function getMembershipAppointment(appointmentId) {
  const url = `api/appointment/${appointmentId}`;
  return getStrapi(url);
}
// export function getUserBenefit() {
//   const url = 'api/benefit/me';
//   return getStrapi(url);
// }
export function getUserAppointment() {
  const url = 'api/appointment/me';
  return getStrapi(url);
}
export function getBenefits() {
  const url = 'benefits.json';
  return getStrapi(url);
}

export function getApplyLoan() {
  const url = 'api/loan/me';
  return getStrapi(url);
}

// 消费者相关
export function getMyCardsApi() {
  const url = 'api/cards/me';
  return getStrapi(url);
}
export function getMyCouponsApi() {
  const url = 'api/coupons/me';
  return getStrapi(url);
}
export function chargeCardApi(body) {
  const url = 'api/cardCharges';
  return createStrapi(url, body);
}
export function updateCouponsApi(couponsId) {
  const url = `api/coupons/use/${couponsId}`;
  return updateStrapi(url);
}
