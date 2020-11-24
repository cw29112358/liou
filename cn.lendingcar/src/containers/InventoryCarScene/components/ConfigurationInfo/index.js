/**
*
* ConfigurationInfo Stateless Component
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

import { CONFIGURATION_LIST } from './constants';

import styles from './styles';

const ConfigurationInfo = (props) => {
  const { carInfo } = props;
  const { carConfiguration = [] } = carInfo;

  const renderConfiguration = (configuration) => {
    const themeStyle = CONFIGURATION_LIST[configuration.label];

    const translatedValue = Number(configuration.value) ? configuration.value : translate(configuration.value);

    const value = configuration.label === 'mileage'
      ? `${translate(configuration.value, 'number')} ${translate('miles')}`
      : translatedValue;

    return (
      <View style={styles.infoLine} key={configuration.label}>
        <Image
          source={themeStyle.image}
          style={themeStyle.style}
          resizeMode="contain"
        />
        <Text style={styles.text}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.content}>
      <Text style={styles.carInfoTitle}>
        {translate(carInfo.make)} {carInfo.model}
      </Text>
      {translate(carInfo.price, 'dollar', styles.priceStyle)}
      <View style={styles.configurationView}>
        {carConfiguration.map(
          (configuration) => renderConfiguration(configuration)
        )}
      </View>
    </View>
  );
};

ConfigurationInfo.defaultProps = {
  carInfo: {},
};

ConfigurationInfo.propTypes = {
  carInfo: PropTypes.object,
};

export default ConfigurationInfo;
