import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

import { getImmutableData } from 'utils/helpers';

import {
  selectCardsWithCoupons,
} from 'containers/CardPackageScene/selectors';

export const selectCardDetailSceneReducer = (state) => state.get('cardDetailScene', Immutable.Map());
export const selectCardId = createGetSelector(
  selectCardDetailSceneReducer, 'cardId', '',
);
export const selectStoreIndex = createGetSelector(
  selectCardDetailSceneReducer, 'storeIndex', 0,
);

export const selectCard = createSelector(
  selectCardsWithCoupons,
  selectCardId,
  (cards, cardId) => {
    const defaultCard = Immutable.Map({ business: { } });
    if (!cardId) return defaultCard;

    const findCard = cards.find((item) => item.get('id') === cardId);
    if (!findCard || !findCard.size) return defaultCard;

    const coupons = findCard.get('coupons');
    let balance = 0;
    if (coupons && coupons.size) {
      balance = coupons.reduce((result, item) => {
        if (item.get('status') === 'unused') return result + item.get('amount');
        return result;
      }, 0);
    }
    return findCard.setIn(['business', 'balance'], balance);
  }
);

export const selectCardCouponsGroup = createSelector(
  selectCard,
  (card) => {
    if (!card.get('coupons')) return Immutable.List();
    const allCoupons = card.get('coupons');
    const unusedCoupons = allCoupons.filter((coupon) => coupon.get('status') === 'unused');
    const otherCoupons = allCoupons.filter((coupon) => coupon.get('status') !== 'unused');

    const sortUnusedCoupons = unusedCoupons.sortBy((coupon) => -coupon.get('amount'));
    const sortOtherCoupons = otherCoupons.sortBy((coupon) => -coupon.get('amount'));
    return getImmutableData({
      unusedCoupons: sortUnusedCoupons,
      otherCoupons: sortOtherCoupons,
    });
  }
);
