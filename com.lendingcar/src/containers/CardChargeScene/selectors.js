import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';
export const selectCardChargeSceneReducer = (state) => state.get('cardChargeScene', Immutable.Map());

export const selectIsLoading = createGetSelector(
  selectCardChargeSceneReducer, 'isLoading', false
);
