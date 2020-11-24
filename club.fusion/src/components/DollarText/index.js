/**
*
* DollarText Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const DollarText = (props) => {
  const { value, priceStyle, isFixed } = props;
  const tradingString = Number(value) >= 0 ? '$' : '-$';
  const handleValue = isFixed ? Math.abs(value).toFixed(2) : Math.abs(value);
  return (
    <Text style={priceStyle.priceText}>
      <Text style={priceStyle.dollarUnit}>{tradingString}</Text>
      {translate(handleValue, 'number')}
    </Text>
  );
};

DollarText.defaultProps = {
  value: 0,
  priceStyle: {},
  isFixed: false,
};

DollarText.propTypes = {
  value: PropTypes.any,
  priceStyle: PropTypes.object,
  isFixed: PropTypes.bool,
};

export default DollarText;
