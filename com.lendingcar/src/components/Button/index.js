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

// 背景色渐变按钮组件
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
  // 阴影样式
  shadowStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  // 渐变颜色组
  linearColors: PropTypes.array,
  // 渐变起始位置{x,y}
  linearStart: PropTypes.object,
  // 渐变结束位置{x,y}
  linearEnd: PropTypes.object,
  // 渐变的组件样式
  linearStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  // 渐变按钮内子组件
  leftChildren: PropTypes.any,
  rightChildren: PropTypes.any,
  children: PropTypes.any,
  // react-native button params
  otherProps: PropTypes.object,
  // button 内部文字及文字样式
  textLabel: PropTypes.string,
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  // 是否翻译
  textTranslate: PropTypes.bool,
  // TranslateText 组件其他参数
  textOtherProps: PropTypes.object,
};

export default Button;
