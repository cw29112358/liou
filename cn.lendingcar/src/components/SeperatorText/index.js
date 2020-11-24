/**
*
* SeperatorText Stateless Component
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

const SeperatorText = (props) => {
  const {
    label, showSeperate,
    labelStyle, seperatorStyle,
  } = props;

  const seperator = showSeperate
    ? <View style={[styles.seperator, seperatorStyle]} />
    : null;

  return (
    <View style={styles.content}>
      { seperator }
      <Text style={[styles.footerTitle, labelStyle]}>
        {translate(label)}
      </Text>
      { seperator }
    </View>
  );
};

SeperatorText.defaultProps = {
  label: '',
  showSeperate: '',
  seperatorStyle: {},
  labelStyle: {},
};

SeperatorText.propTypes = {
  label: PropTypes.string,
  showSeperate: PropTypes.any,
  seperatorStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default SeperatorText;
