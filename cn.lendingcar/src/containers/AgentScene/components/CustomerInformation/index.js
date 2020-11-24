/**
*
* CurrentMonthIncome Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Button,
  Text,
} from 'native-base';

import styles from './styles';

const CurrentMonthIncome = (props) => {
  const { title } = props;
  return (
    <View style={styles.content}>
      <View style={styles.textContent}>
        <Text style={styles.title}>{translate(title)}</Text>
      </View>
      <Button
        primary
        rounded
        style={styles.button}
        onPress={() => Actions.push('userInfo')}
      >
        <Text style={styles.buttonText}> {translate('detail')} </Text>
      </Button>
    </View>
  );
};

CurrentMonthIncome.defaultProps = {
  title: '',
};

CurrentMonthIncome.propTypes = {
  title: PropTypes.string,
};

export default CurrentMonthIncome;
