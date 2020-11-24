/**
*
* RadioButton
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  Radio,
  View,
} from 'native-base';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

export class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: !!props.input.value,
    };
  }

  onChange = () => {
    const { selected } = this.state;
    const { input, onClearFirstErrorFieldKey } = this.props;
    this.setState({ selected: !selected });
    input.onChange(!selected);
    onClearFirstErrorFieldKey(input.name);
  }

  render() {
    const {
      input, label, hasLabel, children, standardStyle,
      radioIconStyle,
      itemSettings, itemstyle, labelStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;
    const { selected } = this.state;
    let errorStyle = null;
    if (firstErrorFieldKey === input.name) errorStyle = styles.textRed.color;

    const labelText = label || input.name;

    return (
      <LayoutItem
        name={input.name}
        firstErrorFieldKey={firstErrorFieldKey}
        onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
        {...itemSettings}
        style={[styles.radioItemstyle, itemstyle]}
        onPress={this.onChange}
      >
        <Radio
          color={errorStyle}
          selectedColor={errorStyle}
          style={[styles.radio, radioIconStyle]}
          standardStyle={standardStyle}
          selected={selected}
          onPress={this.onChange}
        />
        <View>
          {!children && hasLabel
            && <Label style={labelStyle}>{translate(labelText)}</Label>
          }
          {children && children}
        </View>
      </LayoutItem>
    );
  }
}
RadioButton.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  label: '',
  itemSettings: {},
  itemstyle: {},
  labelStyle: {},
  radioIconStyle: {},
  hasLabel: false,
  children: null,
  standardStyle: true,
  firstErrorFieldKey: null,
};

RadioButton.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  label: PropTypes.string,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  radioIconStyle: PropTypes.object,
  hasLabel: PropTypes.bool,
  children: PropTypes.any,
  standardStyle: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default RadioButton;
