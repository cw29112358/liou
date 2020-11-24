/**
*
* PrivilegeList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import crownImage from 'assets/membership.png';
import arrowImage from './assets/arrow.png';
import styles from './styles';

export class PrivilegeList extends React.Component {
  renderItem(item, listOnPress) {
    const {
      imageLabel, hasCrown, text,
      image, isGrey, greyImage,
      onPress, type,
    } = item;
    const imageStyle = imageLabel ? [styles.bigImage] : [styles.privilegeImage];
    const disabledList = !hasCrown && !!type;
    if (disabledList) {
      imageStyle.push(styles.disabledImage);
    }
    const childViewStyles = [styles.childView];
    if (hasCrown)childViewStyles.push(styles.childViewWithCrown);
    return (
      <TouchableOpacity
        key={text}
        style={childViewStyles}
        disabled={disabledList}
        onPress={() => {
          const func = onPress || listOnPress;
          func(item);
        }}
      >
        <ImageBackground
          style={imageStyle}
          source={isGrey ? greyImage : image}
        >
          { imageLabel && this.renderImageView(imageLabel) }
          { hasCrown && <Image source={crownImage} style={styles.crwon} /> }
        </ImageBackground>
        <Text style={styles.privilegeText}>{translate(text)}</Text>
      </TouchableOpacity>
    );
  }
  renderImageView(label) {
    return (
      <View style={styles.imageTextView}>
        <Text style={styles.imageText}>{translate(label)}</Text>
        <Image source={arrowImage} style={styles.arrow} />
      </View>
    );
  }
  renderList() {
    const {
      list, listStyle, onPress,
    } = this.props;
    const listStyles = [styles.contentPrivilegeView, listStyle];

    return (
      <View style={listStyles}>
        {
          list.map((item) => this.renderItem(item, onPress))
        }
      </View>
    );
  }
  render() {
    return (
      <View style={styles.contentBottomView}>
        <Text style={styles.privilegeTitle}>{translate('privilegeTitle')}</Text>
        { this.renderList() }
      </View>
    );
  }
}

PrivilegeList.defaultProps = {
  list: [],
  onPress: () => null,
  listStyle: {},
};

PrivilegeList.propTypes = {
  list: PropTypes.array,
  onPress: PropTypes.func,
  listStyle: PropTypes.object,
};

export default PrivilegeList;
