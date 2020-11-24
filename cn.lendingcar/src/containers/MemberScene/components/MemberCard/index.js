/**
*
* CarCard Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  PanResponder,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {
  View,
  Text,
  Button,
} from 'native-base';

import MemberCardComponent from 'components/MemberCard';

import PrivilegeList from '../PrivilegeList';

import ribbonImage from './assets/ribbon.png';
import styles from './styles';

export class MemberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: 0,
      enter: new Animated.Value(0.6),
      currentCardOffset: new Animated.ValueXY(),
      currentOffset: 0,
    };
  }
  componentWillMount() {
    const { itemOffset } = styles;
    const { levelNumber } = this.props;
    const initialPos = -(itemOffset * levelNumber);
    this.scrollPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { currentCardOffset, currentOffset } = this.state;
        currentCardOffset.setOffset({
          x: currentOffset,
          y: 0,
        });
        currentCardOffset.setValue({ x: 0, y: 0 });
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
    const { currentCardOffset, currentOffset, enter } = this.state;
    this.setState({ currentOffset: initialPos + currentOffset });
    Animated.timing(currentCardOffset, {
      toValue: { x: initialPos, y: 0 },
      duration: 150,
      easing: Easing.linear,
    }).start();
    Animated.spring(enter, {
      toValue: 1,
    }).start();
    this.setState({
      displayImage: levelNumber,
    });
  }

  getCardStyles() {
    const {
      currentCardOffset, enter, displayImage,
    } = this.state;
    const { membershipPrice } = this.props;
    const cardLength = membershipPrice.length - 1;

    const { itemOffset } = styles;
    const currentTranslate = itemOffset * displayImage;
    let translateX;
    // 每次位移距离不超过 1/3 的屏宽
    if (displayImage === 0) {
      translateX = currentCardOffset.x.interpolate({
        inputRange: [-styles.deviceWidth, 0, styles.deviceWidth],
        outputRange: [-styles.deviceWidth, 0, currentTranslate + styles.deviceWidth / 3],
      });
    } else if (displayImage === cardLength) {
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

    const scale = enter;
    const animatedCardClick = {
      transform: [{ scale }],
    };

    return [animatedCardStyles, animatedCardClick];
  }

  handlePanResponderRelease = (evt, gestureState) => {
    const { membershipPrice } = this.props;
    const cardLength = membershipPrice.length - 1;
    const {
      currentOffset, enter,
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
    const currentCardOffsetX = Math.floor(gestureState.dx);

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
      toValue: { x: 0, y: 0 },
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
      toValue: { x: distance, y: 0 },
      bounciness,
    }).start();
  }
  handleScrollFail = () => {
    const {
      currentCardOffset,
    } = this.state;
    Animated.spring(currentCardOffset, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  renderCarItem = (value, index) => {
    const cardStyle = [styles.cardView];
    const itemStyle = [styles.carDetail];
    const { displayImage } = this.state;
    if (index === 0) {
      itemStyle.push(styles.firstItem);
      cardStyle.push(styles.firstCard);
    } else if (index === 2) {
      itemStyle.push(styles.lastItem);
      cardStyle.push(styles.lastCard);
    }

    return (
      <Animated.View
        key={value.level}
        style={[
          this.getCardStyles()[0],
          cardStyle,
        ]}
        {...this.scrollPanResponder.panHandlers}
      >
        <Animated.View
          style={[
            itemStyle,
            index === displayImage ? this.getCardStyles()[1] : { transform: [{ scale: 0.93 }] },
          ]}
        >
          <MemberCardComponent {...value} />
        </Animated.View>
      </Animated.View>
    );
  }

  renderMemberPrivilege = (isMembership) => {
    const { displayImage } = this.state;
    const { openPrivilegeModal, modalVisible, closeModal } = this.props;
    return (
      <PrivilegeList
        displayImage={displayImage}
        membership={!isMembership}
        openPrivilegeModal={openPrivilegeModal}
        closeModal={closeModal}
        modalVisible={modalVisible}
      />
    );
  }
  renderRibbonImage() {
    return (
      <Image
        source={ribbonImage}
        resizeMode="contain"
        style={styles.ribbonImage}
      />
    );
  }
  renderPaymentButton(currentCardInfo) {
    return (
      <Button
        rounded
        style={styles.buttonPrivilege}
        onPress={() => Actions.push('memberPayment', {
          memberCardInfo: currentCardInfo,
        })}
      >
        <Text style={styles.buttonText}>{translate('buttonPrivilege')}</Text>
      </Button>
    );
  }
  render() {
    const { isMembership, membershipPrice } = this.props;
    const { displayImage } = this.state;
    const isDeluxe = displayImage === 2;
    const containerView = isDeluxe
      ? styles.containerYellowView
      : styles.containerWhiteView;
    const currentCardInfo = membershipPrice[displayImage];

    return (
      <View style={[styles.containerView, containerView]}>
        <View style={[styles.contentView]}>
          { membershipPrice.map((value, index) => this.renderCarItem(value, index)) }
        </View>
        { isDeluxe && this.renderRibbonImage() }
        { this.renderMemberPrivilege(isMembership) }
        { !isMembership && this.renderPaymentButton(currentCardInfo) }
      </View>
    );
  }
}

MemberCard.defaultProps = {
  isMembership: false,
  membershipPrice: [{
    level: 'basic',
    paymentAmount: 4999,
  },
  {
    level: 'premium',
    paymentAmount: 8999,
  },
  {
    level: 'deluxe',
    paymentAmount: 10999,
  }],
  levelNumber: 2,
  openPrivilegeModal: () => null,
  closeModal: () => null,
  modalVisible: false,
};

MemberCard.propTypes = {
  isMembership: PropTypes.bool,
  membershipPrice: PropTypes.array,
  levelNumber: PropTypes.number,
  openPrivilegeModal: PropTypes.func,
  closeModal: PropTypes.func,
  modalVisible: PropTypes.bool,
};

export default MemberCard;
