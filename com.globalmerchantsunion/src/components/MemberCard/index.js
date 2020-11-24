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
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import deluxeStarImage from './assets/deluxeStar.png';
import deluxeDecorateImage from './assets/deluxeDecorate.png';
import styles from './styles';

const MemberCard = (props) => {
  const { membershipPrice } = props;
  const contentStyle = [styles.content];
  const deluxeTextStyle = styles.deluxeText;
  const priceStyle = styles.deluxePriceStyle;
  const priceViewStyles = [styles.priceView];

  const starImageSource = deluxeStarImage;
  const decorateImageSource = deluxeDecorateImage;

  const starImage = <Image style={[styles.starImage]} source={starImageSource} />;

  contentStyle.push(styles.contenDeluxe);

  return (
    <View style={contentStyle}>
      <View style={styles.titleView}>
        { starImage }
        <Text style={[styles.title, deluxeTextStyle]}>{translate('toBeMemberShip')}</Text>
        { starImage }
      </View>

      <View style={priceViewStyles}>
        {translate(membershipPrice, 'dollar', priceStyle)}
      </View>
      <Image style={[styles.decorateImage]} source={decorateImageSource} />
    </View>
  );
};

MemberCard.defaultProps = {
};

MemberCard.propTypes = {
  membershipPrice: PropTypes.number.isRequired,
};

export default MemberCard;
