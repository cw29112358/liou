/**
*
* SelectInputPhone
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Label,
  Text,
  View,
  Icon,
} from 'native-base';

import ModalSelectPhone from 'components/ModalSelectPhone';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

export class SelectInputPhone extends React.Component {
  state={
    isShowPicker: false,
    currentLabel: '',
  }
  showPicker = () => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    this.setState({ isShowPicker: true });
    onClearFirstErrorFieldKey(input.name);
  }
  onConfirm= (value, itemIndex) => {
    const { input, options } = this.props;
    input.onChange(value);
    this.setState({
      isShowPicker: false,
      currentLabel: styles.isIOS ? options[itemIndex].label : value,
    });
  }
  onCancel=() => {
    this.setState({ isShowPicker: false });
  }

  render() {
    const {
      input,
      placeholder, label, hasLabel, isRequired, hasLabelIcon, onLabelIconPress,
      viewWrapStyles, iconStyles,
      isTranslate, options, title,
      layout, itemSettings, itemstyle, labelStyle,
      // inputStyle,
      placeholderStyle, isShowArrow, dropdownStyles,
      // firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
      textStyle,
      valueLabel, isShowValueLabel,
    } = this.props;
    const { isShowPicker, currentLabel } = this.state;

    // const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    // const inputVertical = [inputStyle, styles.picker];
    if (layout === 'vertical') {
    //   itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
      // inputVertical.push(styles.inputVertical);
    }
    // if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

    const labelText = label || input.name;
    const placeholderText = (itemSettings && itemSettings.floatingLabel === true)
      ? null : translate(placeholder);
    const defaultValue = options.filter((item) => item.value === input.value);
    let itemLabel;
    const labelStyles = [styles.labelText];

    if (isTranslate) {
      itemLabel = translate(isShowValueLabel ? valueLabel : input.value);
    } else if (defaultValue[0]) {
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
        {...this.props}
        itemstyle={itemstyle}
      >
        { hasLabel && (
          <View style={[styles.viewWrap, viewWrapStyles]}>
            <Label style={labelVertical}>
              { translate(labelText) }
              { isRequired && <Text style={styles.textRed}> *</Text> }
            </Label>
            { hasLabelIcon && <Text>  </Text> }
            { hasLabelIcon && (
              <Icon
                style={[styles.questionIcon, iconStyles]}
                name="question"
                type="SimpleLineIcons"
                onPress={onLabelIconPress}
              />
            ) }
          </View>
        )}
        <TouchableWithoutFeedback onPress={this.showPicker}>
          <View style={styles.touchStyles}>
            <Text style={labelStyles}>{itemLabel || placeholderText}</Text>
            {isShowArrow && <Icon name="md-arrow-dropdown" style={[styles.dropdown, dropdownStyles]} />}
          </View>
        </TouchableWithoutFeedback>
        <ModalSelectPhone
          isVisible={isShowPicker}
          options={options}
          title={translate(title)}
          isTranslate={isTranslate}
          selectedValue={input.value}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
        />
      </LayoutItem>
    );
  }
}

SelectInputPhone.defaultProps = {
  input: {
    value: false,
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
  isRequired: false,
  hasLabelIcon: false,
  isShowArrow: false,
  dropdownStyles: {},
  onLabelIconPress: () => {},
  viewWrapStyles: {},
  iconStyles: {},
  options: [
    { label: 'default', value: '1' },
  ],
  title: 'Select',
  isTranslate: true,
  firstErrorFieldKey: null,
  textStyle: {},
};

SelectInputPhone.propTypes = {
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
  isRequired: PropTypes.bool,
  hasLabelIcon: PropTypes.bool,
  isShowArrow: PropTypes.bool,
  dropdownStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onLabelIconPress: PropTypes.func,
  viewWrapStyles: PropTypes.object,
  iconStyles: PropTypes.object,
  options: PropTypes.array,
  title: PropTypes.string,
  isTranslate: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
  textStyle: PropTypes.object,
};

export default SelectInputPhone;
