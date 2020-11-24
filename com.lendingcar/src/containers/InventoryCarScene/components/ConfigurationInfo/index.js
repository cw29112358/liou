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

import SpecificPreference from 'components/SpecificPreference';

import { CONFIGURATION_LIST } from './constants';

import styles from './styles';

const ConfigurationInfo = (props) => {
  const { carInfo } = props;
  const {
    carConfiguration = [],
    promotion,
  } = carInfo;

  const isShowActivity = promotion && JSON.stringify(promotion) !== '{}';

  const renderConfiguration = (configuration) => {
    const themeStyle = CONFIGURATION_LIST[configuration.label];
    const translatedValue = Number(configuration.value) ? configuration.value : translate(configuration.value);

    return (
      <View style={styles.infoLine} key={configuration.label}>
        <Image
          source={themeStyle.image}
          style={themeStyle.style}
          resizeMode="contain"
        />
        <Text style={styles.text}>{translatedValue}</Text>
      </View>
    );
  };
  const renderPriceLine = () => (
    <View style={styles.priceLine}>
      <Text style={styles.valuation}>
        {translate(carInfo.depositPrice, 'dollar', styles.priceStyle)}
        &nbsp;&nbsp;
        {translate('itemDeposit')}
      </Text>
      <Text style={styles.marketPrice}>
        {translate(carInfo.price, 'dollar')}
        &nbsp;&nbsp;
        {translate('kbb')}
      </Text>
    </View>
  );

  return (
    <View style={styles.content}>
      <Text style={styles.carInfoTitle}>
        {translate(carInfo.make)} {carInfo.model}
      </Text>
      { isShowActivity && <SpecificPreference rowStyles={styles.specificRow} activity={promotion} />}
      { renderPriceLine() }
      <View style={styles.configurationView}>
        {carConfiguration && carConfiguration.map(
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
