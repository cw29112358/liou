/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Label,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { DATE_FORMAT, DATE_CONFIG, CALCULATE_DATE_FORMAT } from 'utils/constants';

import LayoutItem from 'formFields/LayoutItem';

import styles from '../styles';

export class DateTimeSelectInput extends React.Component {
  constructor(props) {
    super(props);
    const { input, defaultValue } = props;
    if (defaultValue && !input.value) {
      const defaultTimestamp = this.getDefaultTime(defaultValue);
      input.onChange(defaultTimestamp);
    }
    this.state = {
      isDateTimePickerVisible: false,
      dateTime: input.value * 1000 === 0 ? new Date() : new Date(moment(input.value).utcOffset(0)),
    };
  }

  getDefaultTime = (defaultValue) => {
    if (typeof defaultValue === 'number') return defaultValue;
    if (typeof defaultValue === 'function') return defaultValue();
    return defaultValue;
  }
  getShowTime = () => {
    const { dateFormat } = this.props;
    const { dateTime } = this.state;
    // dateTime 为 GMT 时间格式
    return moment(dateTime).format(dateFormat);
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })
  hideDateTimePicker = () => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    this.setState({ isDateTimePickerVisible: false });
    onClearFirstErrorFieldKey(input.name);
  }

  handleDatePicked = (pickedDate) => {
    const { input } = this.props;
    const pickedTimestamp = moment(pickedDate).format(CALCULATE_DATE_FORMAT);
    input.onChange(pickedTimestamp);
    this.setState({ dateTime: pickedDate });
    this.hideDateTimePicker();
  }

  render() {
    const {
      input, placeholder, label, hasLabel, isRequired,
      mode, titleIOS, placeHolderTextStyle,
      minimumDate,
      layout, itemSettings, itemstyle, labelStyle, textStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;
    const { dateTime, isDateTimePickerVisible } = this.state;

    const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    const inputVertical = [styles.text, textStyle];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
      inputVertical.push(styles.inputVertical);
    }
    if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

    const showtime = this.getShowTime();

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
        onPress={this.showDateTimePicker}
      >
        {hasLabel && (
          <Label style={labelVertical}>
            {translate(labelText)}
            { isRequired && <Text style={styles.textRed}> *</Text> }
          </Label>
        )
        }
        <Text
          allowFontScaling={false}
          style={input.value
            ? inputVertical
            : [styles.placeholder, placeHolderTextStyle]
          }
          numberOfLines={1}
        >
          {input.value ? showtime : placeholderText}
        </Text>
        <DateTimePicker
          mode={mode}
          date={dateTime}
          titleIOS={titleIOS}
          minimumDate={minimumDate}
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          {...DATE_CONFIG}
        />
      </LayoutItem>
    );
  }
}

DateTimeSelectInput.defaultProps = {
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
  isRequired: false,
  minimumDate: undefined,
  maximumDate: undefined,
  timeZoneOffsetInMinutes: undefined,
  modalTransparent: true,
  inputStyle: {},
  placeHolderTextStyle: {},
  defaultValue: '',
  mode: 'date',
  dateFormat: DATE_FORMAT,
  titleIOS: '',
  firstErrorFieldKey: null,
};

DateTimeSelectInput.propTypes = {
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
  isRequired: PropTypes.bool,
  minimumDate: PropTypes.object,
  maximumDate: PropTypes.object,
  timeZoneOffsetInMinutes: PropTypes.any,
  modalTransparent: PropTypes.bool,
  inputStyle: PropTypes.object,
  placeHolderTextStyle: PropTypes.object,
  defaultValue: PropTypes.any,
  mode: PropTypes.string,
  dateFormat: PropTypes.string,
  titleIOS: PropTypes.string,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default DateTimeSelectInput;
