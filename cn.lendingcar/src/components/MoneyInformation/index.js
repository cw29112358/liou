/**
*
* MoneyInformation Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button,
  Text,
} from 'native-base';

import { MONEY_UNIT } from 'utils/constants';

import styles from './styles';

const MoneyInformation = (props) => {
  const {
    dataList, divider, verticalLine,
    contentStyle, cellStyle, cellLabelStyle, cellValueStyle,
  } = props;
  const cells = [];
  if (dataList.length > 0) {
    for (let i = 1; i <= dataList.length; i += 1) {
      const { value = 0 } = dataList[i - 1];
      const { label } = dataList[i - 1];
      const tradingString = value >= 0 ? 'unit' : 'negativeUnit';
      const clickEvent = dataList[i - 1].linkTo;
      cells.push(
        <Button
          key={i}
          style={[styles.cellView, cellStyle]}
          onPress={clickEvent || null}
          disabled={!clickEvent}
        >
          <Text style={[styles.cellValue, cellValueStyle]}>
            {`${MONEY_UNIT[tradingString]}${Math.abs(value).toFixed(2)}`}
          </Text>
          <Text style={[styles.cellLabel, cellLabelStyle]}>
            {translate(label)}
          </Text>
        </Button>
      );
      if (cells.length < dataList.length) {
        const dividerComponent = divider || <View key={i + 10} style={[styles.verticalLine, verticalLine]} />;
        cells.push(dividerComponent);
      }
    }
  }

  return (
    <View style={[styles.cellViewLine, contentStyle]}>
      { cells }
    </View>
  );
};

MoneyInformation.defaultProps = {
  dataList: [],
  divider: null,
  contentStyle: null,
  cellStyle: null,
  cellLabelStyle: null,
  cellValueStyle: null,
  verticalLine: null,
};

MoneyInformation.propTypes = {
  dataList: PropTypes.array,
  divider: PropTypes.node,
  contentStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  cellStyle: PropTypes.object,
  cellLabelStyle: PropTypes.object,
  cellValueStyle: PropTypes.object,
  verticalLine: PropTypes.object,
};

export default MoneyInformation;
