/**
*
* EmptyList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

import noCarImage from './assets/noCar.png';
import noContentImage from './assets/noContent.png';
import styles from './styles';

const EmptyList = (props) => {
  const {
    url,
    type,
    label,
    imageViewStyle,
    activeOpacity,
    onPressFunc,
  } = props;
  let source = noContentImage;
  if (url) {
    source = url;
  } else if (type === 'car') {
    source = noCarImage;
  }

  return (
    <View style={[styles.imageView, imageViewStyle]}>
      <TouchableOpacity
        onPress={onPressFunc}
        style={styles.button}
        activeOpacity={activeOpacity}
      >
        <Image source={source} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{translate(label)}</Text>
      </TouchableOpacity>
    </View>
  );
};

EmptyList.defaultProps = {
  url: '',
  type: 'content',
  label: '',
  imageViewStyle: {},
  activeOpacity: 1,
  onPressFunc: null,
};

EmptyList.propTypes = {
  url: PropTypes.string,
  // EmptyList type
  type: PropTypes.oneOf([
    'car',
    'content',
  ]),
  label: PropTypes.string,
  imageViewStyle: PropTypes.object,
  // 触摸时的透明度
  activeOpacity: PropTypes.number,
  onPressFunc: PropTypes.func,
};

export default EmptyList;
