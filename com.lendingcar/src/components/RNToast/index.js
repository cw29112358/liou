/**
*
* RNToast Component
*
*/

import React from 'react';
import {
  View,
  Text,
  Button,
} from 'native-base';
import {
  Animated,
} from 'react-native';

import styles from './styles';

class RNToast extends React.Component {
  static toastInstance;
  static show({ ...config }) {
    this.toastInstance.showToast({ config });
  }
  static hide() {
    if (this.toastInstance.getModalState()) {
      this.toastInstance.closeToast('functionCall');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fadeAnim: new Animated.Value(0),
      viewHeight: 44,
    };
  }

  getToastStyle() {
    const { fadeAnim, position } = this.state;
    return {
      position: 'absolute',
      top: this.getTop(position),
      bottom: position === 'bottom' ? 0 : undefined,
      zIndex: 9,
      elevation: 9,
      width: '100%',
      opacity: fadeAnim,
    };
  }
  getTop(position) {
    const { statusbarHeight, deviceHeight } = styles;
    if (position === 'top') return statusbarHeight;

    const { viewHeight } = this.state;
    if (position === 'middle') {
      if (viewHeight) return (deviceHeight - viewHeight) / 2;

      return statusbarHeight;
    }

    return undefined;
  }
  onViewLayout = (e) => {
    this.setState({ viewHeight: e.nativeEvent.layout.height });
  }
  getButtonText(buttonText) {
    if (buttonText) {
      if (buttonText.trim().length === 0) {
        return undefined;
      } return buttonText;
    }
    return undefined;
  }
  getModalState() {
    const { modalVisible } = this.state;
    return modalVisible;
  }

  showToast({ config }) {
    this.setState({
      modalVisible: true,
      text: config.text,
      buttonText: this.getButtonText(config.buttonText),
      type: config.type,
      position: config.position ? config.position : 'bottom',
      style: config.style,
      buttonTextStyle: config.buttonTextStyle,
      buttonStyle: config.buttonStyle,
      textStyle: config.textStyle,
      onClose: config.onClose,
    });

    // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }

    // Set the toast to close after the duration.
    if (config.duration !== 0) {
      const duration = (config.duration > 0) ? config.duration : 1500;
      this.closeTimeout = setTimeout(this.closeToast.bind(this, 'timeout'), duration);
    }

    // Fade the toast in now.
    const { fadeAnim } = this.state;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
  }
  closeModal(reason) {
    this.setState({
      modalVisible: false,
    });
    const { onClose } = this.state;
    if (onClose && typeof onClose === 'function') {
      onClose(reason);
    }
  }
  closeToast(reason) {
    const { fadeAnim } = this.state;
    clearTimeout(this.closeTimeout);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start(this.closeModal.bind(this, reason));
  }

  renderToast() {
    const {
      style, type,
      text, textViewStyle, textStyle,
      buttonText, buttonStyle, buttonTextStyle,
    } = this.state;
    const newTextViewStyle = [styles.textView, textViewStyle];
    if (type) newTextViewStyle.push(styles[type]);

    return (
      <Animated.View style={this.getToastStyle()}>
        <View style={[styles.view, style]} onLayout={this.onViewLayout}>
          <View style={newTextViewStyle}>
            <Text style={[styles.text, textStyle]}>
              {text}
            </Text>
          </View>

          {buttonText && (
            <Button style={buttonStyle}>
              <Text style={[styles.text, buttonTextStyle]}>
                {buttonText}
              </Text>
            </Button>
          )}
        </View>
      </Animated.View>
    );
  }
  render() {
    const { modalVisible } = this.state;

    return modalVisible ? this.renderToast() : null;
  }
}

RNToast.defaultProps = {
};

RNToast.propTypes = {
};

export default RNToast;
