import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

/*
 * Direct selector to the customerDetailScene reducer
 * 直接挑选 customerDetailSceneReducer
 */
export const selectCustomerDetailSceneReducer = (state) => state.get('customerDetailScene', Immutable.Map());

/*  selector parameters from customerDetailSceneReducer
 * 选择其中的特定字段
 */
export const selectTest = createGetSelector(
  selectCustomerDetailSceneReducer, 'test'
);
