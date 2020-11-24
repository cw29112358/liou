/**
*
* BusinessCard Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import TranslateText from 'components/TranslateText';

import styles from './styles';

const BusinessCard = (props) => {
  const { business, onCardPress } = props;
  const renderText = (label, isTranslate = false) => <TranslateText label={label} style={styles.cardText} isTranslate={isTranslate} />;

  return (
    <ImageBackground
      source={business.image}
      style={styles.cardImage}
    >
      <TouchableWithoutFeedback onPress={onCardPress}>
        <View style={styles.cardView}>
          <View style={styles.cardRow}>
            <Image source={business.logo} style={styles.logoImage} />
            <View style={styles.cardColumn}>
              { renderText(business.name) }
              { renderText(business.cardName) }
            </View>
          </View>
          { renderText(business.id) }
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

BusinessCard.defaultProps = {
  business: {},
  onCardPress: () => null,
};

BusinessCard.propTypes = {
  business: PropTypes.object,
  onCardPress: PropTypes.func,
};

export default BusinessCard;
