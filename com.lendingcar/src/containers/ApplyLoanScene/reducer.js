/*
 *
 * ApplyLoanScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';
import { USER_LOGOUT_SUCCESS } from 'containers/AppRouter/constants';

import {
  LOAD_LOAN_BOOKIBNGS,
  LOAD_LOAN_BOOKIBNGS_SUCCESS,
  LOAD_LOAN_BOOKIBNGS_FAIL,
} from './constants';

const initialState = getImmutableData({});

function applyLoanSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOAN_BOOKIBNGS:
      return state.set('isLoading', true);
    case LOAD_LOAN_BOOKIBNGS_SUCCESS:
      return state.set('isLoading', false)
        .set('loanBookings', getImmutableData(action.loanBookings));
    case LOAD_LOAN_BOOKIBNGS_FAIL:
      return state.set('isLoading', false);

    case USER_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default applyLoanSceneReducer;
