/**
*
* PaymentResultScene Container
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container,
  Content,
  View,
  Button,
  Text,
} from 'native-base';

import AppHeader from 'components/AppHeader';

import styles from './styles';

const renderOptions = (options) => (
  options.map((option) => {
    const {
      label, rounded, transparent, onPress,
      buttonStyle = {}, textStyle = {},
    } = option;
    const buttonText = transparent ? styles.transparentButtonText : styles.buttonText;
    const button = !transparent ? styles.buttonShadow : {};

    return (
      <Button
        key={label}
        rounded={rounded}
        transparent={transparent}
        style={[styles.button, button, buttonStyle]}
        onPress={onPress}
      >
        <Text style={[buttonText, textStyle]}>{translate(label)}</Text>
      </Button>
    );
  })
);

function PaymentResultScene(props) {
  const {
    title, textLabel, price, options,
    textStyle, bottomLineStyle, checkImage,
  } = props;

  const paymentContent = (
    <Content
      contentContainerStyle={styles.contentContainer}
      style={styles.content}
      scrollEnabled={false}
    >
      <Image style={[styles.checkImage]} source={checkImage} />
      <Text style={[styles.textLabel, textStyle]}>
        {translate(textLabel)}
      </Text>

      { translate(price, 'dollar', styles.priceStyle) }
      <View style={[styles.bottomLine, bottomLineStyle]}></View>
      { renderOptions(options) }
    </Content>
  );

  return (
    <Container syle={styles.container}>
      <AppHeader
        title={title}
        hasLeft={false}
        hasShadow
      />
      { paymentContent }
    </Container>
  );
}

PaymentResultScene.defaultProps = {
  title: 'paymentResults',
  textLabel: '',
  price: 0,
  options: [],
  textStyle: {},
  bottomLineStyle: {},
  checkImage: null,
};

PaymentResultScene.propTypes = {
  title: PropTypes.string,
  textLabel: PropTypes.string,
  price: PropTypes.number,
  options: PropTypes.array,
  textStyle: PropTypes.object,
  bottomLineStyle: PropTypes.object,
  checkImage: PropTypes.any,
};

export default PaymentResultScene;
