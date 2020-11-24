/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Label,
  Text,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';

import LayoutItem from 'formFields/LayoutItem';

import ModalPicker from './ModalPicker';
import styles from '../styles';

const CURRENT_YEAR = moment().year();

export class MonthYearInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      pickerData: this.initPickerData(),
      pickerValue: ['01', CURRENT_YEAR.toString()],
    };
  }

  onPickerConfirm = (data) => {
    const { input } = this.props;
    const value = `${data[0]}/${data[1].substring(2, 4)}`;
    input.onChange(value);
    this.setState({
      showPicker: false,
      pickerValue: data,
    });
  }
  onPickerCancel = () => {
    this.setState({ showPicker: false });
  }
  onPickerShow = () => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    onClearFirstErrorFieldKey(input.name);
    this.setState({ showPicker: true });
  }
  initPickerData() {
    const dateArray = [['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']];
    const yearArray = [];
    for (let i = 0; i < 50; i += 1) {
      yearArray.push((CURRENT_YEAR + i).toString());
    }
    dateArray.push(yearArray);
    return dateArray;
  }

  render() {
    const {
      input, placeholder, label, hasLabel, hasAsterisk,
      textStyle, placeHolderTextStyle,
      layout, itemSettings, itemstyle, labelStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;
    const { showPicker, pickerData, pickerValue } = this.state;

    const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
    }
    if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

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
          <Label style={labelVertical}>
            {translate(labelText)}
            { hasAsterisk && <Text style={styles.textRed}> *</Text> }
          </Label>
        )}
        <TouchableOpacity
          onPress={this.onPickerShow}
        >
          <Text
            allowFontScaling={false}
            style={input.value
              ? [styles.text, textStyle]
              : [styles.placeholder, placeHolderTextStyle]
            }
          >
            { input.value ? input.value : placeholderText}
          </Text>
        </TouchableOpacity>
        <ModalPicker
          visible={showPicker}
          pickerData={pickerData}
          selectedValue={pickerValue}
          onPickerConfirm={this.onPickerConfirm}
          onPickerCancel={this.onPickerCancel}
        />
      </LayoutItem>
    );
  }
}

MonthYearInput.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  meta: {
    dirty: false,
    error: undefined,
    touched: false,
  },
  placeholder: '',
  label: '',
  layout: '',
  itemSettings: {},
  itemstyle: {},
  labelStyle: {},
  hasLabel: false,
  hasAsterisk: false,
  textStyle: {},
  placeHolderTextStyle: {},
  firstErrorFieldKey: null,
};

MonthYearInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    dirty: PropTypes.bool,
    error: PropTypes.any,
    touched: PropTypes.bool,
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
  textStyle: PropTypes.object,
  placeHolderTextStyle: PropTypes.object,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default MonthYearInput;
