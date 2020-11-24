/**
*
* AnimatedCard Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  PanResponder,
  Animated,
} from 'react-native';
import {
  View,
} from 'native-base';

import { executeFunction } from 'utils/helpers';
import styles from './styles';
const { deviceWidth } = styles;

class AnimatedCard extends React.Component {
  constructor(props) {
    super(props);

    const { index, cardWidth, cardMarginRight } = props;
    this.cardSlideWdith = cardWidth + cardMarginRight;
    this.state = {
      currentIndex: index,
      cardTranslateX: new Animated.Value(0),
    };
  }
  componentWillMount() {
    this.scrollPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { cardTranslateX } = this.state;
        cardTranslateX.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { cardTranslateX } = this.state;
        Animated.event([null, { dx: cardTranslateX }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: this.handlePanResponderRelease,
      onPanResponderTerminate: () => true,
      onShouldBlockNativeResponder: () => true,
    });
  }

  handlePanResponderRelease = (evt, gestureState) => {
    const { list, cardWidth } = this.props;
    const { currentIndex, cardTranslateX } = this.state;
    const { dx } = gestureState;

    const triggerWidth = cardWidth / 3;
    const isRight = dx > 0;// 右滑，currentIndex减小

    if ((currentIndex === 0 && isRight)
    || (currentIndex === list.length - 1 && !isRight)) {
      this.animatedCardTranslateX(0);
    } else if (Math.abs(dx) > triggerWidth) {
      const addIndex = isRight ? -1 : 1;
      const targetCurrentIndex = currentIndex + addIndex;
      const targetTranslateX = -this.cardSlideWdith * addIndex;
      this.animatedCardTranslateX(targetTranslateX, () => {
        cardTranslateX.setValue(0);
        this.setState({
          currentIndex: targetCurrentIndex,
        });
      });
    } else {
      this.animatedCardTranslateX(0);
    }
  }

  animatedCardTranslateX = (toValue, callback) => {
    const { cardTranslateX } = this.state;
    Animated.spring(cardTranslateX, {
      toValue,
      bounciness: 6,
    }).start(() => {
      executeFunction(callback);
    });
  }

  renderCard({
    Card, item, index, cardWidth, cardMarginRight,
  }) {
    return (
      <Animated.View
        key={index}
        style={{
          width: cardWidth,
          marginRight: cardMarginRight,
        }}
        {...this.scrollPanResponder.panHandlers}
      >
        <Card item={item} />
      </Animated.View>
    );
  }
  render() {
    const {
      list, card: Card, cardWidth, cardMarginRight,
    } = this.props;
    const { currentIndex, cardTranslateX } = this.state;
    const paddingLeft = (deviceWidth - cardWidth) / 2;
    const basicTranslateX = -currentIndex * this.cardSlideWdith;

    return (
      <View style={{ width: deviceWidth }}>
        <Animated.View
          style={[
            styles.list,
            {
              marginLeft: basicTranslateX,
              width: deviceWidth * list.length,
              transform: [{
                translateX: cardTranslateX,
              }],
              paddingLeft,
            },
          ]}
        >
          {
            list.map((item, index) => this.renderCard({
              Card, item, index, cardWidth, cardMarginRight,
            }))
          }
        </Animated.View>
      </View>
    );
  }
}

AnimatedCard.defaultProps = {
  list: [],
  index: 0,
  card: <View />,
  cardWidth: styles.cardWidth,
  cardMarginRight: 20,
};

AnimatedCard.propTypes = {
  list: PropTypes.array,
  index: PropTypes.number,
  card: PropTypes.func,
  cardWidth: PropTypes.number,
  cardMarginRight: PropTypes.number,
};

export default AnimatedCard;
