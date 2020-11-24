/**
*
* CarCard Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  PanResponder,
  Animated,
  View,
} from 'react-native';

import AnimatedCard from 'components/AnimatedCard';

import { TYPE_IMAGES } from './constants';
import styles from './styles';

const { isPad, deviceWidth, itemOffset } = styles;

const leftMargin = isPad ? 115 : 46;
const rightMargin = 50;

export class CarCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: 0,
      enter: new Animated.Value(1),
      currentCardOffset: new Animated.Value(0),
      currentOffset: 0,
    };
  }

  componentWillMount() {
    this.scrollPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { currentCardOffset, currentOffset } = this.state;
        currentCardOffset.setOffset(currentOffset);
        currentCardOffset.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { currentCardOffset } = this.state;
        Animated.event([null, { dx: currentCardOffset }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: this.handlePanResponderRelease,
      onPanResponderTerminate: () => this.handleScrollFail(),
      onShouldBlockNativeResponder: () => true,
    });
  }
  setSafeAnimatedArea =(gestureState) => (
    gestureState.x0 > leftMargin
    && gestureState.x0 < (deviceWidth - rightMargin)
  )
  getCardStyles = () => {
    const {
      currentCardOffset, enter, displayImage,
    } = this.state;
    const { typeOfInventory } = this.props;
    const cardLength = typeOfInventory.length - 1;

    const currentTranslate = itemOffset * displayImage;
    let translateX;
    let translateCarX;
    // 每次位移距离不超过 1/4 的屏宽
    if (displayImage === 0) {
      translateX = currentCardOffset.interpolate({
        inputRange: [-deviceWidth, 0, deviceWidth],
        outputRange: [-deviceWidth, 0, currentTranslate + deviceWidth / 4],
      });
      translateCarX = currentCardOffset.interpolate({
        inputRange: [-deviceWidth, -deviceWidth / 3, 0, deviceWidth],
        outputRange: [-deviceWidth / 4, deviceWidth / 4 - 50, 0, 0],
      });
    } else if (displayImage === cardLength) {
      translateX = currentCardOffset.interpolate({
        inputRange: [-(currentTranslate + deviceWidth), -currentTranslate, -(currentTranslate - deviceWidth)],
        outputRange: [-(currentTranslate + deviceWidth / 4), -currentTranslate, -(currentTranslate - deviceWidth)],
      });
      translateCarX = currentCardOffset.interpolate({
        inputRange: [
          -(currentTranslate + deviceWidth),
          -currentTranslate,
          -currentTranslate + deviceWidth / 3,
          -currentTranslate + deviceWidth,
        ],
        outputRange: [
          -deviceWidth / 4,
          0,
          -deviceWidth / 8,
          -deviceWidth / 4,
        ],
      });
    } else {
      translateX = currentCardOffset;
      translateCarX = currentCardOffset.interpolate({
        inputRange: [-(currentTranslate + deviceWidth), -(currentTranslate + deviceWidth / 3), -currentTranslate],
        outputRange: [-deviceWidth / 4, deviceWidth / 4 - 50, 0],
      });
    }

    const animatedCardStyles = {
      transform: [{ translateX }],
    };

    const animatedCarStyles = {
      transform: [{ translateX: translateCarX }],
    };

    const scale = enter;
    const animatedCardClick = {
      transform: [{ scale }],
    };

    return [animatedCardStyles, animatedCardClick, animatedCarStyles];
  }
  handlePanResponderRelease = (evt, gestureState) => {
    const { typeOfInventory } = this.props;
    const cardLength = typeOfInventory.length - 1;
    const { currentOffset, enter } = this.state;
    // 每次偏移的距离
    const offsetLeft = -itemOffset;
    const offsetRight = itemOffset;
    // 最大的偏移距离
    const maxOffset = itemOffset * cardLength;
    // 当前的偏移距离
    const currentOffsetValue = Math.floor(currentOffset);
    // 现在的偏移距离
    const currentCardOffsetX = Math.floor(gestureState.dx);
    // 触发成功偏移的最小距离
    const minScrollDistance = deviceWidth / 5;
    // 触发动画的有效范围
    const isValidity = this.setSafeAnimatedArea(gestureState);

    if (currentOffsetValue === 0 && currentCardOffsetX > 0) {
      this.handleEdge(0);
    } else if (Math.abs(currentOffsetValue) === maxOffset && currentCardOffsetX < 0) {
      this.handleEdge(maxOffset);
    } else if (currentCardOffsetX > minScrollDistance) {
      this.handleScrollSuccess(offsetRight, 'right', cardLength);
    } else if (currentCardOffsetX < -minScrollDistance) {
      this.handleScrollSuccess(offsetLeft, 'left', cardLength);
    } else {
      this.handleClick(gestureState, isValidity);
      this.handleScrollFail(currentOffsetValue);
    }
    setTimeout(() => Animated.spring(enter, {
      toValue: 1,
    }).start(), 100);
  }
  handleEdge = (offset) => {
    const {
      currentCardOffset,
    } = this.state;
    this.setState({ currentOffset: -offset });
    Animated.spring(currentCardOffset, {
      toValue: 0,
      bounciness: 6,
    }).start();
  }
  handleScrollSuccess = (distance, direction, cardLength) => {
    const {
      currentCardOffset, currentOffset, displayImage,
    } = this.state;
    let currentImage;
    if (direction === 'left') {
      currentImage = displayImage + 1;
    } else {
      currentImage = displayImage - 1;
    }
    this.setState({ currentOffset: distance + currentOffset });
    this.setState({ displayImage: currentImage });

    const bounciness = (currentImage === 0 || currentImage === cardLength) ? 9 : 6;
    Animated.spring(currentCardOffset, {
      toValue: distance,
      bounciness,
    }).start();
  }
  handleClick = (gestureState, isValidity) => {
    const { onFilterCarTypeChange, typeOfInventory } = this.props;
    const { displayImage, enter } = this.state;
    // 因为 iPhone 7 plus 和 iPhoneX 的原因，moveX 不可用
    if (gestureState.dx < 5 && gestureState.dx > -5 && isValidity) {
      Animated.spring(enter, {
        toValue: 0.9,
      }).start();
      setTimeout(() => {
        Actions.push('inventory');
        onFilterCarTypeChange(typeOfInventory[displayImage].type);
      }, 100);
    }
  }
  handleScrollFail = () => {
    const { currentCardOffset } = this.state;
    Animated.spring(currentCardOffset, {
      toValue: 0,
    }).start();
  }

  renderCarImage = (value, index, imageStyle) => {
    const { displayImage } = this.state;
    const imageInfo = TYPE_IMAGES[value.type];
    return (
      <View
        key={`${value.type}_index`}
        {...this.scrollPanResponder.panHandlers}
      >
        <Animated.Image
          source={imageInfo.image}
          style={[
            styles.typeImages[value.type],
            styles.image,
            { height: Math.ceil(imageInfo.size * styles.image.width) },
            imageStyle,
            index === displayImage ? this.getCardStyles()[2] : null,
          ]}
        />
      </View>
    );
  }
  renderCarImages = (typeOfInventory) => {
    const { displayImage } = this.state;
    return (
      <Animated.View
        style={[
          styles.imagesView,
          this.getCardStyles()[0],
        ]}
      >
        {typeOfInventory.map((value, index) => {
          let imageStyle = styles.image;
          if (index < displayImage) imageStyle = styles.prevImage;
          if (index > displayImage) imageStyle = styles.nextImage;

          return this.renderCarImage(value, index, imageStyle);
        })}
      </Animated.View>
    );
  }

  render() {
    const { typeOfInventory, specialButton, authUserMembership: { isMembership } } = this.props;
    const { displayImage } = this.state;
    return (
      <View style={styles.containerView}>
        { !isMembership && specialButton }
        <AnimatedCard
          displayImage={displayImage}
          typeOfInventory={typeOfInventory}
          handleFunc={this.scrollPanResponder}
          getCardStyles={this.getCardStyles}
        />
        {this.renderCarImages(typeOfInventory)}
      </View>
    );
  }
}

CarCard.defaultProps = {
  typeOfInventory: [],
  onFilterCarTypeChange: () => null,
};

CarCard.propTypes = {
  typeOfInventory: PropTypes.array,
  authUserMembership: PropTypes.object.isRequired,
  onFilterCarTypeChange: PropTypes.func,
};

export default CarCard;
