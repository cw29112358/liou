import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import moment from 'moment';

import { momentFormat } from 'utils/helpers';
import { CALCULATE_DATE_FORMAT } from 'utils/constants';

import { selectAuthUserInfo, selectAuthUserMembership } from 'containers/AppRouter/selectors';

export const selectMemberSceneReducer = (state) => state.get('memberScene', Immutable.Map());

export const selectLoading = createGetSelector(
  selectMemberSceneReducer, 'isLoading', false,
);
export const selectMemberShipPrice = createGetSelector(
  selectMemberSceneReducer, 'membershipPrice', Immutable.Map(),
);

export const selectSpecialActivity = createSelector(
  selectMemberShipPrice,
  (membershipPrice) => {
    if (membershipPrice.size <= 0) return [];
    if (!membershipPrice.get('special') || membershipPrice.get('special').isEmpty()) return [];
    return membershipPrice.get('special')
      .filter((item) => {
        const startDate = item.get('startDate');
        const endDate = item.get('endDate');
        const currentDate = moment().format(CALCULATE_DATE_FORMAT);
        return currentDate >= startDate && currentDate <= endDate;
      })
      .sortBy((item) => {
        const startDate = item.get('startDate');
        return -moment(startDate).unix();
      });
  }
);
export const selectCalculatedMemberShipPrice = createSelector(
  selectMemberShipPrice,
  selectAuthUserInfo,
  selectSpecialActivity,
  selectAuthUserMembership,
  (membershipPrice, authUser, specialActivity, authUserMembership) => {
    const plans = membershipPrice.get('plans');
    if (!plans || !plans.size) return Immutable.List();

    const isReferralDiscount = !!authUser.get('refId');
    const isDiscount = isReferralDiscount || (specialActivity.size > 0 && specialActivity.get(0).size > 0);
    const referralDiscount = authUser.get('refId') ? membershipPrice.get('referralDiscount') : 1;
    const isMembership = authUserMembership.get('isMembership');
    let discountFee = 0;
    if (specialActivity.size > 0 && specialActivity.get(0).size > 0) {
      discountFee = specialActivity.get(0).get('discountFee');
    }
    if (isMembership) discountFee = 0;

    return plans
      .map((value, key) => {
        const discountAmount = Math.round(referralDiscount * (value - discountFee));

        return {
          isReferralDiscount,
          isDiscount,
          level: key,
          paymentAmount: value,
          discountAmount,
          referralDiscount,
        };
      })
      .valueSeq();
  }
);

export const selectUserCoupons = createSelector(
  selectAuthUserMembership,
  (membershipBenefits) => {
    if (!membershipBenefits.get('benefits')) return null;
    return membershipBenefits.get('benefits').sortBy((item) => {
      const createdDate = item.get('startDate');
      const unix = moment(createdDate).unix();
      return unix;
    });
  }
);

export const filterCoupons = (allCoupons, key, type) => allCoupons.filter((item) => item.get(key) === type);

export const selectUserCouponsStatus = createSelector(
  selectUserCoupons,
  (userCoupons) => {
    if (!userCoupons) return null;
    // TODO: replace the real data
    // 获取优惠券总数和未使用数量
    const supercarCoupons = filterCoupons(userCoupons, 'type', 'supercar');
    const supercarUnused = filterCoupons(supercarCoupons, 'status', 'unused');
    const pickupCoupons = filterCoupons(userCoupons, 'type', 'pickup');
    const pickupUnused = filterCoupons(pickupCoupons, 'status', 'unused');

    // 选择 pickup 中剩余可用优惠券
    const residualPickupCoupons = pickupCoupons.filter((item) => {
      const endDate = momentFormat(item.get('endDate'), CALCULATE_DATE_FORMAT);
      const currentDate = moment().format(CALCULATE_DATE_FORMAT);
      // 选择可用，且未用的优惠券
      return item.get('status') === 'unused' && currentDate < endDate;
    });

    // 当前时间区段的优惠券是否已用
    const currentPeriodCoupon = pickupCoupons.find((item) => {
      const startDate = momentFormat(item.get('startDate'), CALCULATE_DATE_FORMAT);
      const endDate = momentFormat(item.get('endDate'), CALCULATE_DATE_FORMAT);
      const currentDate = moment().format(CALCULATE_DATE_FORMAT);
      return item.get('status') === 'unused' && currentDate >= startDate && currentDate < endDate;
    });

    const supercar = Immutable.Map()
      .set('total', supercarCoupons.size)
      .set('unused', supercarUnused.size)
      .set('isCurrentPeriod', supercarUnused.size >= 0);
    const pickup = Immutable.Map()
      .set('total', pickupCoupons.size)
      .set('unused', pickupUnused.size)
      .set('residualCoupons', residualPickupCoupons)
      .set('isCurrentPeriod', !!currentPeriodCoupon);
    return Immutable.Map()
      .set('supercar', supercar)
      .set('pickup', pickup);
  }
);
