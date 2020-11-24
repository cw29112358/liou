/**
*
* Avatar
*
*/
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';
import PhotoUpload from 'react-native-photo-upload';

import {
  PHOTO_UPLOAD_CONFIG,
  AVATAR_DATE_SEPARATOR,
} from 'utils/constants';
import {
  getUserLogoUrl,
  getUserDisplayName,
  momentFormat,
} from 'utils/helpers';

import MyAvatar from 'components/Avatar';
import membershipImage from 'assets/membership.png';
import styles from 'formFields/styles';

function getImageFormat(fileType) {
  switch (fileType) {
    case 'jpg':
      return 'JPEG';
    case 'jpeg':
      return 'JPEG';
    case 'png':
      return 'PNG';
    default:
      return 'JPEG';
  }
}

class Avatar extends React.Component {
  onResponse = (response) => {
    this.file = {
      uri: response.uri,
      name: response.fileName,
      type: response.type,
    };
  }
  onResizedImageUri = (resizedImageUri) => {
    const { input, onUpload } = this.props;
    this.file.uri = resizedImageUri.uri;
    this.file.name = resizedImageUri.name;
    onUpload(input.name, this.file, this.props);
  }

  renderPhotoUpload() {
    const {
      fileType, input, avatarProps, avatarStyle, isShowUserName, authUser,
    } = this.props;
    return (
      <PhotoUpload
        containerStyle={{ flex: 0 }}
        onResponse={this.onResponse}
        onResizedImageUri={this.onResizedImageUri}
        maxWidth={400}
        maxHeight={400}
        quality={80}
        format={getImageFormat(fileType)}
        {...PHOTO_UPLOAD_CONFIG}
      >
        <MyAvatar
          url={getUserLogoUrl(input.value)}
          showUserName={isShowUserName}
          userName={getUserDisplayName(authUser)}
          nameStyle={styles.nameStyle}
          avatarProps={avatarProps}
          avatarStyle={avatarStyle}
        />
      </PhotoUpload>
    );
  }

  renderMembershipPrivilege() {
    return (
      <Text style={styles.membershipPrivilege}>
        {translate('membershipPrivilege')}
      </Text>
    );
  }
  renderMembershipDate(authUserMembership) {
    const { startDate, endDate } = authUserMembership;
    const memberDate = startDate
      ? `${momentFormat(startDate)} ${AVATAR_DATE_SEPARATOR} ${momentFormat(endDate)}`
      : translate('membershipDateTip');

    return (
      <View style={styles.membershipDate}>
        <Text style={styles.membershipDateText}>{memberDate}</Text>
      </View>
    );
  }
  renderAvatarInfo() {
    const { authUser, authUserMembership, nameStyle } = this.props;
    const { isMembership, level } = authUserMembership;

    const membershipStyle = [styles.membership];
    if (isMembership) membershipStyle.push(styles.isMemberShip);

    const membershipLevel = isMembership ? level : 'buyMemberShip';

    return (
      <TouchableOpacity
        style={styles.avatarInfo}
        onPress={() => Actions.push('member')}
      >
        <View style={membershipStyle}>
          <Image source={membershipImage} style={styles.membershipImage} />
          <Text style={styles.membershipText}>{translate(membershipLevel)}</Text>
          { !isMembership && this.renderMembershipPrivilege()}
        </View>

        <Text style={[styles.userName, nameStyle]}> { getUserDisplayName(authUser) } </Text>
        { isMembership && this.renderMembershipDate(authUserMembership) }
      </TouchableOpacity>
    );
  }

  render() {
    const { itemstyle, isShowAvatarInfo } = this.props;
    const itemstyleNew = [styles.avatarItem, itemstyle];

    return (
      <View style={itemstyleNew}>
        { this.renderPhotoUpload() }
        { isShowAvatarInfo && this.renderAvatarInfo() }
      </View>
    );
  }
}

Avatar.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  onUpload: () => null,
  fileType: 'jpeg',
  avatarProps: {},
  isShowAvatarInfo: true,
  isShowUserName: false,
  itemstyle: {},
  avatarStyle: {},
  nameStyle: {},
  authUser: {},
  authUserMembership: {},
};

Avatar.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  onUpload: PropTypes.func,
  fileType: PropTypes.string,
  avatarProps: PropTypes.object,
  isShowAvatarInfo: PropTypes.bool,
  isShowUserName: PropTypes.bool,
  itemstyle: PropTypes.object,
  avatarStyle: PropTypes.object,
  nameStyle: PropTypes.object,
  authUser: PropTypes.object,
  authUserMembership: PropTypes.object,
};

export default Avatar;
