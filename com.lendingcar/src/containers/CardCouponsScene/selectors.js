import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

export const selectCardCouponsSceneReducer = (state) => state.get('cardCouponsScene', Immutable.Map());

export const selectIsLoading = createGetSelector(
  selectCardCouponsSceneReducer, 'isLoading', false
);
