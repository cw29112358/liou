/**
*
* HomeHeader Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Text,
  Button,
  Icon,
  Badge,
} from 'native-base';

import AppStatusBar from 'components/AppStatusBar';

import menuImage from './assets/menuImage.png';
import messageImage from './assets/messageImage.png';
import styles from './styles';

const HomeHeader = (props) => {
  const {
    currentArea, area, isShowSelectModal,
    openDrawer, changeSelectModal,
    rightPress, notificationIsRead,
    authUser,
  } = props;
  const iconStyle = [styles.dropdownIcon];
  if (isShowSelectModal) iconStyle.push(styles.dropupIcon);

  const leftItem = () => (
    <Left>
      <Button style={styles.headerButton} onPress={openDrawer}>
        <Image source={menuImage} style={styles.imageSize} />
      </Button>
    </Left>
  );
  const centerItem = () => (
    <Body>
      {area.length > 0 && (
        <Button style={styles.areaButton} onPress={changeSelectModal}>
          <Text style={styles.areaText}>
            {translate(currentArea || area[0])}
          </Text>
          <Icon name="md-play" style={iconStyle} />
        </Button>
      )}
    </Body>
  );
  const rightItem = () => (
    <Right>
      <Button style={styles.headerButton} onPress={rightPress}>
        <Image source={messageImage} style={styles.imageSize} />
        {(notificationIsRead && authUser.id) && <Badge style={styles.badge} />}
      </Button>
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
  isShowSelectModal: false,
  notificationIsRead: false,
  authUser: {},
  openDrawer: () => null,
  changeSelectModal: () => null,
  rightPress: () => null,
};

HomeHeader.propTypes = {
  currentArea: PropTypes.string,
  area: PropTypes.array,
  isShowSelectModal: PropTypes.bool,
  notificationIsRead: PropTypes.bool,
  authUser: PropTypes.object,
  openDrawer: PropTypes.func,
  changeSelectModal: PropTypes.func,
  rightPress: PropTypes.func,
};

export default HomeHeader;
