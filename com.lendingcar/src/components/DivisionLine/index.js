/**
*
* DivisionLine Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  Image,
} from 'react-native';

import variables from 'platform';

import dashedImage from './assets/dashed.png';
import styles from './styles';

const {
  isPad,
  isIOS,
  deviceWidth,
} = variables;

const DivisionLine = (props) => {
  const {
    noCircle, width,
    viewStyle, imageViewStyle, imageStyle,
    circleLeftStyle, circleRightStyle,
  } = props;
  const newImageViewStyle = [styles.imageView, { width }];
  if (!noCircle) newImageViewStyle.push(styles.imageViewWithCircle);
  if (imageViewStyle) newImageViewStyle.push(imageViewStyle);

  const renderLine = () => {
    if (isIOS) {
      return (
        <Image
          style={[styles.separateImage, imageStyle]}
          source={dashedImage}
          resizeMode="repeat"
        />
      );
    }

    let length = Math.floor(width / 6);
    if (noCircle) length += 2;
    return '*'
      .repeat(length - 1)
      .split('*')
      .map((value, index) => {
        const key = `dash_${index}`;
        return (
          <Image
            key={key}
            style={[styles.separateImage, imageStyle]}
            source={dashedImage}
          />
        );
      });
  };

  return (
    <View style={[viewStyle]}>
      <View style={newImageViewStyle}>
        { renderLine() }
      </View>

      { !noCircle && <View style={[styles.circle, styles.circleLeft, circleLeftStyle]} />}
      { !noCircle && <View style={[styles.circle, styles.circleRight, circleRightStyle]} /> }
    </View>
  );
};

DivisionLine.defaultProps = {
  noCircle: false,
  width: isPad ? deviceWidth - 60 : deviceWidth - 44,
  viewStyle: {},
  imageViewStyle: {},
  imageStyle: {},
  circleLeftStyle: {},
  circleRightStyle: {},
};

DivisionLine.propTypes = {
  noCircle: PropTypes.bool,
  width: PropTypes.number,
  viewStyle: PropTypes.object,
  imageViewStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  circleLeftStyle: PropTypes.object,
  circleRightStyle: PropTypes.object,
};

export default DivisionLine;
