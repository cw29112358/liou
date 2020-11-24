/**
 *
 * MemberCard Stateless Component
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';
import discountImage from '../../assets/discount.png';
import styles from './styles';

const RentPaymentOrderCardComponent = (props) => {
  const { bookingObj } = props;
  const {
    isMembership, // 是否是会员
    bookingFee, // 预定人民币金额
    originalPrice,
  } = bookingObj;

  const contentStyle = [styles.content];
  const {
    originalPriceStyle,
    originalPriceDeluxe,
    deluxePriceStyle,
    priceStyle,
    // memberText,
    // deluxeText,
  } = styles;
  const TextStyle = isMembership ? originalPriceStyle : originalPriceDeluxe;
  const priceViewStyle = isMembership ? deluxePriceStyle : priceStyle;
  // const exchangeRateSpecificationStyle = isMembership ? deluxeText : memberText;

  // 左上角显示会员优惠图案
  const renderImageBackground = () => (
    <ImageBackground source={discountImage} style={styles.discountImage}>
      <Text style={styles.discountText}>会员优惠</Text>
    </ImageBackground>
  );
  // 非会员价格
  const renderOriginalPrice = () => (
    <Text style={styles.originalPriceText}>
      {translate(originalPrice, 'rmb', TextStyle)}
    </Text>
  );
  return (
    <View style={contentStyle}>
      { isMembership && renderImageBackground() }
      <View style={styles.priceView}>
        {translate(bookingFee, 'rmb', priceViewStyle)}
        { isMembership && renderOriginalPrice() }
      </View>

      {/* <Text style={exchangeRateSpecificationStyle}> {translate('exchangeRateSpecification')}</Text> */}
    </View>
  );
};

RentPaymentOrderCardComponent.defaultProps = {
  bookingObj: {},
};

RentPaymentOrderCardComponent.propTypes = {
  bookingObj: PropTypes.object,
};

export default RentPaymentOrderCardComponent;
