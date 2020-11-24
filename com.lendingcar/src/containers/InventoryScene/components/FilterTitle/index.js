/**
*
* FilterTitle Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import styles from './styles';

const FilterTitle = (props) => {
  const {
    translateLeft, translateRight,
    leftLabel, rightLabel,
    viewStyle, leftLabelStyle, rightLabelStyle,
  } = props;
  const getLabel = (isTranslate, label) => isTranslate ? translate(label) : label;

  return (
    <View style={[styles.view, viewStyle]}>
      <Text style={[styles.leftLabel, leftLabelStyle]}>
        { getLabel(translateLeft, leftLabel) }
      </Text>
      <Text style={[styles.rightLabel, rightLabelStyle]}>
        { getLabel(translateRight, rightLabel) }
      </Text>
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
