/**
*
* DateTimeSelectRangeInput
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Text,
  Label,
  View,
} from 'native-base';

import { getImmutableData } from 'utils/helpers';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

import DateTimeRangeModal from './components/DateTimeRangeModal';

class DateTimeSelectRangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCalendar: false,
      DateArray: [],
    };
  }
  getDateArray = (value) => {
    const { input } = this.props;
    input.onChange(getImmutableData(value));
    this.setState({ DateArray: value });
  }

  openCalendar = () => {
    this.setState({ isShowCalendar: true });
  }
  closeCalendar = () => {
    this.setState({ isShowCalendar: false });
  }

  onBack = (backAction) => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    onClearFirstErrorFieldKey(input.name);
    backAction();
  }

  render() {
    const {
      input, placeholder, label, hasLabel, isRequired,
      layout, itemSettings, itemstyle, labelStyle, inputStyle,
      placeholderStyle,
      minDate,
      options, pickerTitle, isShowTime,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
      // isTranslate, textStyle,
    } = this.props;
    const { isShowCalendar, DateArray } = this.state;
    const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    const inputVertical = [inputStyle, styles.picker];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
      inputVertical.push(styles.inputVertical);
    }
    if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

    const labelText = label || input.name;
    const placeholderText = (itemSettings && itemSettings.floatingLabel === true)
      ? null : translate(placeholder);
    const labelStyles = [styles.labelText];

    const itemValue = input.value.size > 0 ? input.value.toJSON() : DateArray;
    labelStyles.push([styles.placeHolderStyle, placeholderStyle]);

    const renderItemValue = () => (
      <TouchableWithoutFeedback onPress={this.openCalendar}>
        <View style={styles.touchableView}>
          {itemValue.length > 0
            ? itemValue.map((date, index) => {
              const key = `${date}_${index}`; // date 相同时 key 报错
              return (<Text key={key} style={styles.dateText}>{date}</Text>);
            })
            : <Text style={labelStyles}>{placeholderText}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
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
            { translate(labelText) }
            { isRequired && <Text style={styles.textRed}> *</Text> }
          </Label>
        )}
        { renderItemValue() }
        {isShowCalendar && (
          <DateTimeRangeModal
            calendarTitle="calendarTitle"
            calendarRightText="clear"
            visible={isShowCalendar}
            closeCalendar={this.closeCalendar}
            minDate={minDate}
            options={options}
            isShowTime={isShowTime}
            pickerTitle={translate(pickerTitle)}
            defaultDateArray={(input.value.size > 0 && input.value.toJSON()) || []}
            getDateArray={this.getDateArray}
          />
        )}

      </LayoutItem>
    );
  }
}

DateTimeSelectRangeInput.defaultProps = {
  input: {
    value: [],
    onChange: () => null,
  },
  label: '',
  isShowTime: true,
  pickerTitle: '',
  itemSettings: {},
  itemstyle: {},
  labelStyle: {},
  hasLabel: false,
  children: null,
  minDate: '',
  standardStyle: true,
};

DateTimeSelectRangeInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  label: PropTypes.string,
  isShowTime: PropTypes.bool,
  pickerTitle: PropTypes.string,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  children: PropTypes.any,
  minDate: PropTypes.string,
  standardStyle: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string.isRequired,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default DateTimeSelectRangeInput;
