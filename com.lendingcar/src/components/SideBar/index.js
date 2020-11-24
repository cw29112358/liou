/**
*
* SideBar Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Icon,
} from 'native-base';

import {
  getUserLogoUrl,
  getUserDisplayName,
} from 'utils/helpers';

import Avatar from 'components/Avatar';
import Mask from 'components/Mask';
import membershipImage from 'assets/membership.png';

import { SIDE_LINKS, REFID_LINK } from './constants';
import styles from './styles';

const SideBar = (props) => {
  const {
    closeDrawer, offset,
    authUser, authUserMembership, authUserAgent,
  } = props;
  const { logo, refId } = authUser;
  const { isMembership, level } = authUserMembership;
  const { agentId } = authUserAgent;

  const renderAvatar = () => (
    <TouchableOpacity onPress={() => { Actions.push('profile'); }}>
      <Avatar
        url={getUserLogoUrl(logo)}
        userName={getUserDisplayName(authUser)}
        avatarStyle={styles.avatar}
        nameStyle={styles.userName}
      />
    </TouchableOpacity>
  );

  const renderMembershipImage = () => (
    <Image
      source={membershipImage}
      style={styles.membershipImage}
    />
  );
  const renderMembership = () => {
    const membershipLevel = isMembership ? level : 'toBeMemberShip';

    return (
      <TouchableOpacity
        style={styles.membership}
        onPress={() => { Actions.push('member'); }}
      >
        { isMembership && renderMembershipImage() }
        <Text style={styles.membershipText}>
          { translate(membershipLevel) }
        </Text>
        <Icon style={styles.iconStyle} name="ios-arrow-forward" />
      </TouchableOpacity>
    );
  };

  const renderItem = (sideMenu, component = ListItem) => {
    const {
      label, action, iconName,
      itemStyle = {}, imageStyle, textStyle,
    } = sideMenu;
    const Component = component;

    return (
      <Component
        key={label}
        style={[styles.listItem, itemStyle]}
        onPress={action}
      >
        <Image source={iconName} style={imageStyle} />
        <Text style={textStyle}>{translate(label)}</Text>
      </Component>
    );
  };
  const renderList = () => {
    const slideData = SIDE_LINKS.slice(0);
    if (!agentId) {
      slideData.splice(4, 0);
    }

    return (
      <List>
        {slideData.map((sideMenu) => renderItem(sideMenu))}
      </List>
    );
  };

  const renderRefId = () => {
    if (refId || isMembership) return null;

    return renderItem(REFID_LINK, TouchableOpacity);
  };

  return (
    <Mask
      onPress={() => closeDrawer('closeSpeed')}
      style={styles.mask}
      childrenStyle={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          { marginLeft: offset },
        ]}
      >
        { renderAvatar() }
        { renderMembership() }
        { renderList() }
        { renderRefId() }
      </Animated.View>
    </Mask>
  );
};

SideBar.defaultProps = {
  authUser: {},
  authUserMembership: {},
  authUserAgent: {},
  offset: null,
  closeDrawer: () => null,
};

SideBar.propTypes = {
  authUser: PropTypes.object,
  authUserMembership: PropTypes.object,
  authUserAgent: PropTypes.object,
  offset: PropTypes.any,
  closeDrawer: PropTypes.func,
};

export default SideBar;
