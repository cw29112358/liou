import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

/*
 * Direct selector to the leaseTypeScene reducer
 * 直接挑选 leaseTypeSceneReducer
 */
export const selectLeaseTypeSceneReducer = (state) => state.get('leaseTypeScene', Immutable.Map());

/*  selector parameters from leaseTypeSceneReducer
 * 选择其中的特定字段
 */
export const selectTest = createGetSelector(
  selectLeaseTypeSceneReducer, 'test'
);
