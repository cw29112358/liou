/**
*
* EmptyList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from 'native-base';
import {
  ScrollView,
  RefreshControl,
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
    onRefresh, isRefreshing, scrollEnabled,
  } = props;
  let source = noContentImage;
  if (url) {
    source = url;
  } else if (type === 'car') {
    source = noCarImage;
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.imageView, imageViewStyle]}
      scrollEnabled={scrollEnabled}
      refreshControl={(
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      )}
    >
      <TouchableOpacity
        onPress={onPressFunc}
        style={styles.button}
        activeOpacity={activeOpacity}
      >
        <Image source={source} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{translate(label)}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

EmptyList.defaultProps = {
  url: '',
  type: 'content',
  label: '',
  imageViewStyle: {},
  activeOpacity: 1,
  onPressFunc: null,
  onRefresh: null,
  isRefreshing: false,
  scrollEnabled: true,
};

EmptyList.propTypes = {
  url: PropTypes.string,
  type: PropTypes.oneOf([
    'car',
    'content',
  ]),
  label: PropTypes.string,
  imageViewStyle: PropTypes.object,
  activeOpacity: PropTypes.number,
  onPressFunc: PropTypes.func,
  onRefresh: PropTypes.func,
  isRefreshing: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
};

export default EmptyList;
