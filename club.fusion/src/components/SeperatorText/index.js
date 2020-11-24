/**
*
* SeperatorText Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';

import TranslateText from 'components/TranslateText';
import styles from './styles';

const SeperatorText = (props) => {
  const {
    label, showSeperate,
    viewStyle, labelStyle, seperatorStyle,
  } = props;

  const seperator = showSeperate
    ? <View style={[styles.seperator, seperatorStyle]} />
    : null;

  return (
    <View style={[styles.content, viewStyle]}>
      { seperator }
      <TranslateText
        label={label}
        style={[styles.footerTitle, labelStyle]}
      />
      { seperator }
    </View>
  );
};

SeperatorText.defaultProps = {
  label: '',
  showSeperate: '',
  viewStyle: {},
  seperatorStyle: {},
  labelStyle: {},
};

SeperatorText.propTypes = {
  label: PropTypes.string,
  showSeperate: PropTypes.any,
  viewStyle: PropTypes.object,
  seperatorStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default SeperatorText;
