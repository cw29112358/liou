/**
*
* AnimatedCard Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Animated,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import backgroundImage from './assets/backgroundImage.png';
import ipadImage from './assets/ipadImage.png';
import styles from './styles';

class AnimatedCard extends React.PureComponent {
  renderCarInfo = (value, index, itemStyle) => {
    const { displayImage, handleFunc, getCardStyles } = this.props;
    return (
      <Animated.View
        style={[
          itemStyle,
          index === displayImage ? getCardStyles()[1] : null,
        ]}
        {...handleFunc.panHandlers}
      >
        <Image
          source={styles.isPad ? ipadImage : backgroundImage}
          style={[styles.backgroundImage]}
        />
        <View style={styles.introduction}>
          <Text style={styles.typeText}>{translate(value.type)}</Text>
          <Text style={styles.sizeText}>
            {translate(value.size, 'number')}
            <Text style={styles.unit}> {translate('cars')}</Text>
          </Text>
        </View>
      </Animated.View>
    );
  }

  render() {
    const { getCardStyles, typeOfInventory } = this.props;

    return typeOfInventory.map((value, index) => {
      const cardStyle = [styles.cardView];
      const itemStyle = [styles.carDetail];
      if (index === 0) {
        itemStyle.push(styles.firstItem);
        cardStyle.push(styles.firstCard);
      }
      if (index === 4) {
        itemStyle.push(styles.lastItem);
        cardStyle.push(styles.lastCard);
      }
      return (
        <Animated.View
          key={value.type}
          style={[
            getCardStyles()[0],
            cardStyle,
          ]}
        >
          {this.renderCarInfo(value, index, itemStyle)}
        </Animated.View>
      );
    });
  }
}

AnimatedCard.defaultProps = {
  typeOfInventory: [],
  displayImage: 0,
  getCardStyles: undefined,
  handleFunc: undefined,
};

AnimatedCard.propTypes = {
  // 车辆类型数组
  typeOfInventory: PropTypes.array,
  // 当前展示的图片
  displayImage: PropTypes.number,
  // 函数类型，返回 animated 样式数组
  getCardStyles: PropTypes.func,
  // PanResponder create 函数
  handleFunc: PropTypes.object,
};

export default AnimatedCard;
