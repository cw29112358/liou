import React from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';

import Mask from 'components/Mask';
import { nullFunction } from 'utils/helpers';

export class ModalPicker extends React.Component {
  componentWillUnmount() {
    this.onPickerHide();
  }

  onPickerShow = () => {
    const {
      pickerData, selectedValue,
      pickerTitleText, pickerConfirmBtnText, pickerCancelBtnText,
      onPickerConfirm, onPickerCancel,
    } = this.props;

    Picker.init({
      pickerData,
      selectedValue,
      onPickerConfirm,
      onPickerCancel,
      pickerTitleText,
      pickerConfirmBtnText,
      pickerCancelBtnText,
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

  // 隐藏+取消
  onPressMask = () => {
    const { onPickerCancel } = this.props;
    onPickerCancel();
    this.onPickerHide();
  }

  render() {
    const { visible } = this.props;
    const modalProps = {
      visible,
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

ModalPicker.defaultProps = {
  visible: false,
  pickerTitleText: undefined,
  pickerConfirmBtnText: '确认',
  pickerCancelBtnText: '取消',
  pickerData: [],
  selectedValue: [],
  onPickerConfirm: nullFunction,
  onPickerCancel: nullFunction,
};

ModalPicker.propTypes = {
  visible: PropTypes.bool,
  pickerTitleText: PropTypes.string,
  pickerConfirmBtnText: PropTypes.string,
  pickerCancelBtnText: PropTypes.string,
  pickerData: PropTypes.array,
  selectedValue: PropTypes.array,
  onPickerConfirm: PropTypes.func,
  onPickerCancel: PropTypes.func,
};

export default ModalPicker;
