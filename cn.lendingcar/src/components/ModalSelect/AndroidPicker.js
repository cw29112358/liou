import React from 'react';
import PropTypes from 'prop-types';

import ModalPicker from 'components/ModalPicker';

import {
  getTranslateText,
  getSelectedData,
} from './helpers';

class AndroidPicker extends React.PureComponent {
  handleConfirm = (selectedArray) => {
    const { options, isTranslate, onConfirm } = this.props;
    const translatedLabel = selectedArray[0];

    // 比较label
    const { selectedOption, selectedIndex } = getSelectedData(options, isTranslate, translatedLabel);
    onConfirm({
      index: selectedIndex,
      value: selectedOption.value,
      option: selectedOption,
      translatedLabel,
    });
  };

  render() {
    const {
      isVisible, title, cancelText, confirmText,
      isTranslate, options, selectedValue,
      onCancel,
    } = this.props;

    // option值为  isTranslate ? 翻译label数组 ： label数组
    const translatedOptions = options.map((item) => getTranslateText(item.label, isTranslate));
    // 比较value
    const { selectedIndex } = getSelectedData(options, isTranslate, selectedValue, 'value');
    const translatedLabel = translatedOptions[selectedIndex];

    return (
      <ModalPicker
        visible={isVisible}
        pickerTitleText={title}
        pickerConfirmBtnText={cancelText}
        pickerCancelBtnText={confirmText}
        pickerData={translatedOptions}
        selectedValue={[translatedLabel]}
        onPickerConfirm={this.handleConfirm}
        onPickerCancel={onCancel}
      />
    );
  }
}

AndroidPicker.defaultProps = {
  isVisible: false,
  title: undefined,
  cancelText: undefined,
  confirmText: undefined,
  isTranslate: true,
  options: [],
  selectedValue: '',
  onConfirm: () => null,
  onCancel: () => null,
};

AndroidPicker.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  isTranslate: PropTypes.bool,
  options: PropTypes.array,
  selectedValue: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AndroidPicker;
