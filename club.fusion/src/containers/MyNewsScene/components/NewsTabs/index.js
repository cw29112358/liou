/**
*
* NewsTabs Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { LINEAR_PROPS } from 'utils/constants';

import FilterBar from 'components/FilterBar';
import styles from './styles';

function NewsTabs(props) {
  const { options, selectedOption } = props;
  const realOptions = options.map((item) => {
    if (item.label !== selectedOption) return item;

    return {
      ...item,
      ...LINEAR_PROPS,
      linearStyle: styles.buttonLinear,
    };
  });

  return (
    <FilterBar
      {...props}
      options={realOptions}
      filterViewStyle={styles.view}
      buttonViewStyle={styles.buttonView}
      buttonStyle={styles.button}
      textStyle={styles.text}
      activeButtonStyle={styles.activeButton}
      activeTextStyle={styles.activeText}
    />
  );
}

NewsTabs.defaultProps = {
  options: [],
  selectedOption: undefined,
};

NewsTabs.propTypes = {
  options: PropTypes.array,
  selectedOption: PropTypes.string,
};

export default NewsTabs;
