/*
 *
 * BookingDetailsScene actions
 *
 */

import {
  MAKING_BOOKING,
  MAKING_BOOKING_SUCCESS,
  MAKING_BOOKING_FAIL,
} from './constants';

export function makeBookingAction(formObject, onSuccess) {
  return {
    type: MAKING_BOOKING,
    formObject,
    onSuccess,
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
