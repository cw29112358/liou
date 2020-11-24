/**
*
* SpecificPreference Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import { getScaleSize } from 'utils/helpers';

import styles from './styles';

const SpecificPreference = (props) => {
  const { activity, rowStyles } = props;
  const specificPriceStyle = {
    priceText: {
      fontSize: getScaleSize(14),
      color: activity.colourCode,
    },
    dollarUnit: {
      fontSize: getScaleSize(14),
      color: activity.colourCode,
    },
  };
  return (
    <View style={[styles.specificRow, rowStyles]}>
      <Image source={{ uri: activity.icon }} style={styles.specificImage} />
      <Text
        style={[
          styles.specificText,
          {
            color: activity.colourCode,
          },
        ]}
      >
        {translate(activity.discountFee, 'dollar', specificPriceStyle)} {activity.description}
      </Text>
    </View>
  );
};

SpecificPreference.defaultProps = {
  activity: {},
  rowStyles: {},
};

SpecificPreference.propTypes = {
  activity: PropTypes.object,
  rowStyles: PropTypes.any,
};

export default SpecificPreference;
