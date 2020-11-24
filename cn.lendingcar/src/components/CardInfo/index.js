/**
*
* CardInfo Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import {
  getSubString,
  momentFormat,
} from 'utils/helpers';

import bankImage from './assets/bank.png';
import styles from './styles';

const CardInfo = (props) => {
  const { cardInfo } = props;
  const {
    paymentName, paymentCardNum, paymentExp,
  } = cardInfo;

  const renderCardFooter = () => (
    <View style={styles.cardBttomContainer}>
      <View style={styles.leftContent}>
        <Text style={styles.textKey}>{translate('cardHolder')}</Text>
        <Text style={styles.textValue}>{paymentName}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.textKey}>{translate('expDate')}</Text>
        <Text style={styles.textValue}>{momentFormat(paymentExp, 'MM/YY')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.cardInfoView}>
      <Image
        style={[styles.cardImage]}
        source={bankImage}
      />
      <Text style={styles.cardTitle}>
      Lending
        <Text style={styles.cardTitleColor}> Car</Text>
      </Text>
      <View style={styles.cardView}>
        <Text style={styles.maskNum}>**** **** **** </Text>
        <Text style={styles.cardNum}>{getSubString(paymentCardNum, -4, 4)}</Text>
      </View>
      { renderCardFooter() }
    </View>
  );
};

CardInfo.defaultProps = {
  cardInfo: {},
};

CardInfo.propTypes = {
  cardInfo: PropTypes.object,
};

export default CardInfo;
