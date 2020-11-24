import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

/*
 * Direct selector to the appointmentSuccessScene reducer
 * 直接挑选 appointmentSuccessSceneReducer
 */
export const selectAppointmentSuccessSceneReducer = (state) => state.get('appointmentSuccessScene', Immutable.Map());

/*  selector parameters from appointmentSuccessSceneReducer
 * 选择其中的特定字段
 */
export const selectAppointment = createGetSelector(
  selectAppointmentSuccessSceneReducer, 'appointment', Immutable.Map()
);
export const selectIsLoading = createGetSelector(
  selectAppointmentSuccessSceneReducer, 'isLoading', false
);
