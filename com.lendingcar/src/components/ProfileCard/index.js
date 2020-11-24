/**
*
* ProfileCard Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  View,
  Text,
} from 'native-base';
import {
  Image,
} from 'react-native';

import {
  getUserLogoUrl,
  getUserDisplayName,
} from 'utils/helpers';

import { selectAreaList } from 'containers/HomeScene/selectors';

import Avatar from 'components/Avatar';
import TranslateText from 'components/TranslateText';

import locationImage from './assets/location.png';
import industryImage from './assets/industry.png';
import verifiedImage from './assets/verified.png';
import styles from './styles';

class ProfileCard extends React.Component {
  getUserInfo = () => {
    const { user, format } = this.props;
    if (format) return format(user, this.format);
    return this.format(user);
  }
  format = (user) => {
    const { verifiedOccupation, verifiedCompany, verificationStatus } = user;
    const isVerified = verificationStatus === 'verified';

    return {
      url: getUserLogoUrl(user.avatar),
      blackText: getUserDisplayName(user),
      smallBlackText: verificationStatus ? ` / ${verifiedOccupation}` : undefined,
      isVerified,
      greyText: verifiedCompany,
    };
  }

  renderText = (text, style, isTranslate = false) => (
    <TranslateText
      label={text}
      isTranslate={isTranslate}
      style={style}
    />
  );
  renderImageText = (image, text, imageStyle, viewStyle, textStyle) => (
    <View style={[styles.row, viewStyle]}>
      <Image source={image} style={imageStyle} />
      { this.renderText(text, textStyle || styles.imageText, true) }
    </View>
  );

  renderAvatarRow = () => {
    const { user, avatarProps, onPress } = this.props;
    const formatUser = this.getUserInfo(user);
    const { url, avatarRowStyle } = formatUser;

    return (
      <View style={[styles.avatarRow, avatarRowStyle]}>
        <Avatar
          url={url}
          showUserName={false}
          avatarStyle={styles.avatarImage}
          onPress={onPress}
          {...avatarProps}
        />
        { this.renderAvatarRight(formatUser) }
      </View>
    );
  }
  renderAvatarRight = (formatUser) => {
    const {
      blackText, smallBlackText, isVerified, timeText,
      greyText, row2RightChildren,
      row1Style, avatarRightStyle, blackTextStyle, greyTextStyle,
    } = formatUser;

    return (
      <View style={[styles.avatarRight, avatarRightStyle]}>
        <View style={[styles.row, row1Style]}>
          <View style={styles.row}>
            <Text>
              { this.renderText(blackText, [styles.blackText, blackTextStyle]) }
              { this.renderText(smallBlackText, styles.smallBlackText) }
            </Text>
            { isVerified && this.renderImageText(verifiedImage, 'verifyVerified', styles.verifiedImage, undefined, styles.verifiedText)}
          </View>
          { this.renderText(timeText, styles.timeText)}
        </View>
        <View style={[styles.row, row1Style]}>
          { this.renderText(greyText, [styles.greyText, greyTextStyle]) }
          { row2RightChildren }
        </View>
      </View>
    );
  };

  renderAreaRow = () => {
    const { user, areaList } = this.props;
    return (
      <View style={styles.row}>
        { this.renderImageText(locationImage, user.area || areaList[0], styles.locationImage) }
        { this.renderImageText(industryImage, user.industry || 'service', styles.industryImage, styles.industryView) }
      </View>
    );
  }

  render() {
    const { onlyAvatar } = this.props;
    const avatarRow = this.renderAvatarRow();
    if (onlyAvatar) return avatarRow;

    return (
      <View style={styles.content}>
        { avatarRow }
        { this.renderAreaRow() }
      </View>
    );
  }
}

ProfileCard.defaultProps = {
  onlyAvatar: false,
  user: {},
  format: undefined,
  onPress: undefined,
  avatarProps: {},
};

ProfileCard.propTypes = {
  onlyAvatar: PropTypes.bool,
  user: PropTypes.object,
  format: PropTypes.func,
  areaList: PropTypes.array.isRequired,
  onPress: PropTypes.func,
  avatarProps: PropTypes.object,
};


const mapStateToProps = createPropsSelector({
  areaList: selectAreaList,
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(ProfileCard);
