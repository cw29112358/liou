/**
*
* BookingFooter Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';

import styles from './styles';

const BookingFooter = (props) => {
  const {
    buttonPress, buttonLabel, disabled, buttonStyles,
  } = props;
  const buttonTextStyle = disabled
    ? styles.disableButtonText
    : styles.buttonText;
  let basicButtonStyle = [styles.buttonStyle, buttonStyles];
  if (styles.isIphoneX) basicButtonStyle = styles.buttonIphoneX;
  if (styles.isIphoneX && disabled) basicButtonStyle = styles.disabledButtonIphoneX;

  return (
    <Footer style={styles.footerShadow}>
      <FooterTab style={styles.holdFee}>
        <View style={styles.priceLine}>
          {translate(0, 'dollar', styles.priceStyle)}
          <Text style={styles.holdText}>{translate('holdFee')}</Text>
        </View>
      </FooterTab>
      <FooterTab style={[styles.buttonFooter, styles.isIphoneX ? null : styles.footerShadow, styles.isIphoneX ? null : styles.buttonShadow]}>
        <Button
          onPress={buttonPress}
          disabled={disabled}
          style={basicButtonStyle}
        >
          <Text style={buttonTextStyle}>{translate(buttonLabel)}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

BookingFooter.defaultProps = {
  buttonPress: () => null,
  buttonLabel: '',
  disabled: false,
  buttonStyles: {},
};

BookingFooter.propTypes = {
  buttonPress: PropTypes.func,
  buttonLabel: PropTypes.string,
  disabled: PropTypes.bool,
  buttonStyles: PropTypes.object,
};

export default BookingFooter;
