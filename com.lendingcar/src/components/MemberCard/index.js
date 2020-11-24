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

import { momentFormat } from 'utils/helpers';

import permiumStarImage from './assets/permiumStar.png';
import deluxeStarImage from './assets/deluxeStar.png';
import permiumDecorateImage from './assets/permiumDecorate.png';
import deluxeDecorateImage from './assets/deluxeDecorate.png';
import discountImage from './assets/discount.png';
import styles from './styles';

const MemberCard = (props) => {
  const {
    isDiscount, isReferralDiscount, level, paymentAmount, discountAmount, referralDiscount,
    specialActivity, isMembership,
  } = props;
  const contentStyle = [styles.content];
  let deluxeTextStyle = {};
  let { priceStyle } = styles;
  let starImageSource = null;
  // let decorateImageSource = null;
  let decorateImageSource = permiumDecorateImage;

  const activitySaveNoteStyles = [styles.activitySaveNote];

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
    activitySaveNoteStyles.push(styles.activitySaveNoteDelux);
  }
  const starImage = starImageSource ? <Image style={[styles.starImage]} source={starImageSource} /> : null;
  const showPrice = isDiscount ? discountAmount : paymentAmount;

  const offPercent = Math.round((1 - Number(referralDiscount)) * 100);

  const hasActivity = !isMembership && specialActivity.length > 0;
  const priceViewStyles = [styles.priceView];
  if (hasActivity) {
    priceViewStyles.push(styles.activityPrice);
  }

  const renderImageBackground = () => (
    <ImageBackground source={discountImage} style={styles.discountImage}>
      <Text style={styles.discountText}>{offPercent}% Off</Text>
    </ImageBackground>
  );
  const renderOriginalPrice = () => (
    <Text style={styles.originalPriceText}>
      {translate(paymentAmount, 'dollar', styles.originalPrice)}
    </Text>
  );
  const renderActivityDeadline = () => (
    <Text style={styles.activityText}>
      {translate('deadline')}
      <Text style={styles.activityEnd}>{momentFormat(specialActivity[0].endDate)}</Text>
    </Text>
  );
  const renderActivitySaveNote = () => (
    <Text style={activitySaveNoteStyles}>
      {translate(specialActivity[0].discountFee, 'dollar')}
      {translate('activitySaveNote')}
    </Text>
  );
  return (
    <View style={contentStyle}>
      { isReferralDiscount && renderImageBackground() }
      <View style={styles.titleView}>
        { starImage }
        <Text style={[styles.title, deluxeTextStyle]}>{translate(level)}</Text>
        { starImage }
      </View>

      <View style={priceViewStyles}>
        {translate(showPrice, 'dollar', priceStyle)}
        { isDiscount && renderOriginalPrice() }
      </View>
      { hasActivity && renderActivityDeadline() }
      <Image style={[styles.decorateImage]} source={decorateImageSource} />
      { hasActivity && renderActivitySaveNote() }
      {/* <Text style={[styles.memberText, deluxeTextStyle]}> {translate(`${level}Text`)}</Text> */}
    </View>
  );
};

MemberCard.defaultProps = {
  isDiscount: false,
  isReferralDiscount: false,
  level: '',
  paymentAmount: 0,
  discountAmount: 0,
  referralDiscount: 1,
  specialActivity: [],
  isMembership: false,
};

MemberCard.propTypes = {
  isDiscount: PropTypes.bool,
  isReferralDiscount: PropTypes.bool,
  level: PropTypes.string,
  paymentAmount: PropTypes.number,
  discountAmount: PropTypes.number,
  referralDiscount: PropTypes.number,
  specialActivity: PropTypes.array,
  isMembership: PropTypes.bool,
};

export default MemberCard;
