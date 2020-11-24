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

import DetailPartTitle from '../DetailPartTitle';
import styles from './styles';

const Location = (props) => {
  const { currentArea } = props;
  const { pickupZip } = currentArea;
  const isDelivery = !pickupZip;

  return (
    <View style={styles.content}>
      <DetailPartTitle title="location" />
      <Text style={[styles.text, { marginTop: 20 }]}>
        {translate('locationNote')}
        { isDelivery
          ? translate('detailConsult')
          : `${translate('address')}: ${pickupZip}` }
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
