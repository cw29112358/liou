/**
*
* DetailPartTitle Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Icon,
  Text,
  Button,
} from 'native-base';

import styles from './styles';

const DetailPartTitle = (props) => {
  const {
    title, isShowVerticalLine,
    contentStyle, titleLabelViewStyle, verticalLineStyle, titleLabelStyle,
    isShowButton, buttonLabel, isShowButtonIcon, buttonIconName, onPress,
    buttonStyle, buttonTextStyle, buttonIconStyle,
  } = props;
  return (
    <View style={[styles.titleLine, contentStyle]}>
      <View style={[styles.titleLabelPart, titleLabelViewStyle]}>
        {isShowVerticalLine && <View style={[styles.verticalLine, verticalLineStyle]}></View>}
        <Text style={[styles.titleLabel, titleLabelStyle]}>{translate(title)}</Text>
      </View>
      {isShowButton && (
        <Button transparent style={[styles.button, buttonStyle]} onPress={onPress}>
          <Text style={[styles.buttonTextColor, buttonTextStyle]}>{translate(buttonLabel)}</Text>
          {isShowButtonIcon && <Icon name={buttonIconName} style={[styles.buttonIcon, buttonIconStyle]} />}
        </Button>
      )}
    </View>
  );
};

DetailPartTitle.defaultProps = {
  title: '',
  isShowVerticalLine: true,
  isShowButton: false,
  buttonLabel: '',
  isShowButtonIcon: false,
  buttonIconName: 'ios-arrow-forward',
  contentStyle: null,
  titleLabelViewStyle: null,
  verticalLineStyle: null,
  titleLabelStyle: null,
  buttonStyle: null,
  buttonTextStyle: null,
  buttonIconStyle: null,
  onPress: () => null,
};

DetailPartTitle.propTypes = {
  title: PropTypes.string,
  isShowVerticalLine: PropTypes.bool,
  isShowButton: PropTypes.bool,
  buttonLabel: PropTypes.string,
  isShowButtonIcon: PropTypes.bool,
  buttonIconName: PropTypes.string,
  contentStyle: PropTypes.object,
  titleLabelViewStyle: PropTypes.object,
  verticalLineStyle: PropTypes.object,
  titleLabelStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  buttonIconStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default DetailPartTitle;
