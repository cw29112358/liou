import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectMyHomeSceneReducer = (state) => state.get('myHomeScene', Immutable.Map());
export const selectPoints = createGetSelector(
  selectMyHomeSceneReducer, 'points', Immutable.Map(),
);
export const selectPointsLoading = createGetSelector(
  selectMyHomeSceneReducer, 'pointsLoading', false,
);
