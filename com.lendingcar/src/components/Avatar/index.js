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

import logoImage from './assets/logo.png';
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
        defaultSource={logoImage}
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
  // 是否为本地照片
  isLocal: PropTypes.bool,
  // 照片地址 Object,string等照片存储格式均可
  url: PropTypes.any,
  // 用户名
  userName: PropTypes.string,
  // 是否显示用户名
  showUserName: PropTypes.bool,
  // 用户头像的 Image 标签参数，使用延展运算符传入 Image 标签
  avatarProps: PropTypes.object,
  // avatar container style
  viewStyle: PropTypes.any,
  // 用户头像样式
  avatarStyle: PropTypes.any,
  // 用户名样式
  nameStyle: PropTypes.any,
};

export default Avatar;
