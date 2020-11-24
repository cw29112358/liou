/**
*
* NumberInput
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import { Image } from 'react-native';
import {
  Label,
  View,
  Input,
  Icon,
  Text,
} from 'native-base';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

class NumberInput extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      defaultValue: '',
    };
    this.destory = false;
  }
  componentWillMount() {
    const { input } = this.props;
    let defaultValue = input.value;
    if (isNumber(input.value)) defaultValue = input.value.toString();
    this.onChangeText(defaultValue);
  }
  componentWillUnmount() {
    this.destory = true;
  }

  onChangeDefaultValue = (defaultValue) => {
    if (!this.destory) this.setState({ defaultValue });
  }
  onChangeCalculatedValue({ defaultValue, inputValue }) {
    const { input } = this.props;
    setTimeout(() => { this.onChangeDefaultValue(defaultValue); }, 0);
    input.onChange(inputValue);
  }
  onChangeText = (value) => {
    const { interval, parseNumber } = this.props;
    this.onChangeDefaultValue(value);

    let validResult = {
      defaultValue: value,
      inputValue: value,
    };
    if (interval) validResult = this.getIntervalNumbers(value, interval);
    if (parseNumber) validResult = this.getValidNumbers(value);
    this.onChangeCalculatedValue(validResult);
  }

  getPlaceholderText() {
    const { itemSettings, placeholder, placeholderTranslate } = this.props;
    if (itemSettings && itemSettings.floatingLabel === true) return null;
    if (placeholderTranslate) return translate(placeholder);
    return placeholder;
  }
  getValidNumbers(value) {
    const {
      isPositive, maxValue, noZero,
    } = this.props;

    let defaultValue = value;
    let inputValue = Number(value);

    if (isNaN(inputValue)) { //eslint-disable-line
      defaultValue = '';
      inputValue = '';
    }

    if (inputValue) {
      if (isPositive) inputValue = Math.abs(inputValue);

      if (maxValue && inputValue > maxValue) {
        inputValue = maxValue;
        defaultValue = maxValue.toString();
      }
    }

    if (noZero && inputValue === 0) inputValue = '';

    return {
      defaultValue,
      inputValue,
    };
  }
  getIntervalNumbers = (value, interval) => {
    let defaultValue = value;
    let inputValue = value ? value.trim() : '';

    defaultValue = defaultValue.replace(/[^0-9]+/g, '');
    inputValue = defaultValue;

    const length = Math.ceil(defaultValue.length / interval);
    const intervalArray = [];
    for (let i = 0; i < length; i += 1) {
      const start = i * interval;
      const end = start + interval;
      const intervalVal = defaultValue.substring(start, end);
      intervalArray.push(intervalVal);
    }
    defaultValue = intervalArray.join(' ');

    return {
      defaultValue,
      inputValue,
    };
  }

  renderPrefix = (prefix, inputVertical) => {
    switch (typeof prefix) {
      case 'string': return <Text style={[inputVertical, styles.textPrefix]}> { prefix } </Text>;
      case 'object': return prefix;
      default: return null;
    }
  }
  render() {
    const {
      input, label, hasLabel, isRequired, prefix,
      layout, itemSettings, itemstyle, labelStyle, inputStyle,
      iconNames, iconImage, iconStyle, maxLength, editable,
      rightChildren, firstErrorFieldKey, onClearFirstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;
    const { defaultValue } = this.state;

    const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    const inputVertical = [inputStyle];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
      inputVertical.push(styles.inputVertical);
    }
    if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

    const labelText = label || input.name;

    return (
      <LayoutItem
        name={input.name}
        firstErrorFieldKey={firstErrorFieldKey}
        onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
        {...itemSettings}
        style={itemLayout}
      >
        {hasLabel && (
          <Label style={labelVertical}>
            {translate(labelText)}
            { isRequired && <Text style={styles.textRed}> *</Text> }
          </Label>
        )}
        <View style={styles.viewWrap}>
          {!!prefix && this.renderPrefix() }
          <Input
            placeholder={this.getPlaceholderText()}
            defaultValue={defaultValue}
            maxLength={maxLength}
            editable={editable}
            onChangeText={(value) => this.onChangeText(value)}
            onFocus={() => onClearFirstErrorFieldKey(input.name)}
            keyboardType="numeric"
            returnKeyType="done"
            style={inputVertical}
          />
          {!!iconNames && <Icon active name={iconNames} style={iconStyle} />}
          {!!iconImage && <Image source={iconImage} style={iconStyle} />}
          { rightChildren }
        </View>
      </LayoutItem>
    );
  }
}

NumberInput.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  placeholderTranslate: true,
  placeholder: '',
  label: '',
  layout: '',
  itemSettings: {},
  secureTextEntry: false,
  itemstyle: {},
  labelStyle: {},
  inputStyle: {},
  hasLabel: false,
  isRequired: false,
  iconNames: '',
  iconImage: '',
  iconStyle: {},
  numberType: '',
  rightChildren: null,
  firstErrorFieldKey: null,
  maxLength: undefined,
  editable: true,
  interval: undefined,
  parseNumber: false,
  isPositive: undefined,
  noZero: undefined,
  maxValue: undefined,
};

NumberInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  placeholderTranslate: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  iconNames: PropTypes.string,
  iconImage: PropTypes.any,
  iconStyle: PropTypes.object,
  numberType: PropTypes.string,
  rightChildren: PropTypes.node,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  interval: PropTypes.number,
  parseNumber: PropTypes.bool,
  isPositive: PropTypes.bool,
  noZero: PropTypes.bool,
  maxValue: PropTypes.number,
};

export default NumberInput;
