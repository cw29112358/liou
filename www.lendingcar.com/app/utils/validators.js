import moment from 'moment';

export const isRequired = (value) => value ? undefined : 'Required';

export const isValidEmail = (value) => value && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ?
  'Invalid email address' : undefined;

export const isValidPassword = (value) => {
  if (value !== '') {
    if (value.length < 6) {
      return 'Error: Password must contain at least six characters!';
    }
    let re = /[0-9]/;
    if (!re.test(value)) {
      return 'Error: password must contain at least one number (0-9)!';
    }
    re = /[a-z]/;
    if (!re.test(value)) {
      return 'Error: password must contain at least one lowercase letter (a-z)!';
    }
    // re = /[A-Z]/;
    // if (!re.test(value)) {
    //   return 'Error: password must contain at least one uppercase letter (A-Z)!';
    // }
    return undefined;
  }
  return "Error: Please check that you've entered and confirmed your password!";
};

export const isValidCardExp = (value) => {
  const re = /^\d{2}\/(\d{2}|\d{4})$/;
  if (!re.test(value.replace(/ /g, ''))) {
    return 'Invalid Exp. Date';
  }
  return undefined;
};

export const isValidYear = (value) => (parseFloat(value) < 1900 || parseFloat(value) > 2100) ? 'Invalid year' : undefined;

export const isValidString = (value) => value && (!/^[A-Z0-9:"'();.,&*/+-\s]+$/i.test(value)) ? 'Invalid characters' : undefined;

export const isValidLetter = (value) => {
  if (value) {
    const re = /^[A-Za-z]+$/;
    if (!re.test(value)) {
      return 'Invalid characters';
    }
  }
  return undefined;
};

export const isValidNumber = (value) => {
  if (value) {
    const re = /^[0-9\s]+$/;
    if (!re.test(value)) {
      return 'Invalid number';
    }
  }
  return undefined;
};

export const isValidPhoneNumber = (value) => {
  if (value) {
    const re = /^[A-Z0-9()*#-+]+$/;
    if (!re.test(value)) {
      return 'Invalid phone number';
    }
  }
  return undefined;
};

export const isValidName = (value) => {
  if (value) {
    const re = /^[A-Za-z-.,\s]+$/;
    if (!re.test(value)) {
      return 'Invalid name';
    }
  }
  return undefined;
};

export const isValidCardNum = (value) => {
  // console.log('isValidCardNum', value);
  if (value) {
    if (value.replace(/[^\d]/g, '').length < 16) {
      return 'Card number is too short';
    }
  }
  return undefined;
};


export const isPositiveNumber = (value) => (parseFloat(value) < 0) ? 'Invalid positive number' : undefined;

export const lengthNotEqual = (len, error) => (value) => value && value.length !== len ? error : undefined;// eslint-disable-line no-unused-vars

export const lengthLargerThan = (len, error) => (value) => value && value.length > len ? error : undefined;

export const lengthSmallerThan = (len, error) => (value) => value && value.length < len ? error : undefined;

export const isValidZipCodeLen = lengthSmallerThan(5, 'Invalid zip code');

export const isValidPhoneNumberLen = lengthSmallerThan(10, 'Phone number is too short');

export const isValidSSNLen = lengthSmallerThan(9, 'Invalid SSN');

export const isValidNameLen = lengthLargerThan(40, 'Maximum length(40) exceeded');

export const isValidAddressLen = lengthLargerThan(80, 'Maximum length(80) exceeded');

export const isValidOccupancyLen = (value) => (parseFloat(value) < 1 ? 'Invalid occupancy number' : undefined) || (parseFloat(value) > 9 ? 'Exceed maximum occupancy' : undefined);

export const isValidDoorLen = (value) => (parseFloat(value) < 1 ? 'Invalid door number' : undefined) || (parseFloat(value) > 9 ? 'Exceed maximum doors' : undefined);

export const isValidReferralCodeLen = lengthLargerThan(16, 'Maximum length exceeded');

export const isAdult = (date) => moment(new Date(date)).add(21, 'years').isSameOrAfter(moment(new Date())) ? 'You must be at least 21 years old' : undefined;
