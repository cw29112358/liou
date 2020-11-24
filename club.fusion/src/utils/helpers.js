/* global window */

import React from 'react';
import I18n from 'react-native-i18n';
import {
  Linking,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import JMessage from 'jmessage-react-plugin';
import Immutable, { fromJS, Map } from 'immutable';
import variables from 'platform';
import moment from 'moment';

import DollarText from 'components/DollarText';
import {
  DEV_STRAPI_BASE,
  PROD_STRAPI_BASE,
  IMG_SERVER_URL,
} from 'configs/strapi-config';
import en from 'translations/en';
import zh from 'translations/zh';
import auth from 'utils/auth';
const {
  isPad,
} = variables;

I18n.fallbacks = true;
I18n.translations = {
  en,
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

// strapi database
export function getEnvironment() {
  return __DEV__ ? 'dev' : 'prod';
}
export function isDevEnvironment() {
  return __DEV__;
}
export function getStrapiBase() {
  if (__DEV__) return DEV_STRAPI_BASE;
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
  if (!image) return '';
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
  const { verifiedName = '', phoneNumber } = user || {};
  const displayName = verifiedName.trim();
  if (displayName) return displayName;

  const { length } = phoneNumber || '';
  if (!length) return '';
  const start = phoneNumber.substring(0, 3);
  const end = phoneNumber.substring(length - 4, length);
  return start + '*'.repeat(length - 7) + end;
};
export const getImmutableData = (result) => Immutable.Iterable.isIterable(result) ? result : fromJS(result);
export const getPadSize = (fontSize) => isPad ? fontSize * 1.5 : fontSize;

// 公共profile
export function getProfile(profiles, item, key = 'user') {
  const user = item.get(key);
  const profile = profiles.has(user) ? profiles.get(user) : Immutable.Map();
  return profile.merge(item.get('profile'));
}
// isFriend
export function getIsFriend(userIds, item) {
  const user = item.get('user');
  return userIds.includes(user);
}
// 是否收藏
export function getIsFavourite(favouritesIds, item) {
  const id = item.get('id');
  return favouritesIds.includes(id);
}
// 排序
export function getSortListFuc(sortKey = 'updatedAt') {
  return (item) => {
    const value = item.get(sortKey);
    const unix = moment(value).unix();
    return -unix;
  };
}
export function getSortList(list, key) {
  const sortFunc = getSortListFuc(key);
  return list.sortBy(sortFunc);
}

// about date & time
export const doubleDigitize = (number) => {
  if (number < 10) { return `0${number}`; }
  return number.toString();
};

export const notificationLink = (promotionUrl) => {
  if (promotionUrl.indexOf('http') !== -1) {
    const url = promotionUrl.indexOf('http:') !== -1
      ? promotionUrl.replace('http:', 'https:')
      : promotionUrl;
    Actions.push('webView', { url });
  } else {
    const routeParams = promotionUrl.split('/');
    const sceneKey = routeParams[0];
    if (sceneKey) Actions.push(sceneKey, { messageId: routeParams[1] });
  }
};

export const loginJMessage = (loginInfo, onLoginSuccessCallBack = nullFunction) => {
  JMessage.login(loginInfo, () => {
    console.log('登录成功');
    onLoginSuccessCallBack();
  }, (err) => {
    const { code } = err;
    if (code === 801003) {
      JMessage.register(loginInfo, () => {
        console.log('注册成功');
        loginJMessage(loginInfo);
      }, (error) => {
        console.log(error);
      });
    }
  });
};

export const getScaleSize = (normalSize) => isPad ? normalSize * 1.5 : normalSize;
