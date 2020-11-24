/*
 *
 * AppointmentSuccessScene actions
 *
 */

import {
  LOAD_APPOINTMENT,
  LOAD_APPOINTMENT_SUCCESS,
  LOAD_APPOINTMENT_FAIL,
} from './constants';

export function loadAppointmentAction(appointmentId) {
  return {
    type: LOAD_APPOINTMENT,
    appointmentId,
  };
}
export function loadAppointmentSuccessAction(appointment) {
  return {
    type: LOAD_APPOINTMENT_SUCCESS,
    appointment,
  };
}
export function loadAppointmentFailAction(error) {
  return {
    type: LOAD_APPOINTMENT_FAIL,
    error,
  };
}
