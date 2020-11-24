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
import {
  getTranslateText,
  getSelectedData,
} from './helpers';

class IOSPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '',
      currentIndex: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { selectedValue } = this.props;
    if (selectedValue !== nextProps.selectedValue) {
      this.setState({ currentValue: nextProps.selectedValue });
    }
  }

  handlePick = (currentValue, currentIndex) => {
    this.setState({
      currentValue,
      currentIndex,
    });
  }
  handleCancel = () => {
    const { onCancel } = this.props;
    this.confirmed = false;
    this.setState({ currentValue: '' });
    onCancel();
  };
  handleConfirm = () => {
    const {
      onConfirm, options, selectedValue, isTranslate,
    } = this.props;
    let { currentValue, currentIndex } = this.state;

    this.confirmed = true;
    // 点开之后直接确定时会显示未取值，此时值为数据中的第一个数据
    if (!currentValue) {
      if (selectedValue) {
        const { selectedIndex } = getSelectedData(options, isTranslate, selectedValue);
        currentIndex = selectedIndex;
      } else {
        currentIndex = 0;
      }
    }
    currentValue = options[currentIndex].value;

    const option = options[currentIndex];
    onConfirm({
      index: currentIndex,
      value: currentValue,
      option,
      translatedLabel: getTranslateText(option.label, isTranslate),
    });
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
        selectedValue={currentValue || selectedValue || options[0].value}
        onValueChange={this.handlePick}
      >
        {options.map((item) => {
          const itemLabel = getTranslateText(item.label, isTranslate);
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
        {confirmText}
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
      <Text style={[styles.cancelText, cancelTextStyle]}>{cancelText}</Text>
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
      customTitleContainer, title, titleStyle,
    } = this.props;
    if (customTitleContainer) return customTitleContainer;
    if (!title) return null;

    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
    );
  }

  render() {
    const {
      isVisible,
      reactNativeModalProps,
      contentContainerStyle,
      pickerContainerStyle,
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
  customTitleContainer: null,
  customConfirmButton: null,
  customCancelButton: null,
  title: '',
  confirmText: '确定',
  cancelText: '取消',
  isTranslate: true,
  options: [],
  selectedValue: '',
  reactNativeModalProps: {},
  contentContainerStyle: undefined,
  pickerContainerStyle: undefined,
  titleStyle: undefined,
  confirmTextStyle: undefined,
  cancelTextStyle: undefined,
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
  isTranslate: PropTypes.bool,
  options: PropTypes.array,
  selectedValue: PropTypes.any,
  reactNativeModalProps: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  pickerContainerStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  confirmTextStyle: PropTypes.any,
  cancelTextStyle: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onHideAfterConfirm: PropTypes.func,
};

export default IOSPicker;
