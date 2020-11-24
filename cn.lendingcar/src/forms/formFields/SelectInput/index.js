/**
*
* SelectInput
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';

import ModalSelect from 'components/ModalSelect';

import { renderLabel, renderText } from 'formFields/helpers';
import LayoutItem from 'formFields/LayoutItem';

export class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowPicker: false,
      translatedLabel: undefined,
    };
  }

  getShowValue = () => {
    const { translatedLabel } = this.state;
    if (translatedLabel) return translatedLabel;

    const { input: { value }, options, isTranslate } = this.props;
    if (!value) return undefined;

    const findItem = options.find((item) => item.value === value);
    if (!findItem) return undefined;

    return isTranslate ? translate(findItem.label) : findItem.label;
  }

  onConfirm= ({ value, translatedLabel }) => {
    const { input } = this.props;

    this.setState({
      isShowPicker: false,
      translatedLabel,
    });
    input.onChange(value);
  }
  onShow = () => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    onClearFirstErrorFieldKey(input.name);
    this.setState({ isShowPicker: true });
  }
  onCancel=() => {
    this.setState({ isShowPicker: false });
  }

  render() {
    const {
      input: { value }, isTranslate, options, title,
    } = this.props;
    const { isShowPicker } = this.state;

    return (
      <LayoutItem {...this.props}>
        { renderLabel(this.props) }
        { renderText.call(this, this.props, this.onShow, this.getShowValue()) }
        <ModalSelect
          isVisible={isShowPicker}
          title={translate(title)}
          isTranslate={isTranslate}
          options={options}
          selectedValue={value}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
        />
      </LayoutItem>
    );
  }
}

SelectInput.defaultProps = {
  isTranslate: true,
  options: [],
  title: 'Select',
};

SelectInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  isTranslate: PropTypes.bool,
  options: PropTypes.array,
  title: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default SelectInput;
