/**
*
* MultiRadioButtonInput
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  View,
  Text,
  Label,
} from 'native-base';
import {
  TouchableWithoutFeedback,
} from 'react-native';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

class MultiRadioButtonInput extends React.Component {
  onChange = (value) => {
    const { input } = this.props;
    input.onChange(value);
  }

  render() {
    const {
      input, label, hasLabel, isRequired,
      layout, standardStyle, labelStyle, inputStyle,
      radioIconStyle, options,
      radioGroupItemStyle, radioGroupTextStyle,
      itemSettings, itemstyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;
    let errorStyle = null;
    if (firstErrorFieldKey === input.name) errorStyle = styles.textRed.color;

    const itemLayout = [itemstyle];
    const labelVertical = [labelStyle];
    const inputVertical = [inputStyle];
    if (layout === 'vertical') {
      itemLayout.push(styles.fieldVertical);
      labelVertical.push(styles.labelVertical);
      inputVertical.push(styles.inputVertical);
    }

    const labelText = label || input.name;

    return (
      <LayoutItem
        name={input.name}
        firstErrorFieldKey={firstErrorFieldKey}
        onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
        {...itemSettings}
        style={[styles.radioGroupStyle, itemstyle]}
      >
        { hasLabel && (
          <View style={styles.viewWrap}>
            <Label style={labelVertical}>
              {translate(labelText)}
              { isRequired && <Text style={styles.textRed}> *</Text> }
            </Label>
          </View>
        )}
        {
          options && options.map((item) => {
            const isSelected = item.value === input.value;
            return (
              <TouchableWithoutFeedback key={item.value}>
                <View style={[styles.radioGroupView, radioGroupItemStyle]}>
                  <Radio
                    color={errorStyle}
                    selectedColor={errorStyle}
                    style={[styles.multiRadio, radioIconStyle]}
                    standardStyle={standardStyle}
                    selected={isSelected}
                    onPress={() => this.onChange(item.value)}
                  />
                  <Text style={[styles.radioGroupText, radioGroupTextStyle]}>{translate(item.label)}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        }
      </LayoutItem>
    );
  }
}

MultiRadioButtonInput.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  label: '',
  options: [],
  itemSettings: {},
  itemstyle: {},
  labelStyle: {},
  radioIconStyle: {},
  radioGroupItemStyle: {},
  radioGroupTextStyle: {},
  hasLabel: false,
  children: null,
  standardStyle: true,
  firstErrorFieldKey: null,
};

MultiRadioButtonInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  label: PropTypes.string,
  options: PropTypes.array,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  radioIconStyle: PropTypes.object,
  radioGroupItemStyle: PropTypes.object,
  radioGroupTextStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  children: PropTypes.any,
  standardStyle: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default MultiRadioButtonInput;
