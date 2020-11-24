/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import ReactNativeModal from 'react-native-modal';
import {
  Text,
  TouchableHighlight,
  View,
  Picker,
} from 'react-native';

import styles from './styles';

class IOSPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const { selectedValue } = props;
    this.state = {
      currentValue: selectedValue,
      itemIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedValue } = this.props;
    if (selectedValue !== nextProps.selectedValue) {
      this.setState({ currentValue: nextProps.selectedValue });
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.confirmed = false;
    onCancel();
    this.setState({ currentValue: '' });
  };
  handleConfirm = () => {
    const { onConfirm, options } = this.props;
    const { currentValue, itemIndex } = this.state;
    this.confirmed = true;
    // 点开之后直接确定时会显示未取值，此时值为数据中的第一个数据
    const confirmValue = currentValue || options[0].value;
    onConfirm(confirmValue, itemIndex);
  };

  handleOnModalHide = () => {
    const { onHideAfterConfirm } = this.props;
    const { currentValue } = this.state;
    if (this.confirmed) {
      onHideAfterConfirm(currentValue);
    }
  };

  renderPicker = () => {
    const {
      options, selectedValue, isTranslate,
    } = this.props;
    const { currentValue } = this.state;
    return (
      <Picker
        selectedValue={currentValue || selectedValue}
        onValueChange={(itemValue, itemIndex) => this.setState({ currentValue: itemValue, itemIndex })}
      >
        {options.map((item) => {
          const itemLabel = isTranslate ? translate(item.label) : item.label;
          return (<Picker.Item label={itemLabel} value={item.value} key={item.value} />);
        })}
      </Picker>
    );
  }
  renderConfirmButton = () => {
    const {
      confirmText, confirmTextStyle, customConfirmButton,
    } = this.props;
    const confirmButton = (
      <Text style={[styles.confirmText, confirmTextStyle]}>
        {translate(confirmText)}
      </Text>
    );
    return (
      <TouchableHighlight
        style={styles.confirmButton}
        underlayColor="#ebebeb"
        onPress={this.handleConfirm}
      >
        {customConfirmButton || confirmButton}
      </TouchableHighlight>
    );
  }
  renderCancelButton = () => {
    const {
      cancelText, cancelTextStyle, customCancelButton,
    } = this.props;
    const cancelButton = (
      <Text style={[styles.cancelText, cancelTextStyle]}>{translate(cancelText)}</Text>
    );

    return (
      <TouchableHighlight
        style={styles.cancelButton}
        underlayColor="#ebebeb"
        onPress={this.handleCancel}
      >
        {customCancelButton || cancelButton}
      </TouchableHighlight>
    );
  }
  renderPickerTitle = () => {
    const {
      title, customTitleContainer, titleStyle,
    } = this.props;
    if (!title) return null;
    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    );
    return customTitleContainer || titleContainer;
  }

  render() {
    const {
      isVisible,
      contentContainerStyle,
      pickerContainerStyle,
      reactNativeModalProps,
    } = this.props;

    return (
      <ReactNativeModal
        isVisible={isVisible}
        style={[styles.contentContainer, contentContainerStyle]}
        onModalHide={this.handleOnModalHide}
        backdropOpacity={0.4}
        {...reactNativeModalProps}
      >
        <View>
          <View style={[styles.pickerContainer, pickerContainerStyle]}>
            {this.renderPickerTitle()}
            {this.renderPicker()}
            {this.renderConfirmButton()}
          </View>
          {this.renderCancelButton()}
        </View>
      </ReactNativeModal>
    );
  }
}

IOSPicker.defaultProps = {
  isVisible: false,
  cancelText: 'cancel',
  customCancelButton: null,
  confirmText: 'confirm',
  customConfirmButton: null,
  title: '',
  customTitleContainer: null,
  options: [],
  isTranslate: true,
  reactNativeModalProps: {},
  contentContainerStyle: null,
  titleStyle: null,
  confirmTextStyle: null,
  cancelTextStyle: null,
  pickerContainerStyle: null,
  onConfirm: () => null,
  onCancel: () => null,
  onHideAfterConfirm: () => {},
};

IOSPicker.propTypes = {
  isVisible: PropTypes.bool,
  cancelText: PropTypes.string,
  customCancelButton: PropTypes.node,
  confirmText: PropTypes.string,
  customConfirmButton: PropTypes.node,
  title: PropTypes.string,
  customTitleContainer: PropTypes.node,
  options: PropTypes.array,
  isTranslate: PropTypes.bool,
  reactNativeModalProps: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  confirmTextStyle: PropTypes.any,
  cancelTextStyle: PropTypes.any,
  pickerContainerStyle: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onHideAfterConfirm: PropTypes.func,
};

export default IOSPicker;
