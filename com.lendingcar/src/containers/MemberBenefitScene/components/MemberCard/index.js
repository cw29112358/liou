/**
*
* CarCard Stateless Component
*
*/
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import isArray from 'lodash/isArray';
import {
  PanResponder,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import { momentFormat } from 'utils/helpers';

import LinearGradientButton from 'components/LinearGradientButton';

import styles from './styles';

export class MemberCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardOffset: new Animated.ValueXY(),
      currentOffset: 0,
      currentIndex: 0,
    };
  }
  componentWillMount() {
    const { itemOffset } = styles;
    const { currentIndex } = this.state;
    const initialPos = -(itemOffset * currentIndex);

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
      onPanResponderTerminate: () => true,
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
  setCurrentIndex = (currentIndex) => {
    this.setState({ currentIndex });
  }
  getCardStyles() {
    const {
      currentCardOffset,
    } = this.state;
    const { currentIndex } = this.state;
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
    const { list } = this.props;
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
      currentCardOffset, currentOffset, currentIndex,
    } = this.state;
    let currentImage;
    if (direction === 'left') {
      currentImage = currentIndex + 1;
    } else {
      currentImage = currentIndex - 1;
    }
    this.setState({ currentOffset: distance + currentOffset });


    this.setCurrentIndex(currentImage);

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
  linkTo = (value) => {
    const {
      isMembership, privilege, memberCardInfo, appoinments,
    } = this.props;
    if (isMembership) {
      if (isArray(appoinments) && appoinments.length > 0 && appoinments[0].status !== 'finished') {
        Actions.push('appointment', {
          privilege,
          appoinment: appoinments[0],
          initPreferDates: appoinments[0].preferDates,
          carInfo: appoinments[0].detail,
          formId: appoinments[0].id,
        });
      } else {
        Actions.push('appointment', {
          privilege,
          carInfo: value,
        });
      }
    } else {
      Actions.push('memberPayment', {
        memberCardInfo,
      });
    }
  }
  renderCarItem = (value, index) => {
    const { isMembership, userCoupons, appoinments } = this.props;
    const { name, image, id } = value;
    let buttonText = isMembership ? 'booking' : 'buttonPrivilege';
    if (isArray(appoinments) && appoinments.length > 0 && appoinments[0].status !== 'finished') buttonText = 'viewBooking';
    const imageSource = { uri: image };
    const cardStyle = [styles.cardView];
    if (index === 0) {
      cardStyle.push(styles.firstCard);
    } else if (index === 2) {
      cardStyle.push(styles.lastCard);
    }
    return (
      <Animated.View
        key={id}
        style={[
          this.getCardStyles()[0],
          cardStyle,
        ]}
      >
        <View
          style={styles.itemStyle}
          {...this.scrollPanResponder.panHandlers}
        >
          <Text style={styles.carTitle}>{name}</Text>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <LinearGradientButton
          linearGradientStyle={styles.button}
          disabled={userCoupons ? !userCoupons.isCurrentPeriod : false}
          onButtonPress={() => this.linkTo(value)}
          buttonLabel={buttonText}
        />
      </Animated.View>
    );
  }
  renderDot = (value, index) => {
    const { currentIndex } = this.state;
    const dotStyle = [styles.dot];
    if (currentIndex === index) {
      dotStyle.push(styles.dotActiveStyle);
    }
    return (
      <View key={value.name} style={dotStyle}></View>
    );
  }

  renderTextNote = () => {
    const { userCoupons, isMembership } = this.props;
    if (isMembership) {
      if (userCoupons.isCurrentPeriod) {
        return translate('timesNote');
      }
      return `${translate('nextTime')}${momentFormat(userCoupons.residualCoupons[0].startDate)}-${momentFormat(userCoupons.residualCoupons[0].endDate)}`;
    }
    return translate('timesNote');
  }
  renderBenefitsNote =() => (
    <View style={styles.noteView}>
      <Text style={styles.noteText}>
        {this.renderTextNote()}
      </Text>
    </View>
  )
  render() {
    const { list, privilege } = this.props;
    return (
      <View style={[styles.containerView]}>
        <View style={[styles.contentView]}>
          { list.map((value, index) => this.renderCarItem(value, index)) }
        </View>
        <View style={styles.dotWrapper}>
          { list.map((value, index) => this.renderDot(value, index)) }
        </View>
        { privilege.type === 'pickup' && this.renderBenefitsNote() }
      </View>
    );
  }
}

MemberCard.defaultProps = {
  list: [],
  isMembership: true,
  privilege: {},
  memberCardInfo: null,
  userCoupons: null,
  appoinments: [],
};

MemberCard.propTypes = {
  list: PropTypes.array,
  isMembership: PropTypes.bool,
  privilege: PropTypes.object,
  memberCardInfo: PropTypes.any,
  userCoupons: PropTypes.object,
  appoinments: PropTypes.array,
};

export default MemberCard;
