/*
 *
 * AppointmentSuccessScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_APPOINTMENT,
  LOAD_APPOINTMENT_SUCCESS,
  LOAD_APPOINTMENT_FAIL,
} from './constants';

const initialState = getImmutableData({});

function appointmentSuccessSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APPOINTMENT:
      return state.set('isLoading', true);
    case LOAD_APPOINTMENT_SUCCESS:
      return state.set('appointment', getImmutableData(action.appointment))
        .set('isLoading', false);
    case LOAD_APPOINTMENT_FAIL:
      return state.set('isLoading', false);
    default:
      return state;
  }
}

export default appointmentSuccessSceneReducer;
