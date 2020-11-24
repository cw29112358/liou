/**
*
* GuideLayer Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback, View } from 'react-native';

import Mask from 'components/Mask';

import boxImage from './assets/box.png';
import clickImage from './assets/click.png';
import scrollImage from './assets/scroll.png';
import stepOneImage from './assets/stepOne.png';
import stepTwoImage from './assets/stepTwo.png';
import stepThreeImage from './assets/stepThree.png';
import styles from './styles';

const GuideLayer = (props) => {
  const { nextStep, currentStep } = props;
  let imageSource;
  let imageSourceStyle;
  let textImage;
  let textImageStyle;
  switch (currentStep) {
    case 1:
      imageSource = boxImage;
      imageSourceStyle = styles.firstImageSource;
      textImage = stepOneImage;
      textImageStyle = styles.firstTextImage;
      break;
    case 2:
      imageSource = scrollImage;
      imageSourceStyle = styles.secondImageSource;
      textImage = stepTwoImage;
      textImageStyle = styles.secondTextImage;
      break;
    default:
      imageSource = clickImage;
      imageSourceStyle = styles.thirdImageSource;
      textImage = stepThreeImage;
      textImageStyle = styles.thirdTextImage;
      break;
  }
  return (
    <Mask
      style={styles.content}
      childrenStyle={styles.childrenstyle}
    >
      <TouchableWithoutFeedback
        style={styles.childrenstyle}
        onPress={() => nextStep()}
      >
        <View style={styles.childrenstyle}>
          <Image source={imageSource} style={imageSourceStyle} />
          <Image source={textImage} style={textImageStyle} />
        </View>
      </TouchableWithoutFeedback>
    </Mask>
  );
};

GuideLayer.defaultProps = {
  currentStep: 1,
  nextStep: () => null,
};

GuideLayer.propTypes = {
  currentStep: PropTypes.number,
  nextStep: PropTypes.func,
};

export default GuideLayer;
