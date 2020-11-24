/*
 *
 * MemberPaymentScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  RentPayment,
  RentPaymentSUCCESS,
  RentPaymentFAIL,
} from './constants';

const initialState = fromJS({
});

function RentPaymentOrderSceneReducer(state = initialState, action) {
  switch (action.type) {
    case RentPayment: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case RentPaymentSUCCESS: {
      return state.set('done', true)
        .set('error', false)
        .set('msg', 'rent payment order success!');
    }
    case RentPaymentFAIL: {
      return state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
    }

    default:
      return state;
  }
}

export default RentPaymentOrderSceneReducer;
