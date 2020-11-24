import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
// import { createSelector } from 'reselect';

/*
 * Direct selector to the imessageScene reducer
 * 直接挑选 imessageSceneReducer
 */
export const selectImessageSceneReducer = (state) => state.get('imessageScene', Immutable.Map());

/*  selector parameters from imessageSceneReducer
 * 选择其中的特定字段
 */
export const selectTest = createGetSelector(
  selectImessageSceneReducer, 'test'
);
