import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import { selectAuthUserInfo } from 'containers/AppRouter/selectors';

export const selectMemberSceneReducer = (state) => state.get('memberScene', Immutable.Map());

export const selectLoading = createGetSelector(
  selectMemberSceneReducer, 'isLoading', false,
);
export const selectMemberShipPrice = createGetSelector(
  selectMemberSceneReducer, 'membershipPrice', Immutable.Map(),
);
export const selectCalculatedMemberShipPrice = createSelector(
  selectMemberShipPrice,
  selectAuthUserInfo,
  (membershipPrice, authUser) => {
    const plans = membershipPrice.get('plans');
    if (!plans || !plans.size) return Immutable.List();

    const isDiscount = !!authUser.get('refId');
    const referralDiscount = membershipPrice.get('referralDiscount');

    return plans
      .map((value, key) => {
        const discountAmount = parseInt(referralDiscount * value, 10);

        return {
          isDiscount,
          level: key,
          paymentAmount: value,
          discountAmount,
        };
      })
      .valueSeq();
  }
);
