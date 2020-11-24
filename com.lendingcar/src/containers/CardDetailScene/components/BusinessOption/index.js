/**
*
* BusinessOption Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import FilterBar from 'components/FilterBar';
import TranslateText from 'components/TranslateText';

import styles from './styles';

const BusinessOption = (props) => {
  const { business, coupons, ...otherProps } = props;
  const renderText = (label, isTranslate = false) => <TranslateText label={label} style={styles.valueText} isTranslate={isTranslate} />;

  const options = [
    {
      label: 'balance',
      buttonStyle: { paddingLeft: 0 },
      rightChildren: renderText(coupons),
      disabled: true,
    },
    {
      label: 'level',
      buttonStyle: { flex: 2 },
      rightChildren: renderText(business.cardName),
      disabled: true,
    },
    {
      label: 'coupons',
      buttonStyle: { borderRightWidth: 0, paddingRight: 0 },
      rightChildren: renderText('see', true),
    },
  ];
  return (
    <FilterBar
      options={options}
      buttonViewStyle={styles.buttonView}
      buttonStyle={styles.button}
      textStyle={styles.labelText}
      {...otherProps}
    />
  );
};

BusinessOption.defaultProps = {
  coupons: 0,
  business: {},
};

BusinessOption.propTypes = {
  coupons: PropTypes.number,
  business: PropTypes.object,
};

export default BusinessOption;
