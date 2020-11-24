import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const selectCardPackageSceneReducer = (state) => state.get('cardPackageScene', Immutable.Map());

export const selectMyCards = createGetSelector(
  selectCardPackageSceneReducer, 'cards', Immutable.List()
);
export const selectIsLoading = createGetSelector(
  selectCardPackageSceneReducer, 'isLoading', true
);
export const selectMyCoupons = createGetSelector(
  selectCardPackageSceneReducer, 'coupons', Immutable.List()
);

export const selectCardsWithCoupons = createSelector(
  selectMyCards,
  selectMyCoupons,
  (cards, coupons) => {
    if (cards.size === 0) return Immutable.List([]);
    return cards.map((card) => {
      let cardCoupons = Immutable.List();
      if (coupons.size > 0) {
        cardCoupons = coupons.filter((coupon) => coupon.get('business') === card.get('business').get('id'));
      }
      return card.set('coupons', cardCoupons);
    });
  }
);

export const selectUnusedCoupons = createSelector(
  selectMyCoupons,
  (myCoupons) => myCoupons.filter((coupon) => coupon.get('status') === 'unused')
    .sortBy((coupon) => -coupon.get('amount'))
);
