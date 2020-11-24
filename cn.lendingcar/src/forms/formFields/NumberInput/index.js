/**
*
* NumberInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  View,
  Input,
  Icon,
  Text,
} from 'native-base';

import { renderLabel, getPlaceholder, getInputStyle } from 'formFields/helpers';
import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultValue: '',
    };
    this.destory = false;
  }
  componentWillMount() {
    const { input } = this.props;
    this.onChangeText(input.value);
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

  // 获取有效数字
  getValidNumbers(value) {
    const {
      isPositive, noZero, maxValue,
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
  // 原值 间隔数 间隔符 从右开始 => 获取间隔文本
  getIntervalNumbers = (value, interval, spacer, fromRight) => {
    let defaultValue = (value || '').toString();
    let inputValue = defaultValue ? defaultValue.trim() : '';

    defaultValue = defaultValue.replace(/[^0-9]+/g, '');
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
      input, secureTextEntry, maxLength, editable,
      iconNames, iconImage, iconStyle,
      prefix, leftChildren, rightChildren, onClearFirstErrorFieldKey,
    } = this.props;
    const { defaultValue } = this.state;

    const inputStyle = getInputStyle(this.props);

    return (
      <LayoutItem {...this.props}>
        { renderLabel(this.props) }
        <View style={styles.row}>
          {!!prefix && <Text style={inputStyle.concat(styles.prefix)}> { prefix } </Text> }
          { leftChildren }
          <Input
            placeholder={getPlaceholder(this.props)}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            editable={editable}
            defaultValue={defaultValue}
            style={inputStyle}
            onChangeText={(value) => this.onChangeText(value)}
            onFocus={() => onClearFirstErrorFieldKey(input.name)}
            keyboardType="numeric"
            returnKeyType="done"
            placeholderTextColor={styles.placeholder.color}
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
  secureTextEntry: false,
  maxLength: undefined,
  editable: true,
  interval: undefined,
  spacer: ' ',
  fromRight: false,
  parseNumber: false,
  isPositive: undefined,
  noZero: undefined,
  maxValue: undefined,
  iconNames: undefined,
  iconImage: undefined,
  iconStyle: {},
  prefix: undefined,
  leftChildren: undefined,
  rightChildren: undefined,
};

NumberInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  interval: PropTypes.number,
  spacer: PropTypes.string,
  fromRight: PropTypes.bool,
  parseNumber: PropTypes.bool,
  isPositive: PropTypes.bool,
  noZero: PropTypes.bool,
  maxValue: PropTypes.number,
  iconNames: PropTypes.string,
  iconImage: PropTypes.any,
  iconStyle: PropTypes.object,
  prefix: PropTypes.string,
  leftChildren: PropTypes.node,
  rightChildren: PropTypes.node,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default NumberInput;
