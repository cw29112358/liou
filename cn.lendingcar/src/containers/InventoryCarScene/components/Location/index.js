/**
*
* Location Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import { openURLByLinking } from 'utils/helpers';
import { SERVICE_TEL_SPLIT, SERVICE_TEL } from 'utils/constants';
import styles from './styles';

const Location = (props) => {
  const { currentArea } = props;
  const {
    pickupZip, pickupMode,
  } = currentArea;
  const isDelivery = pickupMode === 'delivery';

  return (
    <View style={styles.content}>
      <View style={styles.titleLine}>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.title}>{translate('location')}</Text>
      </View>
      <Text style={styles.text}>
        {translate('locationNote')}
        { isDelivery
          ? translate('detailConsult')
          : `${translate('adress')}: ${pickupZip}` }
        { isDelivery && (
          <Text
            style={[styles.text, styles.linkText]}
            onPress={() => openURLByLinking(`tel:${SERVICE_TEL}`, 'notSupportPhoneUrl')}
          >
            { SERVICE_TEL_SPLIT }
          </Text>
        )}
      </Text>
    </View>
  );
};

Location.defaultProps = {
  currentArea: null,
};

Location.propTypes = {
  currentArea: PropTypes.object,
};

export default Location;
