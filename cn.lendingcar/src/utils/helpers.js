/* global window */

import React from 'react';
import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';
import {
  Linking,
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import Immutable, { fromJS, Map } from 'immutable';
import variables from 'platform';

import DollarText from 'components/DollarText';
import {
  DEV_STRAPI_BASE,
  PROD_STRAPI_BASE,
  IMG_SERVER_URL,
} from 'configs/strapi-config';
import zh from 'translations/zh';
import auth from 'utils/auth';
import { DATE_FORMAT, DATE_FORMAT_WITHOUT_DAT } from 'utils/constants';
const {
  isPad,
} = variables;

I18n.fallbacks = true;
I18n.translations = {
  zh,
};

// common
export const nullFunction = () => null;
export const executeFunction = (callback, ...params) => {
  if (typeof callback === 'function') {
    return callback(...params);
  }

  return null;
};
export const getSubString = (str, start, length) => str ? str.substr(start, length) : '';
export function omitObjBykeyObj(obj, keyObj) {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (!keyObj[key]) filteredObj[key] = obj[key];
  });
  return filteredObj;
}

// userPhoneNumber
export const getUserPhoneNumberArray = (userPhoneNumber) => {
  const userPhoneNumberArray = userPhoneNumber.split('-');
  if (userPhoneNumberArray.length < 2) {
    // old data just only phoneNumber for China
    return [86, userPhoneNumberArray[0]];
  }
  return userPhoneNumberArray;
};

// strapi database
export function getEnvironment() {
  return __DEV__ ? 'dev' : 'prod';
}
export function isDevEnvironment() {
  return __DEV__;
}
export function getStrapiBase() {
  if (getEnvironment() === 'dev') return DEV_STRAPI_BASE;
  return PROD_STRAPI_BASE;
}
export const getErrorMessage = (error) => {
  if (!error.response) return error.message;

  const { message } = error.response.payload;
  switch (typeof message) {
    case 'string':
      return message;
    case 'object': {
      const { messages } = message[0];
      return messages[0].id;
    }
    default:
      return 'error';
  }
};

// image
const isAbsoluteURL = (url = '') => (
  !url
  || url.slice(0, 4) === 'http'
  || url.slice(0, 5) === 'data:'
);
export function getInventoryResizedImageUrl(url) {
  if (isAbsoluteURL(url)) return url;

  const mobileDimension = '640x480';
  return `${IMG_SERVER_URL}/${mobileDimension}/inventories/${url}?1`;
}
export function getImageUrl(image, dimension) {
  const url = typeof image === 'object' ? image.url : image;

  const imageServerBase = IMG_SERVER_URL.replace(/http:\/\/|https:\/\//g, '');
  const imageUrl = (url.split(imageServerBase))[1].replace(/^\/|\/$/g, ''); // remove leading and trailing '/'

  if (!dimension) return `${IMG_SERVER_URL}/${imageUrl}`;
  return `${IMG_SERVER_URL}/${dimension}/${imageUrl}`;
}

// specific
export function setIsOnline() {
  auth.set('true', 'isOnline');
}
export function clearLoginAuthKey() {
  auth.clearToken();
  auth.clear('refId');
  auth.clear('isOnline');
}
export const translate = (value, type, priceStyle, isFixed) => {
  if (type) {
    switch (type) {
      case 'number': {
        if (typeof value !== 'number') return value;

        return value.toLocaleString();
      }
      case 'dollar':
        return <DollarText value={value} priceStyle={priceStyle} isFixed={isFixed} />;
      case 'rmb':
        return <DollarText value={value} priceStyle={priceStyle} rmb isFixed={isFixed} />;
      default:
        return value;
    }
  }

  if (!value) return value;
  const label = I18n.t(`${value}`);
  if (label.indexOf('[missing') === 0) {
    console.warn(label);
    return _.startCase(value);
  }
  return label;
};
// iPad
export const getScaleSize = (normalSize) => isPad ? normalSize * 1.5 : normalSize;

export const numToPercent = (num) => (`${(Math.round(num * 10000) / 100).toFixed(2)}%`);
export const getCalculatedPrice = (price, scale = 1000) => Math.ceil((price + 0.01) / scale) * scale - 1;
export function getCalculatedString(make) {
  return (make && make.trim())
    ? make.match(/[a-z]+/ig).join('')
    : '';
}
export const objectMerge = (object, other) => _.merge({}, object, other);
export const openURLByLinking = (url, supportedErrorId = 'notSupportUrl') => {
  Linking
    .canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        window.alert(supportedErrorId);
        return;
      }

      Linking
        .openURL(url)
        .catch((err) => {
          console.warn('openURL error', err);
        });
    })
    .catch((err) => {
      console.warn('An unexpected error happened', err);
    });
};
export const getUserLogoUrl = (logo) => {
  const isMap = Map.isMap(logo);
  if (!logo || (isMap && !logo.size)) return '';
  if (isMap) return getImageUrl(logo.get('url'));

  const { url } = logo;
  return getImageUrl(url);
};
export const getUserDisplayName = (user = {}) => {
  const authUser = user || {};
  const displayName = `${authUser.lastName || ''} ${authUser.firstName || ''}`.trim();
  if (displayName) return displayName;

  return authUser.username || '';
};
export const getImmutableData = (result) => Immutable.Iterable.isIterable(result) ? result : fromJS(result);
export function getPadSize(fontSize, base = 1.5, isPadSize) {
  if (!isPad) return fontSize;

  return isPadSize ? base : fontSize * base;
}
// export const getChinaPhoneNumber = (phoneNumber) => {
//   if (phoneNumber.length === 11) return `86${phoneNumber}`;
//
//   return phoneNumber;
// };
// about date & time
export const doubleDigitize = (number) => {
  if (number < 10) { return `0${number}`; }
  return number.toString();
};
export const momentFormat = (date, formatString) => {
  let dateFormat;
  switch (formatString) {
    case 'noDay':
      dateFormat = DATE_FORMAT_WITHOUT_DAT; break;
    default:
      dateFormat = formatString || DATE_FORMAT;
  }
  const result = moment.utc(date).format(dateFormat);

  if (result === 'Invalid date') return '';
  return result;
};

export const notificationLink = (promotionUrl) => {
  if (promotionUrl.indexOf('http') !== -1) {
    const url = promotionUrl.indexOf('https') !== -1
      ? promotionUrl.replace('http:', 'https:')
      : promotionUrl;
    Actions.push('webView', { url });
  } else {
    Actions.push(promotionUrl || 'member');
  }
};
