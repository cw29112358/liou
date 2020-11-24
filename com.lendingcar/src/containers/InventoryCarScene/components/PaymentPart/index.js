/**
*
* PaymentPart Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import lowerCase from 'lodash/lowerCase';
import {
  View,
  Text,
  Button,
} from 'native-base';

import fullPaymentImage from 'assets/fullPayment.png';
import installmentImage from 'assets/installment.png';

import DetailPartTitle from '../DetailPartTitle';
import styles from './styles';

const PaymentPart = (props) => {
  const { carInfo, goToApplyLoan } = props;
  const listGroup = [
    {
      image: fullPaymentImage,
      label: 'fullPayment',
      value: carInfo.depositPrice,
      note: 'fullPaymentNote',
    },
  ];
  let showGroup = listGroup;
  if (carInfo.isLoanable) {
    showGroup = listGroup.concat([{
      image: installmentImage,
      label: 'installment',
      value: carInfo.loanRelated.downPayment,
      note: 'downPayment',
    }]);
  }
  return (
    <View style={styles.content}>
      <DetailPartTitle title="orderPayment" />
      {showGroup.map((item, index) => {
        const itemStyles = [styles.item];
        if (index === showGroup.length - 1) itemStyles.push(styles.lastItem);

        return (
          <View style={itemStyles} key={item.label}>
            <View style={styles.itemLeft}>
              <Image source={item.image} style={styles.iconImage} />
              <Text style={styles.labelText}>{translate(item.label)}</Text>
            </View>
            <View style={styles.itemRight}>
              {translate(item.value, 'dollar', styles.priceStyle)}
              <Text style={styles.noteText}>{lowerCase(translate(item.note))}</Text>
            </View>
          </View>
        );
      })}
      {carInfo.isLoanable && (
        <Button rounded style={styles.button} onPress={goToApplyLoan}>
          <Text style={styles.buttonText}>{translate('applyLoan')}</Text>
        </Button>
      )}
    </View>
  );
};

PaymentPart.defaultProps = {
  carInfo: null,
  goToApplyLoan: () => null,
};

PaymentPart.propTypes = {
  carInfo: PropTypes.object,
  goToApplyLoan: PropTypes.func,
};

export default PaymentPart;
