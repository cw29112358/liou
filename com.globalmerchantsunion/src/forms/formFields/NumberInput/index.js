/**
*
* NumberInput
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Label,
  View,
  Input,
  Icon,
  Text,
} from 'native-base';

import TranslateText from 'components/TranslateText';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

class NumberInput extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      defaultValue: '',
    };
    this.destory = false;
    this.validResult = {};
  }
  componentWillMount() {
    const { input } = this.props;
    this.onChangeText(input.value);
  }
  componentWillReceiveProps(nextProps) {
    const { input } = this.props;
    if (input.value !== nextProps.input.value
      && this.validResult
      && this.validResult.inputValue !== nextProps.input.value) {
      this.onChangeText(nextProps.input.value);
    }
  }
  componentWillUnmount() {
    this.destory = true;
  }

  onChangeDefaultValue = (value) => {
    let defaultValue = value;
    if (typeof value === 'number') defaultValue = value.toString();
    if (!this.destory) this.setState({ defaultValue });
  }
  onChangeCalculatedValue({ defaultValue, inputValue }) {
    const { input } = this.props;
    setTimeout(() => { this.onChangeDefaultValue(defaultValue); }, 0);
    input.onChange(inputValue);
  }
  onChangeText = (value) => {
    const {
      interval, spacer, fromRight, parseNumber,
    } = this.props;
    this.onChangeDefaultValue(value);

    let validResult = {
      defaultValue: value,
      inputValue: value,
    };
    if (interval) validResult = this.getIntervalNumbers(value, interval, spacer, fromRight);
    if (parseNumber) validResult = this.getValidNumbers(value);
    this.validResult = validResult;
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
  getIntervalNumbers = (value, interval, spacer, fromRight) => {
    let defaultValue = (value || '').toString();
    let inputValue;

    defaultValue = defaultValue.replace(/[^0-9]+/g, '');
    // eslint-disable-next-line prefer-const
    inputValue = defaultValue;

    const intervalArray = [];
    let i = 0;
    if (fromRight && defaultValue.length > interval) {
      i = defaultValue.length % interval;
      if (i > 0) intervalArray.push(defaultValue.substr(0, i));
    }

    for (; i < defaultValue.length; i += interval) {
      const intervalVal = defaultValue.substr(i, interval);
      intervalArray.push(intervalVal);
    }
    defaultValue = intervalArray.join(spacer);

    return {
      defaultValue,
      inputValue,
    };
  }

  render() {
    const {
      input, label, labelTip, hasLabel, hasAsterisk, prefix,
      layout, itemSettings, itemstyle, labelStyle, inputStyle,
      prefixViewStyle, prefixTextStyle,
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
    if (firstErrorFieldKey === input.name) {
      itemLayout.push(styles.fieldError);
      inputVertical.push(styles.fieldError);
    }

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
            { hasAsterisk && <Text style={styles.textRed}> *</Text> }
          </Label>
        )}
        { hasLabel && !!labelTip && <TranslateText label={labelTip} style={styles.labelTip} /> }
        <View style={[styles.viewWrap]}>
          {!!prefix && (
            <View style={[styles.viewWrap, prefixViewStyle]}>
              <Text style={[styles.textPrefix, prefixTextStyle]}> { prefix } </Text>
            </View>
          ) }
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
  labelTip: undefined,
  prefix: undefined,
  layout: '',
  itemSettings: {},
  secureTextEntry: false,
  itemstyle: {},
  labelStyle: {},
  inputStyle: {},
  prefixViewStyle: {},
  prefixTextStyle: {},
  hasLabel: false,
  hasAsterisk: false,
  iconNames: '',
  iconImage: '',
  iconStyle: {},
  numberType: '',
  rightChildren: null,
  firstErrorFieldKey: null,
  maxLength: undefined,
  editable: true,
  interval: undefined,
  spacer: ' ',
  fromRight: false,
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
  labelTip: PropTypes.string,
  prefix: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  prefixViewStyle: PropTypes.object,
  prefixTextStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
  iconNames: PropTypes.string,
  iconImage: PropTypes.any,
  iconStyle: PropTypes.object,
  numberType: PropTypes.string,
  rightChildren: PropTypes.node,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  interval: PropTypes.number,
  spacer: PropTypes.string,
  fromRight: PropTypes.bool,
  parseNumber: PropTypes.bool,
  isPositive: PropTypes.bool,
  noZero: PropTypes.bool,
  maxValue: PropTypes.number,
};

export default NumberInput;
