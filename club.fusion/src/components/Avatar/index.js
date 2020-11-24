/**
*
* Avatar Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';

import LazyImage from 'components/LazyImage';

import logoImage from './assets/logo.png';
import styles from './styles';

function Avatar(props) {
  const {
    onPress, activeOpacity,
    isLazyLoad, isLocal, url, lazyImageProps, avatarProps,
    viewStyle, avatarStyle, children,
  } = props;

  const Component = onPress ? TouchableOpacity : View;
  const componentProps = onPress ? {
    activeOpacity: activeOpacity || 0.4,
    onPress,
  } : {};

  return (
    <Component
      style={[styles.content, viewStyle]}
      {...componentProps}
    >
      <LazyImage
        defaultSource={logoImage}
        {...lazyImageProps}
        isLazyLoad={isLazyLoad}
        isLocal={isLocal}
        url={url}
        imageProps={avatarProps}
        style={[styles.avatar, avatarStyle]}
      />
      { children }
    </Component>
  );
}

Avatar.defaultProps = {
  onPress: undefined,
  activeOpacity: undefined,
  isLazyLoad: true,
  isLocal: false,
  url: '',
  lazyImageProps: {},
  avatarProps: {},
  children: undefined,
  viewStyle: {},
  avatarStyle: {},
};

Avatar.propTypes = {
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  isLazyLoad: PropTypes.bool,
  isLocal: PropTypes.bool,
  url: PropTypes.any,
  lazyImageProps: PropTypes.object,
  avatarProps: PropTypes.object,
  children: PropTypes.any,
  viewStyle: PropTypes.any,
  avatarStyle: PropTypes.any,
};

export default Avatar;
