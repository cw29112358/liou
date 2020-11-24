/*
 *
 * PaymentMethodScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  PURCHASE_MEMBERSHIP,
  PURCHASE_MEMBERSHIP_SUCCESS,
  PURCHASE_MEMBERSHIP_FAIL,
} from './constants';

const initialState = fromJS({
});

function paymentMethodSceneReducer(state = initialState, action) {
  switch (action.type) {
    case PURCHASE_MEMBERSHIP: {
      return state
        .set('done', false)
        .set('error', false)
        .set('msg', '');
    }
    case PURCHASE_MEMBERSHIP_SUCCESS: {
      return state.set('done', true)
        .set('error', false)
        .set('msg', 'purchase membership success!')
        .set('purchaseResult', fromJS(action.result));
    }
    case PURCHASE_MEMBERSHIP_FAIL: {
      return state.set('done', true)
        .set('error', true)
        .set('msg', action.error.message);
    }

    default:
      return state;
  }
}
export default paymentMethodSceneReducer;
