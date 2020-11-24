import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

// import { selectAuthUserInfo } from 'containers/AppRouter/selectors';
export const selectApplyLoanSceneReducer = (state) => state.get('applyLoanScene', Immutable.Map());

export const selectLoanBookings = createGetSelector(
  selectApplyLoanSceneReducer, 'loanBookings', Immutable.List()
);
export const selectIsLoading = createGetSelector(
  selectApplyLoanSceneReducer, 'isLoading', true
);

export const selectLoanBooking = createSelector(
  selectLoanBookings,
  // selectAuthUserInfo,
  (loanBookings) => {
    if (loanBookings.size <= 0) return null;
    return loanBookings.get(0);
  }
);
