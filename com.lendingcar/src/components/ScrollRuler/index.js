/**
*
* ScrollRuler Stateless Component
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
  Text,
} from 'native-base';

import sliderImage from './assets/slider.png';
import styles from './styles';

class ScrollRuler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageXTransform: new Animated.Value(0),
      currentOffset: 0,
      activeScale: props.currentScale,
    };
  }
  componentWillMount() {
    const { changeIsScroll } = this.props;
    this.slidePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { imageXTransform, currentOffset } = this.state;
        changeIsScroll();
        imageXTransform.setOffset(currentOffset);
        imageXTransform.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { imageXTransform } = this.state;
        Animated.event([null, { dx: imageXTransform }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (evt, { dx }) => {
        const { imageXTransform } = this.state;
        const { scaleNumber, slideWidth } = this.props;
        const maxWidth = slideWidth - 48;
        const minOffset = Math.round(maxWidth / (scaleNumber - 1));
        const stepNumber = Math.round((dx / slideWidth) * 10);

        this.handBackSlide(stepNumber, minOffset, dx);
        this.handForwardSlide(stepNumber, minOffset);
        if (stepNumber === 0) {
          imageXTransform.setValue(0);
        }
        changeIsScroll();
      },
      onPanResponderTerminate: () => null,
      onShouldBlockNativeResponder: () => true,
    });
  }

  handBackSlide = (stepNumber, minOffset, dx) => {
    const { imageXTransform, currentOffset, activeScale } = this.state;
    const { getPaymentData } = this.props;
    if (stepNumber < 0 && dx < 0) {
      if (Math.abs(stepNumber) < activeScale) {
        const offsetDistance = stepNumber * minOffset;
        this.setState({
          currentOffset: currentOffset + offsetDistance,
          activeScale: activeScale + stepNumber,
        });
        getPaymentData(activeScale + stepNumber);
        Animated.timing(imageXTransform, {
          toValue: offsetDistance,
          duration: 100,
          easing: Easing.inOut(Easing.bounce),
        }).start();
      } else {
        imageXTransform.setValue(0);
        imageXTransform.setOffset(0);
        getPaymentData(0);
        this.setState({
          currentOffset: 0,
          activeScale: 0,
        });
      }
    }
  }
  handForwardSlide = (stepNumber, minOffset) => {
    const { imageXTransform, currentOffset, activeScale } = this.state;
    const { scaleNumber, getPaymentData } = this.props;

    let offsetDistance;
    if (stepNumber < scaleNumber && stepNumber > 0) {
      if (activeScale + stepNumber >= 9) {
        offsetDistance = (9 - activeScale) * minOffset;
      } else {
        offsetDistance = stepNumber * minOffset;
      }
      this.setState({
        currentOffset: currentOffset + offsetDistance,
        activeScale: activeScale + stepNumber >= 9 ? 9 : activeScale + stepNumber,
      });
      getPaymentData(activeScale + stepNumber >= 9 ? 9 : activeScale + stepNumber);
      Animated.timing(imageXTransform, {
        toValue: offsetDistance,
        duration: 100,
        easing: Easing.inOut(Easing.bounce),
      }).start();
    }
  }

  getAnimatedStyles = () => {
    const { slideWidth } = this.props;
    const { imageXTransform } = this.state;

    const maxWidth = slideWidth - 48;
    const marginLeft = imageXTransform.interpolate({
      inputRange: [-1000, 0, maxWidth, maxWidth + 1],
      outputRange: [0, 0, maxWidth, maxWidth],
    });

    const imageAnimatedStyle = {
      marginLeft,
    };
    return [imageAnimatedStyle];
  }

  render() {
    const {
      scaleNumber, singleIntervalNumber,
      circleLabel,
      slideWidth,
    } = this.props;
    const { activeScale, imageXTransform } = this.state;
    const renderCircle = (key) => <View style={activeScale >= key ? styles.activeCircle : styles.circle} key={key} />;
    const renderCircleLabel = (label) => <Text style={styles.circleLabel} key={label}>{label}</Text>;
    const renderSmallScale = (key) => <View style={activeScale >= key ? styles.activeSmallScale : styles.smallScale} key={key} />;

    const totalScale = [];
    for (let i = 0; i <= scaleNumber - 1; i += 1) {
      if (i === 0 || i % (singleIntervalNumber - 1) === 0) {
        totalScale.push(renderCircle(i));
      } else {
        totalScale.push(renderSmallScale(i));
      }
    }

    return (
      <View style={styles.content}>
        <View style={styles.progressContent}>
          <View
            style={[styles.progress, {
              width: slideWidth - 32,
            }]}
          />
          <Animated.View
            style={[
              styles.activeProgress,
              {
                width: imageXTransform,
                maxWidth: slideWidth - 32,
              },
            ]}
          />
          <View
            style={[
              styles.scale,
              {
                width: slideWidth - 32,
              },
            ]}
          >
            {totalScale}
          </View>
          <Animated.Image
            source={sliderImage}
            style={[
              styles.sliderImage,
              this.getAnimatedStyles()[0],
            ]}
            {...this.slidePanResponder.panHandlers}
          />
        </View>
        <View style={styles.circleLabelView}>
          {circleLabel && circleLabel.map((item) => renderCircleLabel(item))}
        </View>
      </View>
    );
  }
}


ScrollRuler.defaultProps = {
  scaleNumber: 10,
  singleIntervalNumber: 4,
  currentScale: 0,
  circleLabel: ['10%', '40%', '70%', '100%'],
  slideWidth: 300,
  getPaymentData: () => null,
  changeIsScroll: () => null,
};

ScrollRuler.propTypes = {
  scaleNumber: PropTypes.number,
  singleIntervalNumber: PropTypes.number,
  currentScale: PropTypes.number,
  circleLabel: PropTypes.array,
  slideWidth: PropTypes.number,
  getPaymentData: PropTypes.func,
  changeIsScroll: PropTypes.func,
};

export default ScrollRuler;
