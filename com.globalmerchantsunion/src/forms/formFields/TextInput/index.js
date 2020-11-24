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
import TranslateText from 'components/TranslateText';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

function TextInput(props) {
  const {
    input, placeholder, label, labelTip, hasLabel, hasAsterisk, hasLabelIcon, onLabelIconPress,
    secureTextEntry, noFocusPlaceholder, hasDeleteIcon, maxLength, editable,
    layout, itemSettings, itemstyle, labelStyle, inputStyle,
    iconNames, iconImage, iconStyle, inputViewStyle,
    rightChildren, firstErrorFieldKey, onClearFirstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    showAllError, errorKeys,
  } = props;

  const itemLayout = [];
  const labelVertical = [];
  const inputVertical = [];
  if (layout === 'vertical') {
    itemLayout.push(styles.fieldVertical);
    labelVertical.push(styles.labelVertical);
    inputVertical.push(styles.inputVertical);
  }
  if (itemstyle) itemLayout.push(itemstyle);
  if (labelStyle) labelVertical.push(labelStyle);
  if (inputStyle) inputVertical.push(inputStyle);
  const isError = firstErrorFieldKey === input.name
    || (showAllError && errorKeys[input.name]);
  if (isError) {
    itemLayout.push(styles.fieldError);
    inputVertical.push(styles.fieldError);
  }

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
      { hasLabel && (
        <View style={styles.viewWrap}>
          <Label style={labelVertical}>
            {translate(labelText)}
            { hasAsterisk && <Text style={styles.textRed}> *</Text> }
          </Label>
          { !!labelTip && <TranslateText label={labelTip} style={styles.labelTip} /> }
          { hasLabelIcon && <Text /> }
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
        noFocusPlaceholder={noFocusPlaceholder}
        hasDeleteIcon={hasDeleteIcon}
        style={inputVertical}
        inputViewStyle={inputViewStyle}
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
  labelTip: '',
  layout: '',
  itemSettings: {},
  secureTextEntry: false,
  noFocusPlaceholder: false,
  hasDeleteIcon: false,
  maxLength: undefined,
  editable: true,
  itemstyle: {},
  labelStyle: {},
  inputViewStyle: {},
  inputStyle: {},
  hasLabel: false,
  hasAsterisk: false,
  hasLabelIcon: false,
  onLabelIconPress: () => {},
  iconNames: '',
  iconImage: '',
  iconStyle: {},
  rightChildren: null,
  firstErrorFieldKey: null,
  showAllError: false,
  errorKeys: {},
};

TextInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  labelTip: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  noFocusPlaceholder: PropTypes.bool,
  hasDeleteIcon: PropTypes.bool,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputViewStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
  hasLabelIcon: PropTypes.bool,
  onLabelIconPress: PropTypes.func,
  iconNames: PropTypes.string,
  iconImage: PropTypes.any,
  iconStyle: PropTypes.object,
  rightChildren: PropTypes.node,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  showAllError: PropTypes.bool,
  errorKeys: PropTypes.object,
};

export default TextInput;
