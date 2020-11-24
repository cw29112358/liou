/*
 *
 * MemberScene actions
 *
 */

import {
  LOAD_BENEFITS,
  LOAD_BENEFITS_SUCCESS,
  LOAD_BENEFITS_FAIL,

  LOAD_USER_APPOINTMENT,
  LOAD_USER_APPOINTMENT_SUCCESS,
  LOAD_USER_APPOINTMENT_FAIL,
} from './constants';

export function loadBenefitsAction() {
  return {
    type: LOAD_BENEFITS,
  };
}
export function loadBenefitsSuccessAction(benefitsData) {
  return {
    type: LOAD_BENEFITS_SUCCESS,
    benefitsData,
  };
}
export function loadBenefitsFailAction() {
  return {
    type: LOAD_BENEFITS_FAIL,
  };
}

export function loadUserAppointmentAction() {
  return {
    type: LOAD_USER_APPOINTMENT,
  };
}
export function loadUserAppointmentSuccessAction(appointments) {
  return {
    type: LOAD_USER_APPOINTMENT_SUCCESS,
    appointments,
  };
}
export function loadUserAppointmentFailAction() {
  return {
    type: LOAD_USER_APPOINTMENT_FAIL,
  };
}
