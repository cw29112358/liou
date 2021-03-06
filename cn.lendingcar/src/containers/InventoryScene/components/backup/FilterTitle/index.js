/**
*
* FilterTitle Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';

import TranslateText from 'components/TranslateText';

import styles from './styles';

const FilterTitle = (props) => {
  const {
    translateLeft, translateRight,
    leftLabel, rightLabel,
    viewStyle, leftLabelStyle, rightLabelStyle,
  } = props;

  return (
    <View style={[styles.view, viewStyle]}>
      <TranslateText isTranslate={translateLeft} label={leftLabel} style={[styles.leftLabel, leftLabelStyle]} />
      <TranslateText isTranslate={translateRight} label={rightLabel} style={[styles.rightLabel, rightLabelStyle]} />
    </View>
  );
};

FilterTitle.defaultProps = {
  translateLeft: true,
  translateRight: true,
  leftLabel: '',
  rightLabel: '',
  viewStyle: {},
  leftLabelStyle: {},
  rightLabelStyle: {},
};

FilterTitle.propTypes = {
  translateLeft: PropTypes.bool,
  translateRight: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  viewStyle: PropTypes.object,
  leftLabelStyle: PropTypes.object,
  rightLabelStyle: PropTypes.object,
};

export default FilterTitle;
