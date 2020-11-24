/**
*
* Button Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button as NBButton,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import TranslateText from 'components/TranslateText';

const Button = (props) => {
  const {
    shadowStyle, linearColors, linearStart, linearEnd, linearStyle,
    leftChildren, rightChildren, children,
    textStyle, textLabel, textTranslate, textOtherProps,
    ...otherProps
  } = props;

  // 1.children
  let button;
  if (children) {
    button = (
      <NBButton {...otherProps}>
        {children }
      </NBButton>
    );
  } else {
    button = (
      <NBButton {...otherProps}>
        { leftChildren }
        { <TranslateText
          style={textStyle}
          label={textLabel}
          isTranslate={textTranslate}
          {...textOtherProps}
        /> }
        { rightChildren }
      </NBButton>
    );
  }

  // 2.渐变背景
  if (linearColors) {
    button = (
      <LinearGradient
        style={linearStyle}
        start={linearStart}
        end={linearEnd}
        colors={linearColors}
      >
        {button}
      </LinearGradient>
    );
  }

  // 3.阴影
  if (shadowStyle) {
    button = (
      <View style={shadowStyle}>
        { button }
      </View>
    );
  }

  return button;
};

Button.defaultProps = {
  shadowStyle: undefined,
  linearColors: undefined,
  linearStart: undefined,
  linearEnd: undefined,
  linearStyle: undefined,
  leftChildren: undefined,
  rightChildren: undefined,
  children: undefined,
  otherProps: {},
  textLabel: '',
  textStyle: undefined,
  textTranslate: true,
  textOtherProps: {},
};

Button.propTypes = {
  shadowStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  linearColors: PropTypes.array,
  linearStart: PropTypes.object,
  linearEnd: PropTypes.object,
  linearStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  leftChildren: PropTypes.any,
  rightChildren: PropTypes.any,
  children: PropTypes.any,
  otherProps: PropTypes.object,
  textLabel: PropTypes.string,
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  textTranslate: PropTypes.bool,
  textOtherProps: PropTypes.object,
};

export default Button;
