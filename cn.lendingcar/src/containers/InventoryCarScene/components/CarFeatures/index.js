/**
*
* CarFeatures Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Icon,
  Button,
} from 'native-base';
import {
  ScrollView,
} from 'react-native';

import styles from './styles';

const maxLength = 5;

const CarFeatures = (props) => {
  const { carDetails, showDetails } = props;

  const renderHeader = () => (
    <View style={styles.titleLine}>
      <View style={styles.titleView}>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.title}>{translate('features')}</Text>
      </View>
      <Button transparent style={styles.button} onPress={showDetails}>
        <Text style={styles.buttonColor}>{translate('more')}</Text>
        <Icon name="ios-arrow-forward" style={styles.iconColor} />
      </Button>
    </View>
  );

  const renderDetails = (featureContent) => {
    if (featureContent.label) {
      // const translatedValue = Number(featureContent.value) ? featureContent.value : translate(featureContent.value);
      const translatedValue = Number(featureContent.value) || (featureContent.label !== 'color' && featureContent.label !== 'size') ? featureContent.value : translate(featureContent.value);
      const value = featureContent.label === 'mileage'
        ? `${translate(featureContent.value, 'number')} ${translate('miles')}`
        : translatedValue;
      return (
        <View>
          <Text numberOfLines={1} style={styles.value}>{value}</Text>
          <Text numberOfLines={1} style={styles.label}>{translate(featureContent.label)}</Text>
        </View>
      );
    }

    return <Text numberOfLines={1} style={styles.value}>{featureContent}</Text>;
  };

  return (
    <View style={styles.content}>

      { renderHeader() }

      <ScrollView
        horizontal
        style={styles.featureLine}
        showsHorizontalScrollIndicator={false}
      >
        {carDetails && carDetails.map((featureContent, index) => {
          if (index >= maxLength) return null;
          const cardStyle = [styles.featureBlock];
          if (index >= 4 || index === carDetails.length - 1) cardStyle.push(styles.lastBlock);
          return (
            <View
              key={featureContent.label || featureContent}
              style={cardStyle}
            >
              { renderDetails(featureContent) }
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

CarFeatures.defaultProps = {
  carDetails: [],
  showDetails: () => null,
};

CarFeatures.propTypes = {
  carDetails: PropTypes.array,
  showDetails: PropTypes.func,
};

export default CarFeatures;
