/**
*
* SelectInput
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Label,
  View,
  Text,
  Icon,
} from 'native-base';

import ModalSelect from 'components/ModalSelect';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

export class SelectInput extends React.Component {
  state={
    isShowPicker: false,
    currentLabel: '',
  }
  onBack = (backAction) => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    onClearFirstErrorFieldKey(input.name);
    backAction();
  }
  onConfirm= (value, itemIndex) => {
    const { input, options } = this.props;
    input.onChange(value);
    this.setState({
      isShowPicker: false,
      currentLabel: styles.isIOS ? options[itemIndex].label : value,
    });
  }
  onShow = () => {
    const { editable } = this.props;
    if (editable) this.setState({ isShowPicker: true });
  }
  onCancel=() => {
    this.setState({ isShowPicker: false });
  }

  render() {
    const {
      input,
      placeholder, label, hasLabel, hasAsterisk,
      isTranslate, options, title,
      layout, itemSettings, itemstyle, labelStyle, inputStyle,
      placeholderStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
      textStyle, hasArrow, rightChildren,
      valueLabel, isShowValueLabel,
    } = this.props;
    const { isShowPicker, currentLabel } = this.state;

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
    const defaultValue = options.filter((item) => item.value === input.value);
    let itemLabel;
    const labelStyles = [styles.labelText];

    if (isTranslate) {
      itemLabel = translate(isShowValueLabel ? valueLabel : input.value);
    } else if (defaultValue && defaultValue[0]) {
      itemLabel = defaultValue[0].label;
    } else {
      itemLabel = currentLabel || placeholderText || valueLabel || options[0].label;
    }
    if (!defaultValue[0]) {
      labelStyles.push([styles.placeHolderStyle, placeholderStyle]);
    } else {
      labelStyles.push(textStyle);
    }

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
            { hasAsterisk && <Text style={styles.textRed}> *</Text> }
          </Label>
        )}
        <TouchableWithoutFeedback onPress={this.onShow}>
          <View style={styles.inputWrapper}>
            <Text style={labelStyles}>{itemLabel || placeholderText}</Text>
            {hasArrow && <Icon type="FontAwesome" name="caret-down" style={styles.arrowIcon} />}
          </View>
        </TouchableWithoutFeedback>
        <ModalSelect
          isVisible={isShowPicker}
          options={options}
          title={translate(title)}
          isTranslate={isTranslate}
          selectedValue={input.value}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
        />
        {rightChildren}
      </LayoutItem>
    );
  }
}

SelectInput.defaultProps = {
  input: {
    value: 1,
    onChange: () => null,
  },
  valueLabel: '',
  isShowValueLabel: false,
  placeholder: '',
  label: '',
  layout: '',
  itemSettings: {},
  itemstyle: {},
  labelStyle: {},
  inputStyle: {},
  placeholderStyle: {},
  hasLabel: false,
  hasArrow: false,
  hasAsterisk: false,
  editable: true,
  rightChildren: undefined,
  options: [
    { label: 'default', value: '1' },
  ],
  title: 'Select',
  isTranslate: true,
  firstErrorFieldKey: null,
  textStyle: {},
};

SelectInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  valueLabel: PropTypes.string,
  isShowValueLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.string,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  hasArrow: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
  editable: PropTypes.bool,
  rightChildren: PropTypes.any,
  options: PropTypes.array,
  title: PropTypes.string,
  isTranslate: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  textStyle: PropTypes.object,
};

export default SelectInput;
