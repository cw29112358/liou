/**
*
* CardChargeComponent Stateless Component
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

import permiumDecorateImage from './assets/permiumDecorate.png';
import deluxeDecorateImage from './assets/deluxeDecorate.png';
import discountImage from './assets/discount.png';
import styles from './styles';

const CardChargeComponent = (props) => {
  const {
    isReferralDiscount, level,
    name, description, amount,
  } = props;
  const contentStyle = [styles.content];
  let decorateImageSource = permiumDecorateImage;

  if (level === 1) {
    contentStyle.push(styles.contentPermium);
    decorateImageSource = permiumDecorateImage;
  } else if (level === 2) {
    contentStyle.push(styles.contenDeluxe);
    decorateImageSource = deluxeDecorateImage;
  }

  const renderImageBackground = () => (
    <ImageBackground source={discountImage} style={styles.discountImage}>
      <Text style={styles.discountText}>{name}</Text>
    </ImageBackground>
  );
  return (
    <View style={contentStyle}>
      { isReferralDiscount && renderImageBackground() }
      <View style={{ height: 10 }} />
      <View style={styles.priceView}>
        {translate(amount, 'dollar', styles.priceStyle)}
        <Text style={styles.chargeText}>{description}</Text>
      </View>
      <Image style={[styles.decorateImage]} source={decorateImageSource} />
    </View>
  );
};

CardChargeComponent.defaultProps = {
  isReferralDiscount: true,
  level: 1,
  name: '',
  description: '',
  amount: 0,
};

CardChargeComponent.propTypes = {
  isReferralDiscount: PropTypes.bool,
  level: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  amount: PropTypes.number,
};

export default CardChargeComponent;
