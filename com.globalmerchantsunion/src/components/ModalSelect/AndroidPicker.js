/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';

import Mask from 'components/Mask';

class AndroidPicker extends React.PureComponent {
  componentWillUnmount() {
    this.onPickerHide();
  }

  handleConfirmAndroid = (value) => {
    const { onConfirm, options } = this.props;
    const optionsLabel = options.find((item) => translate(item.value) === value[0]);
    onConfirm(optionsLabel.value);
  };


  onPickerShow = () => {
    const {
      options, selectedValue, isTranslate, cancelText,
      confirmText, title,
    } = this.props;
    const optionsLabel = options.map((item) => translate(item.value));
    const selectdeLabel = isTranslate ? translate(selectedValue) : selectedValue;

    Picker.init({
      pickerData: optionsLabel,
      selectedValue: [selectdeLabel],
      onPickerConfirm: this.handleConfirmAndroid,
      onPickerCancel: this.onPressMask,
      pickerConfirmBtnText: translate(confirmText),
      pickerCancelBtnText: translate(cancelText),
      pickerTitleText: title,
      pickerConfirmBtnColor: [0, 127, 249, 1],
      pickerCancelBtnColor: [0, 127, 249, 1],
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

AndroidPicker.defaultProps = {
  cancelText: 'cancel',
  confirmText: 'confirm',
  selectedValue: '',
  onConfirm: () => null,
  onCancel: () => null,
  title: '',
  isVisible: false,
  options: [],
  isTranslate: true,
};

AndroidPicker.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  selectedValue: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  options: PropTypes.array,
  isTranslate: PropTypes.bool,
};

export default AndroidPicker;
