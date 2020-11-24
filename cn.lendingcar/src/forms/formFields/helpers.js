/* global translate */
import React from 'react';
import {
  Label,
  Text,
} from 'native-base';

import styles from 'formFields/styles';

export function getIsError(params) {
  const {
    input: { name }, firstErrorFieldKey, showAllError, errorKeys = {},
  } = params;
  return firstErrorFieldKey === name
  || (showAllError && errorKeys[name]);
}
export function getIsVertical({ layout }) {
  return layout === 'vertical';
}
export function getInputStyle(params, defaultProps = {}) {
  const {
    defaultStyle = styles.input,
    verticalStyle = styles.inputVertical,
    styleKey = 'inputStyle',
  } = defaultProps;
  const { [styleKey]: styleValue } = params;

  const newInputStyle = [defaultStyle];
  if (getIsVertical(params)) newInputStyle.push(verticalStyle);
  if (styleValue) newInputStyle.push(styleValue);

  return newInputStyle;
}
export function getPlaceholder(params) {
  const { itemSettings, placeholder, placeholderTranslate = true } = params;

  if (itemSettings && itemSettings.floatingLabel === true) return undefined;

  return placeholderTranslate ? translate(placeholder) : placeholder;
}

export function renderLabel(params) {
  const {
    input, hasLabel, hasAsterisk,
    label, labelRight,
  } = params;
  if (!hasLabel) return undefined;

  const labelText = label || input.name;
  const newLabelStyle = getInputStyle(params, {
    defaultStyle: styles.label,
    verticalStyle: styles.labelVertical,
    styleKey: 'labelStyle',
  });

  return (
    <Label style={newLabelStyle}>
      {translate(labelText)}
      { hasAsterisk && <Text style={styles.textRed}> *</Text> }
      { labelRight }
    </Label>
  );
}

export function renderText(params, onPress, stateValue) {
  const { input: { value }, placeHolderTextStyle } = params;
  const inputStyle = getInputStyle(params);

  return (
    <Text
      onPress={onPress}
      allowFontScaling={false}
      style={value
        ? inputStyle
        : [...inputStyle, styles.placeholder, placeHolderTextStyle]
      }
    >
      { stateValue || value || getPlaceholder(params)}
    </Text>
  );
}
