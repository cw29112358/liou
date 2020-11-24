/**
*
* Loader Stateless Component
*
*/
/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  Text,
} from 'native-base';

import Mask from 'components/Mask';

import styles from './styles';

const Loader = (props) => {
  const { hasLabel, label, spinnerStyles } = props;

  return (
    <Mask style={styles.spinnerBox} childrenStyle={styles.childrenStyle}>
      <Spinner color={styles.spinnerColor.color} style={[styles.spinner, spinnerStyles]} />
      { hasLabel && <Text style={styles.text}>{translate(label)}</Text> }
    </Mask>
  );
};

Loader.defaultProps = {
  hasLabel: false,
  label: 'loading',
  spinnerStyles: {},
};

Loader.propTypes = {
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  spinnerStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default Loader;
