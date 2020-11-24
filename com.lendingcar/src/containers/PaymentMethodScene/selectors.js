import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectPaymentMethodSceneReducer = (state) => state.get('paymentMethodScene', Immutable.Map());

export const selectIsDone = createGetSelector(
  selectPaymentMethodSceneReducer, 'done', true,
);
export const selectPurchaseResult = createGetSelector(
  selectPaymentMethodSceneReducer, 'purchaseResult', Immutable.Map(),
);
