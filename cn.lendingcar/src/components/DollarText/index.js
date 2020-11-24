/**
*
* DollarText Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

import { MONEY_UNIT_ALL } from 'utils/constants';

const DollarText = (props) => {
  const {
    value, priceStyle, rmb, isFixed,
  } = props;
  const unitPrefix = Number(value) >= 0 ? '' : 'negative';
  const unitString = rmb ? `${unitPrefix}rmb` : `${unitPrefix}dollar`;
  const handleValue = isFixed ? Math.abs(value).toFixed(2) : Math.abs(value);

  return (
    <Text style={priceStyle.priceText}>
      <Text style={priceStyle.dollarUnit}>{MONEY_UNIT_ALL[unitString]}</Text>
      { rmb ? handleValue : translate(handleValue, 'number')}
    </Text>
  );
};

DollarText.defaultProps = {
  value: 0,
  priceStyle: {},
  rmb: false,
  isFixed: false,
};

DollarText.propTypes = {
  value: PropTypes.any,
  priceStyle: PropTypes.object,
  rmb: PropTypes.bool,
  isFixed: PropTypes.bool,
};

export default DollarText;
