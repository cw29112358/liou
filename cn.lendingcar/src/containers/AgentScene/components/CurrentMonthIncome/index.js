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
  const { currentMonthProfit = 0 } = props;
  return (
    <View style={styles.greyBg}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <View style={styles.textWrapper}>
            {translate(currentMonthProfit, 'rmb', styles.originalPrice, true)}
            <Text style={styles.text}>{translate('monthIncome')}</Text>
          </View>
          <Text style={styles.monthIncomeText}>{translate('monthIncomeText')}</Text>
        </View>
        <Button
          primary
          rounded
          style={styles.button}
          onPress={() => Actions.push('incomeDetails')}
        >
          <Text style={styles.buttonText}> {translate('detail')} </Text>
        </Button>
      </View>
    </View>
  );
};

CurrentMonthIncome.defaultProps = {
  currentMonthProfit: 0,
};

CurrentMonthIncome.propTypes = {
  currentMonthProfit: PropTypes.number,
};

export default CurrentMonthIncome;
