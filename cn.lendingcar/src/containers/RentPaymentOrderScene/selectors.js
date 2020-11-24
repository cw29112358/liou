import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectMemberPaymentSceneReducer = (state) => state.get('RentPaymentOrderScene', Immutable.Map());

export const selectIsDone = createGetSelector(
  selectMemberPaymentSceneReducer, 'done', true,
);
