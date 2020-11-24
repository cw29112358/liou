/* global window FormData */

import DeviceInfo from 'react-native-device-info';
import { camelCase, reduce } from 'lodash';

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
  if (Array.isArray(fileBuffer)) {
    fileBuffer.forEach((value) => {
      body.append('files', value);
    });
  } else {
    body.append('files', fileBuffer);
  }
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
    identifier: user.countryCode === 86 ? user.countryCode + user.phoneNumber : user.phoneNumber,
    password: user.password,
  };
  return createStrapi('auth/local', body);
}
export function submitPhoneNumberAccountVerification(countryCode, phoneNumber) {
  const body = {
    phoneNumber: countryCode === 86 ? countryCode + phoneNumber : phoneNumber,
  };
  return createStrapi('auth/local/submitPhoneNumberAccountVerification', body);
}
export function signInByVerificationCode(user) {
  const body = {
    identifier: user.countryCode === 86 ? user.countryCode + user.phoneNumber : user.phoneNumber,
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
    phoneNumber: countryCode === 86 ? countryCode + phoneNumber : phoneNumber,
  };
  return createStrapi('auth/local/submitPhoneNumberVerification', body);
}
export function verifyPhoneNumber(countryCode, phoneNumber, verificationCode) {
  const body = {
    phoneNumber: countryCode === 86 ? countryCode + phoneNumber : phoneNumber,
    verificationCode,
  };
  return createStrapi('auth/local/verifyPhoneNumber', body);
}
export function signUp(user) {
  const body = {
    identifier: user.countryCode === 86 ? user.countryCode + user.phoneNumber : user.phoneNumber,
    verificationCode: user.verificationCode,
    password: user.password,
    refId: user.refId,
  };
  return createStrapi('auth/local/register', body);
}

export function verifyNewPhoneNumber(phoneNumber, verificationCode) {
  const body = {
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

// profile
export function getPublicProfiles() {
  const url = 'api/profiles/public';
  return getStrapi(url);
}
export function getPublicProfilesByIds(userIds) {
  const url = 'api/profiles/public';
  return createStrapi(url, {
    userIds,
  });
}

// area
export function getAllAreaConfigs() {
  return getStrapi('areaConfig.json');
}
export function getCity() {
  const url = 'api/locale/city';
  return getStrapi(url);
}

// notification
export function saveNotificationToken(token, platform) {
  const url = 'api/notificationtokens';
  return createStrapi(url, {
    deviceId: deviceID,
    token,
    platform,
  });
}
export function getNotifications() {
  const url = 'api/notifications/me';
  return getStrapi(url);
}

// invitations
export function getReceivedInvitations() {
  const url = 'api/invitations/received';
  return getStrapi(url);
}
export function changeInvitation(type, id) {
  // accept/refuse/ignore/read/hide
  const url = `api/invitations/${type}/${id}`;
  return updateStrapi(url);
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
  const url = 'api/profiles/feedbackEmail';
  return createStrapi(url, body);
}
export function loadAppVersion() {
  return getStrapi('appVersion.json');
}

// activities
export function releaseApi(formObject) {
  const url = 'api/activities';
  return createStrapi(url, formObject);
}
export function getActivitiesApi(params = {}) {
  const url = 'api/activities';
  const urlParams = reduce(params, (result, value, key) => {
    if (value) result[key] = value;// eslint-disable-line
    return result;
  }, {});
  return getStrapi(url, {
    params: urlParams, // { area, industry, user }
  });
}
export function getActivityApi(activityId) {
  const url = `api/activities/${activityId}`;
  return getStrapi(url);
}

// favourites
export function getMyFavouritesApi() {
  const url = 'api/favourites/me';
  return getStrapi(url);
}
export function updateFavouriteProjects(formObject) {
  const url = 'api/favourites';
  return createStrapi(url, formObject);
}

// connections
export function getMyConnectionsApi() {
  const url = 'api/connections/me';
  return getStrapi(url);
}
export function getRecommendConnections() {
  const url = 'api/connections/recommend';
  return getStrapi(url);
}

// membership
export function getMembershipsPoint() {
  const url = 'api/memberships/point';
  return getStrapi(url);
}
export function getMembershipsMe() {
  const url = 'api/memberships/me';
  return getStrapi(url);
}
