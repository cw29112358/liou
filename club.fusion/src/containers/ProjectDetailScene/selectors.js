import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

/*
 * Direct selector to the projectDetailScene reducer
 * 直接挑选 projectDetailSceneReducer
 */
export const selectProjectDetailSceneReducer = (state) => state.get('projectDetailScene', Immutable.Map());

/*  selector parameters from projectDetailSceneReducer
 * 选择其中的特定字段
 */
export const selectIsLoading = createGetSelector(
  selectProjectDetailSceneReducer, 'isLoading', true
);
