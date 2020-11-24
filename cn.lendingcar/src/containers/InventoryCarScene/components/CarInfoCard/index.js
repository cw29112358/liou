/**
*
* CarInfoCard Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import CarImage from 'components/CarImage';

import styles from './styles';

const CarInfoCard = (props) => {
  const { car, changeCarId, isLast } = props;
  const {
    images = [], year,
    make, model, price,
  } = car;
  const cardStyle = [styles.card];
  if (isLast) cardStyle.push(styles.lastCard);

  const renderCarImage = () => (
    <View style={styles.imageView}>
      <View style={styles.image}>
        <CarImage url={images[0]} style={styles.image} />
        <View style={styles.tag}>
          <Text style={styles.tagText}>{year}</Text>
        </View>
      </View>
    </View>
  );
  const renderCarInfo = () => (
    <View style={styles.carInfo}>
      <Text numberOfLines={1} style={styles.carTitle}>{translate(make)} {model}</Text>
      <View style={styles.lastInfo}>
        {translate(price, 'dollar', styles.priceStyle)}
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => changeCarId(car)}
    >
      {renderCarImage()}
      {renderCarInfo()}
    </TouchableOpacity>
  );
};

CarInfoCard.defaultProps = {
  car: {},
};

CarInfoCard.propTypes = {
  car: PropTypes.object,
  isLast: PropTypes.bool.isRequired,
  changeCarId: PropTypes.func.isRequired,
};

export default CarInfoCard;
