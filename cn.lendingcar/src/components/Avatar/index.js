/**
*
* Avatar Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import LazyImage from 'components/LazyImage';

import avatarImage from './assets/avatar.png';
import styles from './styles';

function Avatar(props) {
  const {
    isLocal, url, avatarProps,
    userName, showUserName,
    viewStyle, avatarStyle, nameStyle,
  } = props;

  const imageStyle = [styles.avatar, avatarStyle];

  return (
    <View style={[styles.content, viewStyle]}>
      <LazyImage
        isLazyLoad
        defaultSource={avatarImage}
        isLocal={isLocal}
        url={url}
        imageProps={avatarProps}
        style={imageStyle}
      />
      { showUserName && <Text style={[styles.avatarName, nameStyle]}>{ userName || ''}</Text> }
    </View>
  );
}

Avatar.defaultProps = {
  isLocal: false,
  url: '',
  userName: '',
  showUserName: true,
  avatarProps: {},
  viewStyle: {},
  avatarStyle: {},
  nameStyle: {},
};

Avatar.propTypes = {
  isLocal: PropTypes.bool,
  url: PropTypes.any,
  userName: PropTypes.string,
  showUserName: PropTypes.bool,
  avatarProps: PropTypes.object,
  viewStyle: PropTypes.any,
  avatarStyle: PropTypes.any,
  nameStyle: PropTypes.any,
};

export default Avatar;
