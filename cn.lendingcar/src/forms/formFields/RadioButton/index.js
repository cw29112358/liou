/**
*
* RadioButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
} from 'native-base';

import { renderLabel, getIsError } from 'formFields/helpers';
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
    const { standardStyle } = this.props;
    const { selected } = this.state;
    let errorStyle = null;
    if (getIsError(this.props)) errorStyle = styles.textRed.color;

    return (
      <LayoutItem
        {...this.props}
        onPress={this.onChange}
        defaultStyle={styles.fieldNoBorder}
      >
        { renderLabel(this.props) }
        <Radio
          color={errorStyle}
          selectedColor={errorStyle}
          style={styles.radio}
          standardStyle={standardStyle}
          selected={selected}
          onPress={this.onChange}
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
  standardStyle: true,
};

RadioButton.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  standardStyle: PropTypes.bool,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default RadioButton;
