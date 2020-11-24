/**
*
* AdderButton
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  Icon,
  View,
  Text,
} from 'native-base';
import {
  TouchableOpacity,
} from 'react-native';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

class AdderButton extends React.Component {
  onChange = (step) => {
    const { input: { onChange, value }, minValue } = this.props;
    let nextValue = value + step;
    if (minValue && nextValue < minValue) nextValue = minValue;
    onChange(nextValue);
  }
  onPressMinus = () => {
    this.onChange(-1);
  }
  onPressPlus = () => {
    this.onChange(1);
  }

  renderButton(name, onPress, buttonStyle) {
    return (
      <TouchableOpacity
        style={[styles.row, styles.adderButton, buttonStyle]}
        onPress={onPress}
      >
        <Icon style={styles.adderIcon} name={name} type="Entypo" />
      </TouchableOpacity>
    );
  }

  render() {
    const {
      input, label, iconName, iconType,
      itemstyle, iconStyle, labelStyle, inputStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;

    const itemLayout = [styles.fieldNoBorder, styles.adderItem];
    const labelVertical = [];
    const inputVertical = [];
    if (itemstyle) itemLayout.push(itemstyle);
    if (labelStyle) labelVertical.push(labelStyle);
    if (inputStyle) inputVertical.push(inputStyle);

    const labelText = label || input.name;
    if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

    return (
      <LayoutItem
        name={input.name}
        firstErrorFieldKey={firstErrorFieldKey}
        onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
        style={itemLayout}
      >
        <View style={styles.row}>
          { iconName && <Icon style={iconStyle} name={iconName} type={iconType} /> }
          <Label style={labelVertical}>{ translate(labelText)}</Label>
        </View>

        <View style={styles.row}>
          <Text style={inputVertical}>{ input.value }</Text>
          <View style={styles.adderButtonView}>
            { this.renderButton('minus', this.onPressMinus, styles.adderButtonBorder)}
            { this.renderButton('plus', this.onPressPlus) }
          </View>
        </View>
      </LayoutItem>
    );
  }
}

AdderButton.defaultProps = {
  label: undefined,
  input: {},
  minValue: undefined,
  iconName: undefined,
  iconType: 'FontAwesome',
  itemstyle: {},
  iconStyle: {},
  labelStyle: {},
  inputStyle: {},
  firstErrorFieldKey: null,
};

AdderButton.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  minValue: PropTypes.number,
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  itemstyle: PropTypes.object,
  iconStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  firstErrorFieldKey: PropTypes.string,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default AdderButton;
