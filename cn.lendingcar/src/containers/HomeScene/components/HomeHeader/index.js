/**
*
* HomeHeader Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Text,
  Button,
  View,
} from 'native-base';

import {
  getUserLogoUrl,
} from 'utils/helpers';

import AppStatusBar from 'components/AppStatusBar';
import Avatar from 'components/Avatar';
import logoImage from 'assets/logo.png';

import positionImage from './assets/position.png';
import newsImage from './assets/news.png';
import styles from './styles';

const HomeHeader = (props) => {
  const {
    currentArea, area, changeSelectModal,
    notificationIsRead, isLoggedIn,
    goToProfileCenter,
    authUser,
  } = props;
  const { logo } = authUser;

  const leftItem = () => (
    <Left style={styles.headerLeft}>
      {area.length > 0 && (
        <Button style={styles.areaButton} onPress={changeSelectModal}>
          <Image source={positionImage} style={styles.positionImage} />
          <Text style={styles.areaText} numberOfLines={1}>
            {translate(currentArea || area[0])}
          </Text>
        </Button>
      )}
    </Left>
  );
  const centerItem = () => (
    <Body style={styles.headerBody}>
      <Image source={logoImage} style={styles.logoImage} />
    </Body>
  );
  const renderAvatar = () => (
    <TouchableOpacity onPress={goToProfileCenter}>
      <Avatar
        url={getUserLogoUrl(logo)}
        avatarStyle={styles.avatar}
        nameStyle={styles.userName}
        viewStyle={styles.viewStyle}
        showUserName={false}
      />
    </TouchableOpacity>
  );
  const rightItem = () => (
    <Right style={styles.headerRight}>
      <View style={styles.rightView}>
        { (notificationIsRead && isLoggedIn) && <Image source={newsImage} style={styles.badge} />}
        { renderAvatar() }
      </View>
    </Right>
  );

  return (
    <Header style={styles.headerStyle}>
      <AppStatusBar />
      { leftItem() }
      { centerItem() }
      { rightItem() }
    </Header>
  );
};

HomeHeader.defaultProps = {
  currentArea: '',
  area: [],
  notificationIsRead: false,
  isLoggedIn: false,
  authUser: {},
  changeSelectModal: () => null,
  goToProfileCenter: () => null,
};

HomeHeader.propTypes = {
  currentArea: PropTypes.string,
  area: PropTypes.array,
  notificationIsRead: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  authUser: PropTypes.object,
  changeSelectModal: PropTypes.func,
  goToProfileCenter: PropTypes.func,
};

export default HomeHeader;
