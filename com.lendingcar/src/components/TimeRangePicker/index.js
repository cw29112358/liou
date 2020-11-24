/**
*
* TimeRangePicker Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';

import Mask from 'components/Mask';

class TimeRangePicker extends React.Component {
  componentWillUnmount() {
    this.onPickerHide();
  }

  onPickerShow = () => {
    const {
      options, selectedValue, cancelText,
      confirmText, title,
    } = this.props;
    Picker.init({
      pickerData: options,
      selectedValue,
      onPickerConfirm: this.handleConfirmAndroid,
      onPickerCancel: this.onPressMask,
      pickerConfirmBtnText: confirmText,
      pickerCancelBtnText: cancelText,
      pickerTitleText: title,
      pickerConfirmBtnColor: [49, 208, 211, 1],
      pickerCancelBtnColor: [153, 153, 153, 1],
      pickerTitleColor: [20, 20, 20, 1],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerToolBarFontSize: 16,
      pickerFontSize: 16,
      pickerTextEllipsisLen: 100,
      pickerBg: [255, 255, 255, 1],
    });
    Picker.show();
  }
  onPickerHide = () => {
    Picker.hide();
  }
  onPressMask = () => {
    const { onCancel } = this.props;
    this.onPickerHide();
    onCancel();
  }

  handleConfirmAndroid = (value) => {
    const { onConfirm } = this.props;
    onConfirm(value);
  };

  render() {
    const { isVisible } = this.props;
    const modalProps = {
      visible: isVisible,
      onShow: this.onPickerShow,
      onDismiss: this.onPickerHide,
    };

    return (
      <Mask
        isFixed
        modalProps={modalProps}
        onPress={this.onPressMask}
      />
    );
  }
}

TimeRangePicker.defaultProps = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  selectedValue: [],
  onConfirm: () => null,
  onCancel: () => null,
  title: '',
  isVisible: false,
  options: [],
};

TimeRangePicker.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  selectedValue: PropTypes.array,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  options: PropTypes.array,
};

export default TimeRangePicker;
