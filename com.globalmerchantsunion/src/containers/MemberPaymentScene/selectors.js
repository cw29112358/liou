import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

export const selectMemberPaymentSceneReducer = (state) => state.get('memberPaymentScene', Immutable.Map());

export const selectLoading = createGetSelector(
  selectMemberPaymentSceneReducer, 'isLoading', false,
);
export const selectMemberShipPrice = createGetSelector(
  selectMemberPaymentSceneReducer, 'membershipPrice', Immutable.Map(),
);
