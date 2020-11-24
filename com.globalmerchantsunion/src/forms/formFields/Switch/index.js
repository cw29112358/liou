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
  Switch,
} from 'native-base';
import variables from 'platform';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';
const {
  isIOS,
} = variables;

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
      input, label, hasLabel,
      itemSettings, itemstyle, labelStyle,
      firstErrorFieldKey, onSetFirstErrorFieldKeLayout,
    } = this.props;
    const { selected } = this.state;

    const labelText = label || input.name;
    const thumbTintColor = isIOS ? {} : { thumbTintColor: styles.white };
    return (
      <LayoutItem
        name={input.name}
        firstErrorFieldKey={firstErrorFieldKey}
        onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
        {...itemSettings}
        style={[styles.switchItemstyle, itemstyle]}
        onPress={this.onChange}
      >
        {hasLabel && <Label style={[styles.switchText, labelStyle]}>{translate(labelText)}</Label> }
        <Switch
          style={styles.switchButton}
          onTintColor={styles.brand}
          value={selected}
          onValueChange={this.onChange}
          {...thumbTintColor}
        />
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
  hasLabel: PropTypes.bool,
  children: PropTypes.any,
  standardStyle: PropTypes.bool,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
  onSetFirstErrorFieldKeLayout: PropTypes.func.isRequired,
};

export default RadioButton;
