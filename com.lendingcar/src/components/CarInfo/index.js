/**
*
* CarInfo Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import CarImage from 'components/CarImage';

import styles from './styles';

const CarInfo = (props) => {
  const { carInfo, children } = props;
  const {
    make, model, carType, year, images = [],
    isLocal, hideWatermark, imageStyle,
  } = carInfo;

  const renderCarFixedInfo = () => (
    <View style={styles.infoView}>
      <View style={styles.textView}>
        <Text style={styles.blackText}>{make ? `${translate(make)} ` : ''}{model} </Text>
        <Text style={styles.greyText}>{carType} {year}</Text>
      </View>
      <CarImage
        url={images[0]}
        isLocal={isLocal}
        hideWatermark={hideWatermark}
        style={imageStyle}
      />

      <View style={[styles.ball, styles.smallBall]}></View>
      <View style={[styles.ball, styles.leftBall]}></View>
      <View style={[styles.ball, styles.rightBall]}></View>
    </View>
  );

  return (
    <View style={styles.view}>
      { renderCarFixedInfo() }
      <View style={styles.shadow}>
        { children }
      </View>
    </View>
  );
};

CarInfo.defaultProps = {
  carInfo: {},
  children: null,
};

CarInfo.propTypes = {
  carInfo: PropTypes.object,
  children: PropTypes.node,
};

export default CarInfo;
