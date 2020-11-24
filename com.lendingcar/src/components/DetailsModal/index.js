/**
*
* DetailsModal Stateless Component
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

const DetailsModal = (props) => {
  const { headTitle, contentText } = props;
  return (
    <View>
      <Text style={styles.headTitle}>{translate(headTitle)}</Text>
      <Text style={styles.contentText}>{translate(contentText)}</Text>
    </View>
  );
};

DetailsModal.defaultProps = {
  headTitle: '',
  contentText: '',
};

DetailsModal.propTypes = {
  headTitle: PropTypes.string,
  contentText: PropTypes.string,
};

export default DetailsModal;
