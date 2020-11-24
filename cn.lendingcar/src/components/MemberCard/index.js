/**
*
* MemberCard Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import permiumStarImage from './assets/permiumStar.png';
import deluxeStarImage from './assets/deluxeStar.png';
import permiumDecorateImage from './assets/permiumDecorate.png';
import deluxeDecorateImage from './assets/deluxeDecorate.png';
import discountImage from './assets/discount.png';
import styles from './styles';

const MemberCard = (props) => {
  const {
    isDiscount, level, paymentAmount, discountAmount,
  } = props;

  const contentStyle = [styles.content];
  const { originalPrice, originalPriceDeluxe } = styles;
  let originalTextStyle = originalPrice;
  let deluxeTextStyle = {};
  let { priceStyle } = styles;
  let starImageSource = null;
  let decorateImageSource = null;
  if (level === 'premium') {
    contentStyle.push(styles.contentPermium);
    starImageSource = permiumStarImage;
    decorateImageSource = permiumDecorateImage;
  } else if (level === 'deluxe') {
    contentStyle.push(styles.contenDeluxe);
    deluxeTextStyle = styles.deluxeText;
    priceStyle = styles.deluxePriceStyle;
    starImageSource = deluxeStarImage;
    decorateImageSource = deluxeDecorateImage;
    originalTextStyle = originalPriceDeluxe;
  }
  const starImage = starImageSource ? <Image style={[styles.starImage]} source={starImageSource} /> : null;
  const showPrice = isDiscount ? discountAmount : paymentAmount;

  const renderImageBackground = () => (
    <ImageBackground source={discountImage} style={styles.discountImage}>
      <Text style={styles.discountText}>优惠推荐</Text>
    </ImageBackground>
  );
  const renderOriginalPrice = () => (
    <Text style={styles.originalPriceText}>
      {translate(paymentAmount, 'rmb', originalTextStyle)}
    </Text>
  );
  return (
    <View style={contentStyle}>
      { isDiscount && renderImageBackground() }
      <View style={styles.titleView}>
        { starImage }
        <Text style={[styles.title, deluxeTextStyle]}>{translate(level)}</Text>
        { starImage }
      </View>

      <View style={styles.priceView}>
        {translate(showPrice, 'rmb', priceStyle)}
        { isDiscount && renderOriginalPrice() }
      </View>

      <Image style={[styles.decorateImage]} source={decorateImageSource} />
      <Text style={[styles.memberText, deluxeTextStyle]}> {translate(`${level}Text`)}</Text>
    </View>
  );
};

MemberCard.defaultProps = {
  isDiscount: false,
  level: '',
  paymentAmount: 0,
  discountAmount: 0,
};

MemberCard.propTypes = {
  isDiscount: PropTypes.bool,
  level: PropTypes.string,
  paymentAmount: PropTypes.number,
  discountAmount: PropTypes.number,
};

export default MemberCard;
