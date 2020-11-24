/**
*
* CarCard Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  PanResponder,
  Animated,
  Easing,
} from 'react-native';
import {
  View,
} from 'native-base';

import CardChargeComponent from '../CardChargeComponent';

import styles from './styles';

export class CardCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardOffset: new Animated.ValueXY(),
      currentOffset: 0,
    };
  }
  componentWillMount() {
    const { itemOffset } = styles;
    const { currentIndex } = this.props;
    const initialPos = -(itemOffset * currentIndex);

    this.scrollPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { currentCardOffset, currentOffset } = this.state;
        const { changeContentScroll } = this.props;
        currentCardOffset.setOffset({
          x: currentOffset,
          y: 0,
        });
        currentCardOffset.setValue({ x: 0, y: 0 });
        changeContentScroll(false);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { currentCardOffset } = this.state;
        Animated.event([null, { dx: currentCardOffset.x }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: this.handlePanResponderRelease,
      onPanResponderTerminate: () => null,
      onShouldBlockNativeResponder: () => true,
    });
    const { currentCardOffset, currentOffset } = this.state;
    this.setState({ currentOffset: initialPos + currentOffset });

    Animated.timing(currentCardOffset, {
      toValue: { x: initialPos, y: 0 },
      duration: 150,
      easing: Easing.linear,
    }).start();
  }

  getCardStyles() {
    const {
      currentCardOffset,
    } = this.state;
    const { currentIndex } = this.props;
    const { list } = this.props;
    const cardLength = list.length - 1;

    const { itemOffset } = styles;
    const currentTranslate = itemOffset * currentIndex;
    let translateX;
    // 每次位移距离不超过 1/3 的屏宽
    if (currentIndex === 0) {
      translateX = currentCardOffset.x.interpolate({
        inputRange: [-styles.deviceWidth, 0, styles.deviceWidth],
        outputRange: [-styles.deviceWidth, 0, currentTranslate + styles.deviceWidth / 3],
      });
    } else if (currentIndex === cardLength) {
      translateX = currentCardOffset.x.interpolate({
        inputRange: [-(currentTranslate + styles.deviceWidth), -currentTranslate, -(currentTranslate - styles.deviceWidth)],
        outputRange: [-(currentTranslate + styles.deviceWidth / 3), -currentTranslate, -(currentTranslate - styles.deviceWidth)],
      });
    } else {
      translateX = currentCardOffset.x;
    }

    const animatedCardStyles = {
      transform: [{ translateX }],
    };

    return [animatedCardStyles];
  }

  handlePanResponderRelease = (evt, gestureState) => {
    const { list, changeContentScroll } = this.props;
    const cardLength = list.length - 1;
    const {
      currentOffset,
    } = this.state;
    // 每次偏移的距离
    const { itemOffset } = styles;

    const offsetLeft = -itemOffset;
    const offsetRight = itemOffset;

    // 最大的偏移距离
    const maxOffset = itemOffset * cardLength;

    // 当前的偏移距离
    const currentOffsetValue = Math.floor(currentOffset);

    // 现在的偏移距离
    const currentCardOffsetX = Math.floor(gestureState.dx); // eslint-disable-line

    // 触发成功偏移的最小距离
    const minScrollDistance = styles.deviceWidth / 10;

    if (currentOffsetValue === 0 && currentCardOffsetX > 0) {
      this.handleEdge(0);
    } else if (Math.abs(currentOffsetValue) === maxOffset && currentCardOffsetX < 0) {
      this.handleEdge(maxOffset);
    } else if (currentCardOffsetX > minScrollDistance) {
      this.handleScrollSuccess(offsetRight, 'right', cardLength);
    } else if (currentCardOffsetX < -minScrollDistance) {
      this.handleScrollSuccess(offsetLeft, 'left', cardLength);
    } else {
      this.handleScrollFail(currentOffsetValue);
    }
    setTimeout(() => { changeContentScroll(true); }, 0);
  }

  handleEdge = (offset) => {
    const {
      currentCardOffset,
    } = this.state;
    this.setState({ currentOffset: -offset });
    Animated.spring(currentCardOffset, {
      toValue: { x: 0, y: 0 },
      bounciness: 6,
    }).start();
  }
  handleScrollSuccess = (distance, direction, cardLength) => {
    const {
      currentCardOffset, currentOffset,
    } = this.state;
    const { setCurrentIndex, currentIndex } = this.props;
    let currentImage;
    if (direction === 'left') {
      currentImage = currentIndex + 1;
    } else {
      currentImage = currentIndex - 1;
    }
    this.setState({ currentOffset: distance + currentOffset });


    setCurrentIndex(currentImage);

    const bounciness = (currentImage === 0 || currentImage === cardLength) ? 9 : 6;
    Animated.spring(currentCardOffset, {
      toValue: { x: distance, y: 0 },
      bounciness,
    }).start();
  }
  handleScrollFail = () => {
    const { currentCardOffset } = this.state;
    Animated.spring(currentCardOffset, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  renderCarItem = (value, index) => {
    const cardStyle = [styles.cardView];
    const itemStyle = [styles.carDetail];
    if (index === 0) {
      itemStyle.push(styles.firstItem);
      cardStyle.push(styles.firstCard);
    } else if (index === 2) {
      itemStyle.push(styles.lastItem);
      cardStyle.push(styles.lastCard);
    }

    return (
      <Animated.View
        key={value.name}
        style={[
          this.getCardStyles()[0],
          cardStyle,
        ]}
        {...this.scrollPanResponder.panHandlers}
      >
        <View style={itemStyle}>
          <CardChargeComponent {...value} level={index} />
        </View>
      </Animated.View>
    );
  }
  render() {
    const { list } = this.props;
    return (
      <View style={[styles.containerView]}>
        <View style={[styles.contentView]}>
          { list.map((value, index) => this.renderCarItem(value, index)) }
        </View>
      </View>
    );
  }
}

CardCharge.defaultProps = {
  list: [],
  currentIndex: 2,
};

CardCharge.propTypes = {
  list: PropTypes.array,
  currentIndex: PropTypes.number,
};

export default CardCharge;
