/**
*
* Card Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import styles from './styles';

const Card = (props) => {
  const { carInfo: { name, image } } = props;
  const imageSource = { uri: image };
  return (
    <View style={styles.view}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

Card.defaultProps = {
  carInfo: {},
};

Card.propTypes = {
  carInfo: PropTypes.object,
};

export default Card;
