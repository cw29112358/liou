/**
*
* CouponItem Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import Barcode from 'react-native-barcode-builder';
import moment from 'moment';
import {
  View,
  Text,
  Button,
} from 'native-base';

import { momentFormat } from 'utils/helpers';

import styles from './styles';

const CouponItem = (props) => {
  const {
    coupon, business, rowMap, onUseCoupons,
  } = props;

  const getCouponColor = (value) => {
    const firstNumber = value.toString().substring(0, 1);
    switch (firstNumber) {
      case '1':
        return styles.figureForOne;
      case '2':
        return styles.figureForTwo;
      default:
        return styles.figureForFive;
    }
  };

  const itemStyles = [styles.listItem];
  const itemRightStyles = [styles.itemRight, getCouponColor(coupon.amount)];
  const buttonStyles = [styles.button];
  let buttonLabel = 'useCoupon';
  const isUsed = coupon.status === 'used';
  if (Number(rowMap) === 0) {
    itemStyles.push(styles.firstItem);
  }
  if (isUsed) {
    itemRightStyles.push(styles.itemDisabled);
    buttonStyles.push(styles.disabledButton);
    buttonLabel = 'usedCoupon';
  }

  const renderLeft = () => (
    <View style={styles.itemLeft}>
      <Text style={styles.businessName}>{business.name}</Text>
      <Text style={styles.description}>{coupon.description}</Text>
      <Text style={styles.description}>{translate('expirationDate')}{momentFormat(moment(coupon.createdAt).add(coupon.effectiveDays, 'days'))}</Text>
      <Barcode value={coupon.id} format="CODE128" width={0.7} height={30} style={{ paddingLeft: 0 }} />
    </View>
  );
  const renderRight = () => (
    <View style={itemRightStyles}>
      <View style={styles.divisionLine} />
      {translate(coupon.amount, 'dollar', styles.priceStyle)}
      <Button
        transparent
        bordered={!isUsed}
        disabled={isUsed}
        style={buttonStyles}
        onPress={() => onUseCoupons(coupon)}
      >
        <Text style={styles.buttonText}>{translate(buttonLabel)}</Text>
      </Button>
    </View>
  );
  return (
    <View style={itemStyles}>
      { renderLeft() }
      { renderRight() }
    </View>
  );
};

CouponItem.defaultProps = {
  coupon: null,
  business: null,
  rowMap: '',
  onUseCoupons: () => null,
};

CouponItem.propTypes = {
  coupon: PropTypes.object,
  business: PropTypes.object,
  rowMap: PropTypes.string,
  onUseCoupons: PropTypes.func,
};

export default CouponItem;
