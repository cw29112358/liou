/**
 *
 * ProfileCenterScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  View,
  Text,
  List,
  ListItem,
  Icon,
  Button,
} from 'native-base';

import {
  getUserLogoUrl,
  getUserDisplayName,
} from 'utils/helpers';

import {
  selectAuthUserInfo,
  selectAuthUserMembership,
} from 'containers/AppRouter/selectors';
import {
  selectNotificationListIsRead,
} from 'containers/MyNewsScene/selectors';

import membershipImage from 'assets/membership.png';

import Avatar from 'components/Avatar';
import FullScreenScene from 'components/FullScreenScene';
import messageImage from './assets/message.png';

import {
  SIDE_LINKS,
  MAIN_TAGS,
} from './constants';
import styles from './styles';

export class ProfileCenterScene extends React.Component {
  setHeaderProps = () => ({
    hasShadow: false,
    hasRight: true,
    rightButton: this.renderRightButton(),
    rightFieldStyle: styles.rightFieldStyle,
  })
  renderRightButton = () => {
    const { notificationIsRead } = this.props;
    return (
      <Button
        style={styles.button}
        onPress={() => Actions.push('myNews')}
      >
        <Image source={messageImage} style={styles.headerIcon} />
        { notificationIsRead && <View style={styles.badge} />}
      </Button>
    );
  }
  renderAvatar = () => {
    const { authUser } = this.props;
    const { logo } = authUser;
    return (
      <TouchableOpacity
        style={styles.avatarView}
        onPress={() => { Actions.push('profile'); }}
      >
        <Avatar
          url={getUserLogoUrl(logo)}
          userName={getUserDisplayName(authUser)}
          avatarStyle={styles.avatar}
          nameStyle={styles.userName}
        />
      </TouchableOpacity>
    );
  }
  renderMembership = () => {
    const { authUserMembership } = this.props;
    const { isMembership, level } = authUserMembership;
    const membershipLevel = isMembership ? level : 'toBeMemberShip';

    return (
      <TouchableOpacity
        style={styles.membership}
        onPress={() => { Actions.push('member'); }}
      >
        { isMembership && <Image source={membershipImage} style={styles.membershipImage} />}
        <Text style={styles.membershipText}>{ translate(membershipLevel) }</Text>
        <Icon style={styles.iconStyle} name="ios-arrow-forward" />
      </TouchableOpacity>
    );
  };
  renderTopPart = () => (
    <View style={styles.topPart}>
      { this.renderAvatar() }
      { this.renderMembership() }
    </View>
  )
  // scene bottom part (list)
  renderItem = (sideMenu, Component = ListItem, isShowArrow = true, isHorizontal = true) => {
    /**
      * @param {object} sideMenu displays the set of required parameters
      * @param {Component} Component outer components
      * @param {bool} isShowArrow whether to display arrow. default is true
      * @param {bool} isHorizontal whether to display inline. default is true
      */
    const { authUser, authUserMembership } = this.props;
    const { isMembership } = authUserMembership;
    const { refId } = authUser;
    const {
      label, action, iconName, itemStyle = {}, imageStyle, textStyle,
    } = sideMenu;

    const itemLeftStyles = [];
    if (isHorizontal) {
      itemLeftStyles.push(styles.itemLeft);
    }
    if (label === 'refId' && (refId || isMembership)) {
      return null;
    }
    if (label === 'changeLeaseType') {
      return (
        <Component key={label} style={styles.leaseItem} onPress={action}>
          <View style={itemLeftStyles}>
            <Text style={styles.leaseTypeText}>{translate(label)}</Text>
            <Image source={iconName} style={imageStyle} />
          </View>
        </Component>
      );
    }
    return (
      <Component key={label} style={[styles.listItem, itemStyle]} onPress={action}>
        <View style={itemLeftStyles}>
          <Image source={iconName} style={imageStyle} />
          <Text style={textStyle}>{translate(label)}</Text>
        </View>
        { isShowArrow && <Icon name="ios-arrow-forward" style={styles.arrowStyles} />}
      </Component>
    );
  };
  renderMainTags = () => (
    <View style={styles.mainTags}>
      { MAIN_TAGS.map((tag) => this.renderItem(tag, TouchableOpacity, false, false)) }
    </View>
  )
  renderList = () => (
    <List style={styles.list}>
      {SIDE_LINKS.map((sideMenu) => this.renderItem(sideMenu))}
    </List>
  );
  renderBottomPart = () => (
    <View style={styles.bottomPart}>
      { this.renderMainTags() }
      { this.renderList() }
    </View>
  );
  render() {
    return (
      <FullScreenScene
        headerTitle="profileCenter"
        headerProps={this.setHeaderProps()}
        contentStyle={styles.content}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        { this.renderTopPart() }
        { this.renderBottomPart() }
      </FullScreenScene>
    );
  }
}

ProfileCenterScene.defaultProps = {
  authUserMembership: {},
  notificationIsRead: false,
};

ProfileCenterScene.propTypes = {
  authUser: PropTypes.object.isRequired,
  authUserMembership: PropTypes.object,
  notificationIsRead: PropTypes.any,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  authUserMembership: selectAuthUserMembership,
  notificationIsRead: selectNotificationListIsRead,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfileCenterScene);
