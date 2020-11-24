/*
 *
 * BookingPage actions
 *
 */

import {
  CREATE_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAIL,
  SAVE_FORM,
  SAVE_FORM_ELEMENT,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  CHARGE,
  CHARGE_SUCCESS,
  CHARGE_FAIL,
  MAKING_BOOKING,
  MAKING_BOOKING_SUCCESS,
  MAKING_BOOKING_FAIL,
} from './constants';

export function createFormAction(id) {
  return {
    type: CREATE_FORM,
    id,
  };
}

export function submitFormAction(formObject) {
  return {
    type: SUBMIT_FORM,
    formObject,
  };
}

export function submitFormSuccessAction(formObject) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    formObject,
  };
}

export function submitFormFailAction(error) {
  return {
    type: SUBMIT_FORM_FAIL,
    error,
  };
}

export function saveFormAction(formObject) {
  return {
    type: SAVE_FORM,
    formObject,
  };
}

export function saveFormElementAction(element) {
  return {
    type: SAVE_FORM_ELEMENT,
    element,
  };
}

export function sendEmailAction(formObject) {
  return {
    type: SEND_EMAIL,
    formObject,
  };
}

export function sendEmailSuccessAction(formObject) {
  return {
    type: SEND_EMAIL_SUCCESS,
    formObject,
  };
}

export function sendEmailFailAction(error) {
  return {
    type: SEND_EMAIL_FAIL,
    error,
  };
}

export function chargeAction(formObject) {
  return {
    type: CHARGE,
    formObject,
  };
}

export function chargeSuccessAction(formObject) {
  return {
    type: CHARGE_SUCCESS,
    formObject,
  };
}

export function chargeFailAction(error) {
  return {
    type: CHARGE_FAIL,
    error,
  };
}

export function makeBookingAction(formObject) {
  return {
    type: MAKING_BOOKING,
    formObject,
  };
}

export function makeBookingSuccessAction(formObject) {
  return {
    type: MAKING_BOOKING_SUCCESS,
    formObject,
  };
}

export function makeBookingFailAction(error) {
  return {
    type: MAKING_BOOKING_FAIL,
    error,
  };
}
