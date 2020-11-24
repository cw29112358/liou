/**
*
* LoanSuccess Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  View,
  Text,
  Button,
} from 'native-base';

import checkoutImage from 'assets/checkout.png';

import styles from './styles';

const LoanSuccess = (props) => {
  const { goBack } = props;
  return (
    <View style={styles.loanSuccessContent}>
      <Image source={checkoutImage} style={styles.checkout} />
      <Text style={styles.loanSuccessMessageText}>{translate('loanSuccessMessage')}</Text>
      <View style={styles.buttonView}>
        <Button
          block
          primary
          style={styles.button}
          onPress={goBack}
        >
          <Text style={styles.buttonText}>{translate('back')}</Text>
        </Button>
      </View>
    </View>
  );
};

LoanSuccess.defaultProps = {
  goBack: () => null,
};

LoanSuccess.propTypes = {
  goBack: PropTypes.func,
};

export default LoanSuccess;
