import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

/*
 * Direct selector to the rentCarScene reducer
 * 直接挑选 rentCarSceneReducer
 */
export const selectRentCarSceneReducer = (state) => state.get('rentCarScene', Immutable.Map());

export const selectRentInfo = createGetSelector(
  selectRentCarSceneReducer, 'rentInfo', Immutable.Map()
);

export const selectRentInventory = createGetSelector(
  selectRentCarSceneReducer, 'rentInventory', Immutable.List()
);
