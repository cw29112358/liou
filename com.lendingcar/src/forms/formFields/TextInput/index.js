/**
*
* TextInput
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Label,
  Icon,
  Text,
} from 'native-base';
import {
  Image,
} from 'react-native';

import { executeFunction } from 'utils/helpers';

import DeleteNbInput from 'components/DeleteNbInput';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

function TextInput(props) {
  const {
    input, placeholder, label, hasBlankLabel, hasLabel, isRequired, hasLabelIcon, onLabelIconPress,
    secureTextEntry, noFocusPlaceholder, hasDeleteIcon, maxLength, editable, multiline, numberOfLines,
    layout, itemSettings, itemstyle, labelStyle, inputStyle,
    iconNames, iconImage, iconStyle,
    rightChildren, firstErrorFieldKey, onClearFirstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    showAllError, errorKeys,
  } = props;

  const itemLayout = [itemstyle];
  const labelVertical = [labelStyle];
  const inputVertical = [inputStyle];
  if (layout === 'vertical') {
    itemLayout.push(styles.fieldVertical);
    labelVertical.push(styles.labelVertical);
    inputVertical.push(styles.inputVertical);
  }

  const isError = firstErrorFieldKey === input.name
    || (showAllError && errorKeys[input.name]);
  if (isError) itemLayout.push(styles.fieldError);

  const labelText = label || input.name;
  const placeholderText = (itemSettings && itemSettings.floatingLabel === true)
    ? null : translate(placeholder);

  return (
    <LayoutItem
      name={input.name}
      firstErrorFieldKey={firstErrorFieldKey}
      onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
      {...itemSettings}
      style={itemLayout}
    >
      {hasBlankLabel && (
        <View style={styles.viewWrap}>
          <Label style={labelVertical}> </Label>
        </View>
      )}
      { hasLabel && (
        <View style={styles.viewWrap}>
          <Label style={labelVertical}>
            {translate(labelText)}
            { isRequired && <Text style={styles.textRed}> *</Text> }
          </Label>
          { hasLabelIcon && <Text>  </Text> }
          { hasLabelIcon && (
            <Icon
              style={styles.questionIcon}
              name="question"
              type="SimpleLineIcons"
              onPress={onLabelIconPress}
            />
          ) }
        </View>
      )}
      <DeleteNbInput
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        noFocusPlaceholder={noFocusPlaceholder}
        hasDeleteIcon={hasDeleteIcon}
        style={inputVertical}
        placeholder={placeholderText}
        placeholderTextColor={styles.placeHolderStyle.color}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onFocus={() => {
          onClearFirstErrorFieldKey(input.name);
          executeFunction(input.onFocus);
        }}
        onBlur={() => executeFunction(input.onBlur)}
      />
      {!!iconNames && <Icon active name={iconNames} style={iconStyle} />}
      {!!iconImage && <Image source={iconImage} style={iconStyle} />}
      { rightChildren }
    </LayoutItem>
  );
}

TextInput.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  placeholder: '',
  label: '',
  layout: '',
  itemSettings: {},
  secureTextEntry: false,
  noFocusPlaceholder: false,
  hasDeleteIcon: false,
  maxLength: undefined,
  editable: true,
  multiline: false,
  numberOfLines: 1,
  itemstyle: {},
  labelStyle: {},
  inputStyle: {},
  hasLabel: false,
  hasBlankLabel: false,
  isRequired: false,
  hasLabelIcon: false,
  onLabelIconPress: () => {},
  iconNames: '',
  iconImage: '',
  iconStyle: {},
  rightChildren: null,
  firstErrorFieldKey: null,
};

TextInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  noFocusPlaceholder: PropTypes.bool,
  hasDeleteIcon: PropTypes.bool,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  hasBlankLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  hasLabelIcon: PropTypes.bool,
  onLabelIconPress: PropTypes.func,
  iconNames: PropTypes.string,
  iconImage: PropTypes.any,
  iconStyle: PropTypes.object,
  rightChildren: PropTypes.node,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default TextInput;
