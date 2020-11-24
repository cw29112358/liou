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
} from 'native-base';
import {
  ScrollView,
} from 'react-native';

import DetailPartTitle from '../DetailPartTitle';
import styles from './styles';

const maxLength = 5;

const CarFeatures = (props) => {
  const { carDetails, showDetails } = props;

  const renderDetails = (featureContent) => {
    if (featureContent.label) {
      const translatedValue = Number(featureContent.value) || (featureContent.label !== 'color' && featureContent.label !== 'size') ? featureContent.value : translate(featureContent.value);
      return (
        <View>
          <Text numberOfLines={1} style={styles.value}>{translatedValue}</Text>
          <Text numberOfLines={1} style={styles.label}>{translate(featureContent.label)}</Text>
        </View>
      );
    }
    return <Text numberOfLines={1} style={styles.value}>{featureContent}</Text>;
  };

  return (
    <View>
      <DetailPartTitle
        title="features"
        isShowButton
        buttonLabel="more"
        isShowButtonIcon
        buttonIconName="ios-arrow-forward"
        onPress={showDetails}
        contentStyle={styles.titleContent}
      />
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
