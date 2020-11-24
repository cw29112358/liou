/**
*
* Feedback Stateless Component
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
} from 'native-base';

import styles from './styles';

const Feedback = (props) => {
  const {
    title, textArray, linkLabel, onSubmit,
    hasTitle, hasLink,
    viewStyle, titleStyle, textStyle, buttonStyle,
    children,
  } = props;
  const renderText = () => (
    <Text>
      {
        textArray.map(({
          isStress, text, label, onPress,
        }) => (
          <Text
            style={[styles.text, textStyle, isStress ? styles.brand : {}]}
            key={label}
            onPress={onPress}
          >
            {text || translate(label)}
          </Text>
        ))
      }
    </Text>
  );
  const renderButton = () => (
    <View style={styles.rowR}>
      <Button
        rounded
        primary
        style={[styles.brandShadow, buttonStyle]}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>{translate(linkLabel)}</Text>
      </Button>
    </View>
  );

  return (
    <View style={[styles.form, viewStyle]}>
      { hasTitle && (
        <Text style={[styles.title, titleStyle]}>
          {translate(title)}
        </Text>
      ) }
      { renderText() }
      { !!children && children }
      { hasLink && renderButton()}
    </View>
  );
};

Feedback.defaultProps = {
  title: '',
  textArray: [],
  linkLabel: 'toLogin',
  onSubmit: null,
  children: null,
  hasTitle: true,
  hasLink: true,
  viewStyle: {},
  titleStyle: {},
  textStyle: {},
  buttonStyle: {},
};

Feedback.propTypes = {
  title: PropTypes.string,
  textArray: PropTypes.array,
  linkLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  hasTitle: PropTypes.bool,
  hasLink: PropTypes.bool,
  viewStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  textStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

export default Feedback;
