/**
*
* SystemNews Stateless Component
*
*/

/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';
import {
  TouchableOpacity,
  Image,
} from 'react-native';

import { getImageUrl } from 'utils/helpers';

import styles from './styles';

class SystemNews extends React.Component {
  renderItemTitle = (item) => {
    const { title, createdTime } = item;
    return (
      <View style={styles.titleView}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.time}>{ window.momentFormat(createdTime)}</Text>
      </View>
    );
  };
  renderItemContent = (item) => {
    const { images = [], imageUrls = [] } = item;
    const firstImage = getImageUrl(images[0] || imageUrls[0]);

    return (
      <View style={styles.itemContent}>
        { !!firstImage && <Image url={firstImage} style={styles.image} /> }
        <Text style={styles.message} numberOfLines={3}>{item.message}</Text>
      </View>
    );
  };
  renderItem = (item, onPress) => (
    <TouchableOpacity
      key={item.id || item._id} //eslint-disable-line
      onPress={() => onPress(item)}
      style={[styles.blackShadow, styles.touchableOpacity]}
      activeOpacity={1}
    >
      <View style={styles.item}>
        {this.renderItemTitle(item)}
        {this.renderItemContent(item)}
      </View>
    </TouchableOpacity>
  )

  render() {
    const { list, onPress, onLayoutList } = this.props;

    return (
      <View style={styles.list} onLayout={onLayoutList}>
        { list.map((item) => this.renderItem(item, onPress)) }
      </View>
    );
  }
}

SystemNews.defaultProps = {
  list: [],
  onLayoutList: () => null,
  onPress: () => null,
};

SystemNews.propTypes = {
  list: PropTypes.array,
  onLayoutList: PropTypes.func,
  onPress: PropTypes.func,
};

export default SystemNews;
