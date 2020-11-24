/*
 *
 * BookingDetailsScene reducer
 *
 */
import { fromJS } from 'immutable';

import {
  MAKING_BOOKING,
  MAKING_BOOKING_SUCCESS,
  MAKING_BOOKING_FAIL,
} from './constants';

const initialState = fromJS({
});

function bookingDetailsSceneReducer(state = initialState, action) {
  switch (action.type) {
    case MAKING_BOOKING:
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    case MAKING_BOOKING_SUCCESS: {
      return state
        .set('done', true)
        .set('error', false)
        .set('msg', 'booking success');
    }
    case MAKING_BOOKING_FAIL:
      return state
        .set('done', true)
        .set('error', false)
        .set('msg', action.error.message);

    default:
      return state;
  }
}

export default bookingDetailsSceneReducer;
