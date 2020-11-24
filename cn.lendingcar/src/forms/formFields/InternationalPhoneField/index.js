/**
*
* InternationalPhoneField
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  View,
  Text,
} from 'native-base';

import SelectInput from 'formFields/SelectInput';
import NumberInput from 'formFields/NumberInput';
import LayoutItem from 'formFields/LayoutItem';

import { getUserPhoneNumberArray, formatSubmitPhoneNumber } from 'utils/helpers';

import styles from 'formFields/styles';

class InternationalPhoneField extends React.Component {
  constructor(props) {
    super(props);
    const { input } = props;
    const [currentSelectValue, currentInputValue] = getUserPhoneNumberArray(input.value);
    this.state = {
      currentSelectValue: Number(currentSelectValue),
      currentInputValue,
    };
  }

  onChangeSelect = (value) => {
    const { currentInputValue } = this.state;
    this.setState({ currentSelectValue: value });
    this.onSubmit(value, currentInputValue);
  }
  onChangeInput = (value) => {
    const { currentSelectValue } = this.state;
    this.setState({ currentInputValue: value });
    this.onSubmit(currentSelectValue, value);
  }
  onSubmit = (prefix, suffix) => {
    const { input } = this.props;
    const phoneNumber = formatSubmitPhoneNumber(prefix, suffix);
    input.onChange(phoneNumber);
  }

  render() {
    const {
      input,
      label, hasLabel,
      isRequired,
      layout, itemSettings, itemstyle, labelStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
      // selectInput params
      selectOptions, selectTitle,
      // numberInput params
      inputPlaceholderText,
    } = this.props;
    const { currentSelectValue, currentInputValue } = this.state;
    const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
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
        <View style={styles.formatStyle}>
          <SelectInput
            {...this.props}
            options={selectOptions}
            title={selectTitle}
            isShowValueLabel
            valueLabel={`area${currentSelectValue}`}
            placeholderStyle={styles.selectValueStyle}
            dropdownStyles={styles.dropdownStyles}
            itemstyle={styles.selectItem}
            textStyle={styles.selectValueStyle}
            input={{
              name: input.name,
              value: currentSelectValue,
              onChange: this.onChangeSelect,
            }}
            isShowArrow
            hasLabel={false}
            onSetFirstErrorFieldKeLayout={() => null}
            firstErrorFieldKey=""
          />
          <NumberInput
            {...this.props}
            placeholder={inputPlaceholderText}
            itemstyle={styles.inputItem}
            iconStyle={styles.iconPhoneStyle}
            hasLabel={false}
            input={{
              name: input.name,
              value: currentInputValue,
              onChange: this.onChangeInput,
            }}
            onSetFirstErrorFieldKeLayout={() => null}
            firstErrorFieldKey=""
          />
        </View>
      </LayoutItem>
    );
  }
}

InternationalPhoneField.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  label: '',
  layout: '',
  itemSettings: {},
  itemstyle: {},
  labelStyle: {},
  hasLabel: false,
  isRequired: false,
  // selectInput params
  selectOptions: [],
  selectTitle: '',
  selectPlaceholderStyle: {},
  // numberInput params
  inputPlaceholderText: '',
};

InternationalPhoneField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  label: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  // selectInput params
  selectOptions: PropTypes.array,
  selectTitle: PropTypes.string,
  selectPlaceholderStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  // numberInput params
  inputPlaceholderText: PropTypes.string,

  firstErrorFieldKey: PropTypes.string.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default InternationalPhoneField;
