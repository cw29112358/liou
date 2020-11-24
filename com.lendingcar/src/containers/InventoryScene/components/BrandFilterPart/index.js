/**
*
* BrandFilterPart Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import FiterBar from 'components/FilterBar';

import styles from './styles';

const BrandFilterPart = (props) => {
  const { title, ...otherProps } = props;

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{translate(title)}</Text>
      <FiterBar
        {...otherProps}
        buttonViewStyle={styles.buttonView}
        buttonStyle={styles.button}
      />
    </View>
  );
};

BrandFilterPart.defaultProps = {
  title: '',
  options: [],
};

BrandFilterPart.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
};

export default BrandFilterPart;
