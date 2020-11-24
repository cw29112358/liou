/*
 *
 * AboutUs reducer
 *
 */

import { fromJS } from 'immutable';
// import { USER_LOGOUT_SUCCESS } from 'common/authUser/constants';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({});

function aboutUsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default aboutUsReducer;
