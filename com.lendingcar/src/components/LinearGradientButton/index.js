/**
*
* LinearGradientButton Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  Text,
} from 'native-base';

import styles from './styles';

const LinearGradientButton = (props) => {
  const {
    linearGradientStyle, gradientColors, start, end,
    disabled, onButtonPress,
    buttonStyle, disabledButtonstyle,
    isTranslate, buttonLabel, buttonTextStyle,
  } = props;
  let lineargradientColors = styles.gradientColors;
  if (gradientColors) lineargradientColors = gradientColors;

  const buttonStyles = [styles.buttonCircle, buttonStyle];
  if (disabled) buttonStyles.push(disabledButtonstyle || styles.disabledButton);

  return (
    <LinearGradient
      style={[styles.linearGradient, styles.brandShadow, linearGradientStyle]}
      start={start}
      end={end}
      colors={lineargradientColors}
    >
      <Button
        style={buttonStyles}
        disabled={disabled}
        onPress={onButtonPress}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>{isTranslate ? translate(buttonLabel) : buttonLabel }</Text>
      </Button>
    </LinearGradient>
  );
};

LinearGradientButton.defaultProps = {
  linearGradientStyle: null,
  gradientColors: null,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  disabled: false,
  buttonStyle: null,
  disabledButtonstyle: null,
  buttonLabel: 'submit',
  isTranslate: true,
  buttonTextStyle: null,
  onButtonPress: () => null,
};

LinearGradientButton.propTypes = {
  linearGradientStyle: PropTypes.object,
  gradientColors: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
  disabled: PropTypes.bool,
  buttonStyle: PropTypes.object,
  disabledButtonstyle: PropTypes.object,
  buttonLabel: PropTypes.string,
  isTranslate: PropTypes.bool,
  buttonTextStyle: PropTypes.object,
  onButtonPress: PropTypes.func,
};

export default LinearGradientButton;
