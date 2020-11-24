import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectRentSceneReducer = (state) => state.get('rentScene', Immutable.Map());

// areaConfig
export const selectLocationCity = createGetSelector(
  selectRentSceneReducer, 'locationCity', Immutable.Map()
);

export const selectRentInfo = createGetSelector(
  selectRentSceneReducer, 'rentInfo', Immutable.Map()
);

export const selectRentInventory = createGetSelector(
  selectRentSceneReducer, 'rentInventory', Immutable.List()
);
