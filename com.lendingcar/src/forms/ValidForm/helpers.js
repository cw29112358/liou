/* global translate toast */

import { Map } from 'immutable';
import isArray from 'lodash/isArray';

// event
export const promptFormErrorByFieldKey = (formSyncErrors, fieldKey) => {
  if (!formSyncErrors[fieldKey]) return false;
  let errorKey = formSyncErrors[fieldKey];
  let currentFieldKey = fieldKey;
  if (isArray(formSyncErrors[fieldKey])) {
    const currentErrorKey = formSyncErrors[fieldKey].filter((item) => !!item);
    errorKey = Object.values(currentErrorKey[0])[0]; // eslint-disable-line
    currentFieldKey = Object.keys(currentErrorKey[0])[0]; // eslint-disable-line
  }
  let message = translate(errorKey);
  if (errorKey === 'isRequired') message += translate(currentFieldKey);
  toast(message);
  return true;
};

// error
export const getIsFormCorrect = (formSyncErrors) => Map.isMap(formSyncErrors);
export const getFirstErrorFieldKey = (formSyncErrors) => (
  getIsFormCorrect(formSyncErrors)
    ? ''
    : Object.keys(formSyncErrors)[0]
);
export const getErrorKeys = (formSyncErrors) => (
  getIsFormCorrect(formSyncErrors)
    ? {}
    : formSyncErrors
);

// return func
export const getFormHandleSubmit = (formSyncErrors, handleSubmit, focusEvent) => {
  if (!getIsFormCorrect(formSyncErrors)) {
    return makePromptFormError(formSyncErrors, focusEvent);
  }

  return () => {
    focusEvent();
    handleSubmit();
  };
};
const makePromptFormError = (formSyncErrors, focusEvent) => () => {
  const firstErrorFieldKey = getFirstErrorFieldKey(formSyncErrors);
  focusEvent();
  promptFormErrorByFieldKey(formSyncErrors, firstErrorFieldKey);
};
