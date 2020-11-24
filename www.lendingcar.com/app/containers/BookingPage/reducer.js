/*
 *
 * BookingPage reducer
 *
 */

import Immutable, { fromJS } from 'immutable';
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

const initialState = fromJS({
  isSubmitSuccess: false,
  done: true,
  bookingForm: {
    currentBookingId: '',
  },
});

function bookingPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_FORM:
      return state.set('done', false)
                  .set('isSubmitSuccess', false)
                  .set('error', '');
    case SUBMIT_FORM_SUCCESS: {
      return state.set('done', true)
                  .set('isSubmitSuccess', true)
                  .set('error', '')
                  .setIn(['bookingForm', state.getIn(['bookingForm', 'currentBookingId'])], fromJS(action.formObject));
    }
    case SUBMIT_FORM_FAIL:
      return state.set('done', true)
                  .set('isSubmitSuccess', false)
                  .set('error', action.error);
    case CREATE_FORM: {
      const bookingId = action.id;
      return state.setIn(['bookingForm', bookingId], fromJS({ bookingId }))
                  .setIn(['bookingForm', 'currentBookingId'], bookingId);
    }
    case SAVE_FORM: {
      const bookingId = state.getIn(['bookingForm', 'currentBookingId'], action.formObject.bookingId);
      const original = state.getIn(['bookingForm', bookingId], Immutable.Map());
      return state.set('done', true)
                  .set('error', '')
                  .setIn(['bookingForm', bookingId], original.merge(fromJS(action.formObject)));
    }
    case SAVE_FORM_ELEMENT: {
      const bookingId = state.getIn(['bookingForm', 'currentBookingId']);
      const original = state.getIn(['bookingForm', bookingId], Immutable.Map());
      return state.set('done', true)
                  .set('error', '')
                  .setIn(['bookingForm', action.element.key], original.merge(fromJS(action.element.value)));
    }
    case SEND_EMAIL:
      return state.set('done', false)
                  .set('error', '');
    case SEND_EMAIL_SUCCESS:
      return state.set('done', true)
                  .set('error', '');
    case SEND_EMAIL_FAIL:
      return state.set('done', true)
                  .set('error', action.error);

    case CHARGE:
      return state.set('done', false)
                  .set('error', '');
    case CHARGE_SUCCESS: {
      return state.set('done', true)
                  .set('error', '');
    }
    case CHARGE_FAIL:
      return state.set('done', true)
                  .set('error', action.error);
    case MAKING_BOOKING:
      return state.set('done', false)
                  .set('isSubmitSuccess', false)
                  .set('error', '');
    case MAKING_BOOKING_SUCCESS: {
      return state.set('done', true)
                  .set('isSubmitSuccess', true)
                  .set('error', '')
                  .setIn(['bookingForm', state.getIn(['bookingForm', 'currentBookingId'])], fromJS(action.formObject));
    }
    case MAKING_BOOKING_FAIL:
      return state.set('done', true)
                  .set('isSubmitSuccess', false)
                  .set('error', action.error.message);
    default:
      return state;
  }
}

export default bookingPageReducer;
