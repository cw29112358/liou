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
    const {
      slideWidth, scales, sliderImagesValue,
    } = props;
    // width of image sliding
    this.imageSlidingWidth = slideWidth - 32;
    // The total number of interval
    this.maxStep = scales.length - 1;
    // the distance between the scales
    this.minOffset = Math.round(this.imageSlidingWidth / this.maxStep);
    // left sliderImage position
    const leftActiveScale = this.getInitialActiveScale(sliderImagesValue[0], 'left');
    // right sliderImage position
    const rightActiveScale = this.getInitialActiveScale(sliderImagesValue[1], 'right');
    // left sliderImage offset
    const imageLeftOffset = this.minOffset * leftActiveScale;
    // right sliderImage offset
    const imageRightOffset = this.minOffset * rightActiveScale;
    this.state = {
      imageLeftTransform: new Animated.Value(imageLeftOffset),
      imageRightTransform: new Animated.Value(imageRightOffset),
      imageRightOffset,
      imageLeftOffset,
      leftActiveScale,
      rightActiveScale,
    };
  }
  componentWillMount() {
    const { changeIsScroll } = this.props;
    this.leftImagesPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { imageLeftTransform, imageLeftOffset } = this.state;
        changeIsScroll();
        imageLeftTransform.setOffset(imageLeftOffset);
        imageLeftTransform.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { imageLeftTransform, leftActiveScale, rightActiveScale } = this.state;
        const dx = this.animatedMove(0, rightActiveScale - 1, leftActiveScale, gestureState, imageLeftTransform);
        Animated.event([null, { dx }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (evt, { dx }) => {
        const { imageLeftTransform } = this.state;
        // get the number of intervals the user has moved
        const stepNumber = this.getUserMoveStep(dx);
        // judge left or right sliding
        if (stepNumber < 0 && dx < 0) {
          // left sliding
          this.handBackSlide(imageLeftTransform, 'imageLeftOffset', stepNumber, 'leftActiveScale');
        } else {
          // right sliding
          this.handForwardSlide(imageLeftTransform, 'imageLeftOffset', stepNumber, 'leftActiveScale');
        }
        changeIsScroll();
      },
      onPanResponderTerminate: () => null,
      onShouldBlockNativeResponder: () => true,
    });
    this.rightImagesPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { imageRightTransform, imageRightOffset } = this.state;
        changeIsScroll();
        imageRightTransform.setOffset(imageRightOffset);
        imageRightTransform.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        const { imageRightTransform, leftActiveScale, rightActiveScale } = this.state;
        const dx = this.animatedMove(leftActiveScale + 1, this.maxStep, rightActiveScale, gestureState, imageRightTransform);
        Animated.event([null, { dx }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (evt, { dx }) => {
        const { imageRightTransform } = this.state;
        // get the number of intervals the user has moved
        const stepNumber = this.getUserMoveStep(dx);
        // judge left or right sliding
        if (stepNumber < 0 && dx < 0) {
          this.handBackSlide(imageRightTransform, 'imageRightOffset', stepNumber, 'rightActiveScale');
        } else {
          this.handForwardSlide(imageRightTransform, 'imageRightOffset', stepNumber, 'rightActiveScale');
        }

        changeIsScroll();
      },
      onPanResponderTerminate: () => null,
      onShouldBlockNativeResponder: () => true,
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      leftActiveScale, rightActiveScale,
    } = this.state;
    // next image position
    const nextLeftActiveScale = this.getInitialActiveScale(nextProps.sliderImagesValue[0], 'left');
    const nextRightActiveScale = this.getInitialActiveScale(nextProps.sliderImagesValue[1], 'right');
    if (leftActiveScale !== nextLeftActiveScale || nextRightActiveScale !== rightActiveScale) {
      const nextImageLeftOffset = this.minOffset * nextLeftActiveScale;
      const nextImageRightOffset = this.minOffset * nextRightActiveScale;
      this.setState({
        imageRightOffset: nextImageRightOffset,
        imageLeftOffset: nextImageLeftOffset,
        leftActiveScale: nextLeftActiveScale,
        rightActiveScale: nextRightActiveScale,
        imageLeftTransform: new Animated.Value(nextImageLeftOffset),
        imageRightTransform: new Animated.Value(nextImageRightOffset),
      });
    }
  }
  animatedMove = (start, end, current, gestureState, animatedValue) => {
    const startDistance = start * this.minOffset;
    const endDistance = end * this.minOffset;
    const moveDistance = gestureState.dx + current * this.minOffset;
    if (moveDistance <= startDistance) {
      // move start
      return start;
    } if (moveDistance >= endDistance) {
      // move end
      return end;
    }
    return animatedValue;
  }
  getUserMoveStep = (dx) => {
    const { slideWidth } = this.props;
    return Math.round((dx / slideWidth) * this.maxStep);
  }
  getInitialActiveScale = (value, positionKey) => {
    const { scales } = this.props;
    const initialPosition = scales.findIndex((scale) => scale.value === value);
    if (initialPosition <= 0) {
      if (positionKey === 'left') {
        return 0;
      }
      return this.maxStep;
    }
    return initialPosition;
  }
  handBackSlide = (animatedValue, offsetKey, stepNumber, scaleKey) => {
    /** @param {Animated} animatedValue the animated value corresponding to the image;
     * @param {String} offsetKey record offset key corresponding to the image;
     * @param {Number} stepNumber the number of intervals the user has moved corresponding to the image;
     * @param {String} scaleKey record scale key corresponding to the image;
     */
    const {
      [scaleKey]: activeScale,
      [offsetKey]: currentOffset,
      leftActiveScale,
    } = this.state;

    let moveToStep = activeScale + stepNumber;
    if (moveToStep < 0) moveToStep = 0;
    // left image must not exceed or overlap with the right image
    if (offsetKey === 'imageRightOffset' && moveToStep <= leftActiveScale + 1) {
      moveToStep = leftActiveScale + 1;
    }
    const offsetDistance = (moveToStep - activeScale) * this.minOffset;
    this.setState({
      [offsetKey]: currentOffset + offsetDistance,
      [scaleKey]: moveToStep,
    });
    Animated.timing(animatedValue, {
      toValue: offsetDistance,
      duration: 100,
      easing: Easing.inOut(Easing.bounce),
    }).start();
    this.handleFilter(moveToStep, scaleKey);
  }
  handForwardSlide = (animatedValue, offsetKey, stepNumber, scaleKey) => {
    const {
      [scaleKey]: activeScale,
      [offsetKey]: currentOffset,
      rightActiveScale,
    } = this.state;
    let moveToStep = activeScale + stepNumber;
    if (moveToStep > this.maxStep) moveToStep = this.maxStep;
    // left image must not exceed or overlap with the right image
    if (offsetKey === 'imageLeftOffset' && moveToStep >= rightActiveScale - 1) {
      moveToStep = rightActiveScale - 1;
    }
    const offsetDistance = (moveToStep - activeScale) * this.minOffset;
    this.setState({
      [offsetKey]: currentOffset + offsetDistance,
      [scaleKey]: moveToStep,
    });
    Animated.timing(animatedValue, {
      toValue: offsetDistance,
      duration: 100,
      easing: Easing.inOut(Easing.bounce),
    }).start();
    this.handleFilter(moveToStep, scaleKey);
  }

  handleFilter = (moveStep, scaleKey) => {
    const { changeFilter, scales } = this.props;
    const { leftActiveScale, rightActiveScale } = this.state;
    let leftPrice;
    let rightPrice;
    if (scaleKey === 'leftActiveScale') {
      leftPrice = scales[moveStep].value;
      rightPrice = scales[rightActiveScale].value;
    } else {
      leftPrice = scales[leftActiveScale].value;
      rightPrice = scales[moveStep].value;
    }
    const priceRange = [leftPrice, rightPrice];
    changeFilter('priceRange', priceRange);
  }

  getAnimatedStyles = () => {
    const { imageLeftTransform, imageRightTransform } = this.state;
    const formatObject = {
      inputRange: [-1000, 0, this.imageSlidingWidth, this.imageSlidingWidth + 1],
      outputRange: [0, 0, this.imageSlidingWidth, this.imageSlidingWidth],
    };

    const leftImagePosition = imageLeftTransform.interpolate(formatObject);
    const rightImagePosition = imageRightTransform.interpolate(formatObject);
    // subtract func is not exist, so use the add and multiply func to calcula the width
    const progressActiveWidth = Animated.add(imageRightTransform, Animated.multiply(imageLeftTransform, -1));

    const leftImageAnimatedStyle = {
      marginLeft: leftImagePosition,
    };
    const rightImageAnimatedStyle = {
      marginLeft: rightImagePosition,
    };
    const progressActive = {
      width: progressActiveWidth,
      marginLeft: leftImagePosition,
    };
    return [
      leftImageAnimatedStyle,
      rightImageAnimatedStyle,
      progressActive,
    ];
  }

  // ruler line
  renderProgress = () => <View style={styles.progress} />
  // active ruler line
  renderActiveProgress = () => (
    <Animated.View
      style={[
        styles.activeProgress,
        this.getAnimatedStyles()[2],
      ]}
    />
  )
  // scale
  renderScale = (key) => <View style={styles.scale} key={key} />
  // ruler Scales
  renderRulerScales = () => {
    const totalScale = [];
    // set scale
    for (let i = 0; i <= this.maxStep; i += 1) {
      if (i === 0 || i === this.maxStep) {
        // the scale start and end style.
        totalScale.push(<View key={i} />);
      } else {
        // the scale style
        totalScale.push(this.renderScale(i));
      }
    }
    return (
      <View style={[styles.scales, { width: '100%' }]}>
        {totalScale}
      </View>
    );
  }
  renderImage = (panResponder, animatedStyles) => (
    <Animated.Image
      source={sliderImage}
      style={[
        styles.sliderImage,
        animatedStyles,
      ]}
      {...panResponder.panHandlers}
    />
  )
  renderScaleLabel = (scales) => {
    const { slideWidth } = this.props;
    const { leftActiveScale, rightActiveScale } = this.state;
    return (
      <View style={[styles.scaleLabelView, { width: slideWidth }]}>
        <Text style={styles.scaleLabel}>{scales[leftActiveScale].label}</Text>
        <Text style={styles.scaleLabel}>{scales[rightActiveScale].label}</Text>
      </View>
    );
  }
  render() {
    const { slideWidth, scales } = this.props;
    return (
      <View style={styles.progressContainer}>
        { this.renderScaleLabel(scales) }
        <View style={[styles.progressContent, { width: slideWidth }]}>
          { this.renderProgress() }
          { this.renderActiveProgress() }
          { this.renderRulerScales() }
          { this.renderImage(this.leftImagesPanResponder, this.getAnimatedStyles()[0]) }
          { this.renderImage(this.rightImagesPanResponder, this.getAnimatedStyles()[1]) }
        </View>
      </View>
    );
  }
}


ScrollRuler.defaultProps = {
  scales: [],
  slideWidth: styles.deviceWidth,
  sliderImagesValue: [],
  changeIsScroll: () => null,
  changeFilter: () => null,
};

ScrollRuler.propTypes = {
  // an array of scales label and value
  scales: PropTypes.array,
  // scale length
  slideWidth: PropTypes.number,
  // sliderImages position value
  sliderImagesValue: PropTypes.array,
  // the parent content ScrollEnabled control func
  changeIsScroll: PropTypes.func,
  // filter cars func
  changeFilter: PropTypes.func,
};

export default ScrollRuler;
