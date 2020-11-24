import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectMemberPaymentSceneReducer = (state) => state.get('MemberPaymentScene', Immutable.Map());

export const selectIsDone = createGetSelector(
  selectMemberPaymentSceneReducer, 'done', true,
);
