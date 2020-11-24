import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectHomePageRoot = (state) => state.get('homePage') || Immutable.Map();

export const selectAllInventory = createGetSelector(
  selectHomePageRoot, 'inventories', Immutable.Map()
);
