/**
*
* TranslateText Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from 'native-base';

import DollarText from 'components/DollarText';

const TranslateText = (props) => {
  const {
    returnText, isTranslate, label, type, style,
    leftChildren, rightChildren, ...otherProps
  } = props;

  if (!label) return null;
  if (type === 'dollar') return <DollarText value={label} priceStyle={style} {...otherProps} />;

  const text = isTranslate ? translate(label, type) : label;
  if (returnText) return text;

  return (
    <Text style={style} numberOfLines={1} {...otherProps}>
      { leftChildren }{ text }{rightChildren}
    </Text>
  );
};

TranslateText.defaultProps = {
  returnText: false,
  isTranslate: true,
  label: undefined,
  type: undefined,
  leftChildren: undefined,
  rightChildren: undefined,
  style: {},
};

TranslateText.propTypes = {
  returnText: PropTypes.bool,
  isTranslate: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  type: PropTypes.string,
  leftChildren: PropTypes.any,
  rightChildren: PropTypes.any,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default TranslateText;
