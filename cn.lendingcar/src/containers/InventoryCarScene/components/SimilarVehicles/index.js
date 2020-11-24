/**
*
* SimilarVehicles Stateless Component
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

import CarInfoCard from '../CarInfoCard';

import styles from './styles';

const SimilarVehicles = (props) => {
  const { similarCars, changeCarId } = props;

  const similarTitle = (
    <View style={styles.titleLine}>
      <View style={styles.horizontalLine} />
      <Text style={styles.title}>{translate('similarVehicles')}</Text>
      <View style={styles.horizontalLine} />
    </View>
  );

  return (
    <View>
      { similarTitle }
      <ScrollView
        horizontal
        style={styles.cardsGroup}
        showsHorizontalScrollIndicator={false}
      >
        {similarCars && similarCars.map((car, index) => {
          const key = index + 1;
          const isLast = index === similarCars.length - 1;
          return (
            <CarInfoCard
              car={car}
              key={key}
              isLast={isLast}
              changeCarId={changeCarId}
            />
          );
        })
        }
      </ScrollView>
    </View>
  );
};

SimilarVehicles.defaultProps = {
  similarCars: [],
};

SimilarVehicles.propTypes = {
  similarCars: PropTypes.array,
  changeCarId: PropTypes.func.isRequired,
};

export default SimilarVehicles;
