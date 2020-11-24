/* eslint no-restricted-globals: ["error", "event"] */
import {
  isEmail,
  isAlphanumeric,
  isLength,
  isMobilePhone,
  isPostalCode,
  isISO8601,
} from 'validator';
import {
  isEmpty,
  isBoolean,
  isNumber,
  mapValues,
} from 'lodash';
import vinValidator from 'vin-validator';

import { PHONE_AREA } from 'utils/constants';
import { getUserPhoneNumberArray } from 'utils/helpers';
/*
当前手机号有两种填写形式：手机号和地区（CompositeField）以及地区-手机号（InternationalPhoneField）；
电话的验证方法分为三种：
1. isPhone: 有countryCode字段的电话验证（CompositeField）： 登陆、注册、验证等；
2. isNotUserPhone： 判断是否为用户注册手机号 => 仅profile form存在
3. isInternationalPhone: 类似于 1-xxxxx 之类的都要用这个方法判断是否符合电话格式（InternationalPhoneField）；
*/

// validator
const isRequired = (value) => (
  !isEmpty(value) // covers array, object and string
  || (isNumber(value) && !isNaN(value)) // covers number
  || isBoolean(value)
);
const validators = {
  isRequired,
  isDate: isISO8601,
  isPassword: (value) => isAlphanumeric(value),
  isPasswordLongEnough: (value) => isLength(value, { min: 7, max: undefined }),
  isPasswordShortEnough: (value) => isLength(value, { min: undefined, max: 32 }),
  isRepeatPasswordSame: (value, allValues) => allValues.get('password') === value,
  isRepeatNewPasswordSame: (value, allValues) => allValues.get('newPassword') === value,
  isEmail: (value) => {
    if (!value) return true;
    return isEmail(value);
  },
  isPhone: (value, allValues) => {
    if (!value) return true;
    const countryCode = allValues.get('countryCode') || 1;

    const phoneArea = PHONE_AREA[countryCode];
    return !isNaN(value) && isMobilePhone(value.toString(), [phoneArea.area]) && isLength(value, { min: phoneArea.min, max: phoneArea.max });
  },
  isNotUserPhone: (value, allValues) => {
    if (!value) return true;
    const phoneNumber = getUserPhoneNumberArray(value)[1];
    const userPhoneNumber = allValues.get('phoneNumber');
    return userPhoneNumber !== phoneNumber;
  },
  isInternationalPhone: (value) => {
    /*
      if return true, it means this validation has passed.
      if value is required, please use isRequired func⬆️.
      It provide some unified UI for whole app when formFields isRequired.
    */
    if (!value) return true;
    const [countryCode, phoneNumber] = getUserPhoneNumberArray(value);
    if (!phoneNumber) return false;
    const phoneArea = PHONE_AREA[countryCode];
    return isMobilePhone(phoneNumber, [phoneArea.area]) && isLength(phoneNumber, { min: phoneArea.min, max: phoneArea.max });
  },
  isZipCode: (value) => !isNaN(value) && isPostalCode(value.toString(), 'US'),
  isAddress: (value) => !isEmpty(value) && /^[0-9]+ .+$/.test(value),
  isPositiveNumber: (value) => parseFloat(value) > 0,
  isNonNegative: (value) => parseFloat(value) >= 0,
  isValidYear: (value) => !(parseFloat(value) < 1900 || parseFloat(value) > 2100),
  isSSN: (value) => isLength(value.toString(), { min: 9, max: 9 }),
  isITIN: (value) => {
    const str = value.toString() || '';
    const numberFourAndFive = Number(str.substr(3, 2));

    return isLength(str, { min: 9, max: 9 })
        && str.charAt(0) === '9'
        && (numberFourAndFive >= 70 && numberFourAndFive <= 88);
  },
  isEIN: (value) => isLength(value.toString(), { min: 9, max: 9 }),
  isIDN: (value) => isLength(value.toString(), { min: 18, max: 18 }),
  isValidCardNum: (value) => {
    if (value) {
      if (value.replace(/[^\d]/g, '').length < 16) {
        return false;
      }
    }
    return true;
  },
  isValidNumber: (value) => {
    if (value) {
      const re = /^[0-9\s]+$/;
      if (!re.test(value)) {
        return false;
      }
    }
    return true;
  },
  isTaxNumber: (value) => isLength(value.toString(), { min: 18, max: 18 }),
  isVin: vinValidator.validate,
  isFileUploadError: (value) => {
    if (!value) return true;

    return value.every((item) => item.status === 'done');
  },
  isValidLetter: (value) => {
    if (value) {
      const re = /^[A-Za-z]+$/;

      if (!re.test(value)) {
        return false;
      }
    }
    return true;
  },
  isValidString: (value) => !(value && (!/^[A-Z0-9:"'();.,&*/+-\s]+$/i.test(value))),
  isTerm: (value) => value,
};

export default mapValues(validators,
  (validatorFunction, validatorName) => (value, allValues) => validatorFunction(value, allValues) ? undefined : validatorName);
