import {
  isEmail as isValidEmail,
  isAlphanumeric,
  isLength,
  isMobilePhone,
  isPostalCode,
} from 'validator';
import {
  isEmpty,
  isBoolean,
  isNumber,
  mapValues,
} from 'lodash';
import vinValidator from 'vin-validator';

const validators = {
  isRequired: (value) => (
    !isEmpty(value) || // covers array, object and string
    (isNumber(value) && !isNaN(value)) || // covers number
    isBoolean(value)
  ),
  isEmail: (value) => isEmpty(value) || isValidEmail(value),
  isPassword: (value) => isEmpty(value) || isAlphanumeric(value),
  isPasswordLongEnough: (value) => isLength(value, { min: 7, max: undefined }),
  isPasswordShortEnough: (value) => isLength(value, { min: undefined, max: 32 }),
  isRepeatPasswordSame: (value, allValues) => allValues.get('password') === value,
  isRepeatNewPasswordSame: (value, allValues) => allValues.get('newPassword') === value,
  // to support China phoneNumber, use
  // isPhone: (value) => isMobilePhone(value.toString(), 'zh-CN'),
  isPhone: (value) => isNaN(value) || isMobilePhone(value.toString(), 'en-US'),
  isZipCode: (value) => isNaN(value) || isPostalCode(value.toString(), 'US'),
  isAddress: (value) => isEmpty(value) || /^[0-9]+ .+$/.test(value),
  isPositiveNumber: (value) => !(parseFloat(value) <= 0),
  isNonNegative: (value) => !(parseFloat(value) < 0),
  isValidYear: (value) => !(parseFloat(value) < 1900 || parseFloat(value) > 2100),
  isSSN: (value) => isLength(value, { min: 9, max: 9 }),
  isVin: vinValidator.validate,
};

module.exports = mapValues(validators,
  (validatorFunction, validatorName) =>
  (value, allValues) => validatorFunction(value, allValues) ? undefined : validatorName
);
