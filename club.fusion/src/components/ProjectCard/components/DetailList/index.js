/**
*
* DetailList Stateless Component
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

const DetailList = (props) => {
  const { listData, project } = props;

  const getUnit = (item) => {
    switch (item) {
      case 'fundRequest':
      case 'valuation':
        return translate('dollar');
      case 'period':
        return translate('year');
      case 'interestPercent':
      case 'transferPercent':
        return '%';
      default:
        return null;
    }
  };

  return listData.map((item, index) => {
    const isLast = listData.length - 1 === index;
    const listItemStyles = [styles.detailListItem];
    const value = typeof project[item] !== 'number' ? 0 : project[item];
    if (isLast) {
      listItemStyles.push(styles.lastItem);
    }
    return (
      <View style={listItemStyles} key={item}>
        <Text style={styles.detailListLabel}>{translate(item)}</Text>
        <View style={styles.detailListValueBlock}>
          <Text style={styles.detailListValue}>{value}</Text>
          <Text style={styles.detailListUnit}>{getUnit(item)}</Text>
        </View>
      </View>
    );
  });
};

DetailList.defaultProps = {
  listData: [],
};

DetailList.propTypes = {
  project: PropTypes.object.isRequired,
  listData: PropTypes.array,
};

export default DetailList;
