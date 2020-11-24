/**
*
* SortFilterPart Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import {
  nullFunction,
} from 'utils/helpers';

import FiterBar from 'components/FilterBar';

import styles from './styles';

const SortFilterPart = (props) => {
  const {
    isVertical, title, options, onSelect,
  } = props;
  const filterViewStyle = isVertical ? styles.filterViewVertical : styles.filterView;

  return (
    <View>
      <Text style={styles.title}>{translate(title)}</Text>
      {
        options.map((item, index) => {
          const key = `${item.title}_${index}`;

          return (
            <FiterBar
              {...item}
              onSelect={onSelect}
              filterViewStyle={filterViewStyle}
              buttonViewStyle={styles.buttonView}
              buttonStyle={styles.button}
              key={key}
            />
          );
        })
      }
    </View>
  );
};

SortFilterPart.defaultProps = {
  isVertical: true,
  title: '',
  options: [],
  onSelect: nullFunction,
};

SortFilterPart.propTypes = {
  isVertical: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func,
};

export default SortFilterPart;
