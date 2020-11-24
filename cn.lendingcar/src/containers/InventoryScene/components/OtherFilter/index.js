/**
*
* OtherFilter Stateless Component
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
  ScrollView,
} from 'react-native';

import {
  nullFunction,
} from 'utils/helpers';

import SortFilterPart from '../SortFilterPart';
import ColorFilterPart from '../ColorFilterPart';
import BrandFilterPart from '../BrandFilterPart';

import styles from './styles';

const OtherFilter = (props) => {
  const {
    quantity, onClear,
    sortProps, colorProps, brandProps,
  } = props;

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text>
          <Text style={styles.quantity}>{quantity}&nbsp;&nbsp;</Text>
          <Text style={styles.unit}>{translate('cars')}</Text>
        </Text>
        <Text style={styles.rightText} onPress={onClear}>
          {translate('clear')}
        </Text>
      </View>

      <ScrollView
        style={styles.filterView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <SortFilterPart {...sortProps} />
        <ColorFilterPart groupLength={styles.isBigWidth ? 5 : 4} {...colorProps} />
        <BrandFilterPart {...brandProps} />
      </ScrollView>
    </View>
  );
};

OtherFilter.defaultProps = {
  quantity: 0,
  onClear: nullFunction,
  sortProps: {},
  colorProps: {},
  brandProps: {},
};

OtherFilter.propTypes = {
  quantity: PropTypes.number,
  onClear: PropTypes.func,
  sortProps: PropTypes.object,
  colorProps: PropTypes.object,
  brandProps: PropTypes.object,
};

export default OtherFilter;
