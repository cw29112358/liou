/**
*
* ProfileCard Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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

import Avatar from 'components/Avatar';
import TranslateText from 'components/TranslateText';

import locationImage from './assets/location.png';
import industryImage from './assets/industry.png';
import verifiedImage from './assets/verified.png';
import styles from './styles';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rightRow1LeftWidth: 170,
      verifiedViewWidth: 0,
    };
  }

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
  onLayout = (e, key) => {
    const { nativeEvent: { layout: { width } } } = e;
    if (key) this.setState({ [`${key}Width`]: width });
  }

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
  renderAvatarRight = (formatUser) => (
    <View style={[styles.avatarRight, formatUser.avatarRightStyle]}>
      { this.renderRightRow1(formatUser) }
      { this.renderRightRow2(formatUser) }
    </View>
  );
  renderRightRow1({
    blackText, smallBlackText, isVerified, timeText,
    row1Style, blackTextStyle,
  }) {
    const { rightRow1LeftWidth, verifiedViewWidth } = this.state;
    const maxWidth = rightRow1LeftWidth - verifiedViewWidth;

    return (
      <View style={[styles.row, row1Style]}>
        <View style={[styles.row, { flex: 1 }]} onLayout={(e) => this.onLayout(e, 'rightRow1Left')}>
          <Text numberOfLines={1} style={{ maxWidth }}>
            { this.renderText(blackText, [styles.blackText, blackTextStyle]) }
            { this.renderText(smallBlackText, styles.smallBlackText) }
          </Text>
          { isVerified && this.renderImageText({
            image: verifiedImage,
            text: 'verifyVerified',
            viewStyle: undefined,
            imageStyle: styles.verifiedImage,
            textStyle: styles.verifiedText,
            viewLayout: (e) => this.onLayout(e, 'verifiedView'),
          })}
        </View>
        { this.renderText(timeText, styles.timeText)}
      </View>
    );
  }
  renderRightRow2({
    greyText, row1Style, greyTextStyle, row2RightChildren,
  }) {
    return (
      <View style={[styles.row, row1Style]}>
        { this.renderText(greyText, [styles.greyText, greyTextStyle]) }
        { row2RightChildren }
      </View>
    );
  }

  renderAreaRow = () => {
    const { user } = this.props;
    const list = [
      {
        key: 1,
        image: locationImage,
        text: user.area,
        imageStyle: styles.locationImage,
      },
      {
        key: 2,
        image: industryImage,
        text: user.industry,
        viewStyle: styles.industryView,
        imageStyle: styles.industryImage,
      },
    ];

    return (
      <View style={styles.row}>
        { list.map((item) => this.renderImageText(item))}
      </View>
    );
  }
  renderImageText = ({
    key, image, text,
    viewStyle, imageStyle, textStyle,
    viewLayout,
  }) => (
    <View key={key} style={[styles.row, viewStyle]} onLayout={viewLayout}>
      <Image source={image} style={imageStyle} />
      { this.renderText(text || 'unKnown', textStyle || styles.imageText, true) }
    </View>
  );
  renderText = (text, style, isTranslate = false) => (
    <TranslateText
      label={text}
      isTranslate={isTranslate}
      style={style}
    />
  );


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
  onPress: PropTypes.func,
  avatarProps: PropTypes.object,
};

export default ProfileCard;
