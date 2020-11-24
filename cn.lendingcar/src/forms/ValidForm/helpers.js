/* global translate toast */

import { Map } from 'immutable';

// event
export const promptFormErrorByFieldKey = (formSyncErrors, fieldKey) => {
  if (!formSyncErrors[fieldKey]) return false;

  const errorKey = formSyncErrors[fieldKey];
  let message = translate(errorKey);
  if (errorKey === 'isRequired') message += translate(fieldKey);
  toast(message);
  return true;
};

// error
export const getIsFormCorrect = (formSyncErrors) => Map.isMap(formSyncErrors);
export const getFirstErrorFieldKey = (formSyncErrors) => (
  getIsFormCorrect(formSyncErrors)
    ? null
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
