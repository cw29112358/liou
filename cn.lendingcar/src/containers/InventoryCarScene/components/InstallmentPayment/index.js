/**
*
* InstallmentPayment Stateless Component
*
*/

/* global translate */

import React from 'react';
// import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import { openURLByLinking } from 'utils/helpers';

import bookmarksImage from './assets/bookmarks.png';
import styles from './styles';

const cardList = [
  {
    label: 'installmentCarPrice',
    value: 10000,
  },
  {
    label: 'installmentDownPayment',
    value: 3000,
  },
  {
    label: 'monthlyInterest',
    value: 58,
  },
];

const InstallmentPayment = () => {
  const renderHeader = () => (
    <View style={styles.titleLine}>
      <View style={styles.titleView}>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.title}>{translate('installmentPaymentTitle')}</Text>
      </View>
    </View>
  );

  const openPhoneCall = () => {
    openURLByLinking('tel:8333666777', 'notSupportPhoneUrl');
  };

  const renderPhoneText = () => (
    <Text style={styles.consultNote}>
      {translate('paymentNoteText')}
      <Text
        style={styles.linkText}
        onPress={openPhoneCall}
      >
        +1 833-366-6777
      </Text>
    </Text>
  );
  return (
    <View style={styles.content}>

      { renderHeader() }
      <View style={styles.detailContent}>
        <Text style={styles.membershipsNote}>{translate('installmentPaymentNote')}</Text>
        <View style={styles.planCard}>
          {cardList.map((item) => (
            <View style={styles.downPayment} key={item.label}>
              <Image source={bookmarksImage} style={styles.image} />
              <Text style={styles.paymentLabel}>{translate(item.label)}</Text>
              {translate(item.value, 'dollar', styles.priceStyle)}
            </View>
          ))}
        </View>
        {renderPhoneText()}
      </View>
    </View>
  );
};

InstallmentPayment.defaultProps = {
};

InstallmentPayment.propTypes = {
};

export default InstallmentPayment;
