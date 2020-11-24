/* global window FormData */

import DeviceInfo from 'react-native-device-info';
import { camelCase } from 'lodash';

import request from 'utils/request';
import {
  isDevEnvironment,
  getStrapiBase,
  getErrorMessage,
} from 'utils/helpers';

const STRAPI_BASE = getStrapiBase();
const deviceID = DeviceInfo.getUniqueID();
const isDev = isDevEnvironment();

export function reportFetchError(err, url, options) {
  const { isAlert = true, method } = options;

  // 打印
  let api = url;
  if (url.includes(STRAPI_BASE)) {
    const qIndex = url.indexOf('?');
    api = url.substring(STRAPI_BASE.length + 1, qIndex > 0 ? qIndex : undefined);
  }

  // 弹框
  if (isAlert) {
    const errorType = isDev ? `${api} ${method}` : 'error';
    let errorMessage = err.message;
    if (errorMessage.match(/Unexpected token < in JSON at position 0/i)) {
      errorMessage = 'parseJSONError';
    } else if (errorMessage.match(/json parse/i)) {
      errorMessage = 'jsonParse';
    } else {
      errorMessage = getErrorMessage(err);
    }
    window.alert(errorType, camelCase(errorMessage), undefined, { titleTranslate: !isDev });
  }

  // 返回
  return Promise.reject(err);
}
function requestWithAlert(url, options) {
  return request(url, options)
    .catch((err) => reportFetchError(err, url, options));
}

// Note: endpoint is singular and all small case, endpoint can include url parameters
export function getStrapi(endpoint, options) {
  const url = `${STRAPI_BASE}/${endpoint}`;
  return requestWithAlert(url, {
    method: 'GET',
    ...options,
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
  return getStrapi('auth/local', { isAlert: false });
}

// signOut
export function signOut() {
  return Promise.resolve();
}

// signup
export function submitPhoneNumberVerification(countryCode, phoneNumber) {
  const body = {
    countryCode,
    phoneNumber,
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

export function verifyNewPhoneNumber(countryCode, phoneNumber, verificationCode) {
  const body = {
    countryCode,
    phoneNumber,
    verificationCode,
  };
  return createStrapi('auth/local/verifyNewPhoneNumber', body);
}

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
export function loadRentalInventoryByArea(areaResult) {
  const { area, pickupTime, returnTime } = areaResult;
  const url = `api/car/rentalInventory?area=${area}&pickupTime=${pickupTime}&returnTime=${returnTime}`;
  return getStrapi(url);
}
export function refreshInventoryByArea(area) {
  const url = `api/car/inventoryRefresh?area=${area}`;
  return getStrapi(url);
}

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
export function makeRentBookingAPI(formObject) {
  const url = 'api/booking';
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
  const url = 'api/membership/purchase';
  return createStrapi(url, formObject);
}
export function confirmAlipay(result) {
  const url = 'api/alipay/confirm';
  return createStrapi(url, result);
}
