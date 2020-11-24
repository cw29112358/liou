import React from 'react';
import PropTypes from 'prop-types';

import { renderLabel, renderText } from 'formFields/helpers';
import LayoutItem from 'formFields/LayoutItem';

import ModalPicker from 'components/ModalPicker';

import areaJSON from './area.json';

const pickerData = areaJSON.map((obj) => {
  const city = obj.city.map((cityObj) => ({
    [cityObj.name]: cityObj.area,
  }));
  return {
    [obj.name]: city,
  };
});

export class AreaPickerInput extends React.Component {
  state ={
    showPicker: false,
    pickerValue: ['北京', '北京', '东城区'],
  };

  onPickerConfirm = (data) => {
    const { input } = this.props;
    const value = data.join(' ');
    input.onChange(value);
    this.setState({
      showPicker: false,
      pickerValue: data,
    });
  }
  onPickerCancel = () => {
    this.setState({ showPicker: false });
  }
  // 显示modal + 清除错误
  onPickerShow = () => {
    const { input, onClearFirstErrorFieldKey } = this.props;
    onClearFirstErrorFieldKey(input.name);
    this.setState({ showPicker: true });
  }

  renderModalPicker() {
    const { showPicker, pickerValue } = this.state;
    return (
      <ModalPicker
        visible={showPicker}
        pickerTitleText="地址"
        pickerData={pickerData}
        selectedValue={pickerValue}
        onPickerConfirm={this.onPickerConfirm}
        onPickerCancel={this.onPickerCancel}
      />
    );
  }
  render() {
    return (
      <LayoutItem {...this.props}>
        { renderLabel(this.props) }
        { renderText.call(this, this.props, this.onPickerShow) }
        { this.renderModalPicker() }
      </LayoutItem>
    );
  }
}

AreaPickerInput.defaultProps = {
};

AreaPickerInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default AreaPickerInput;
