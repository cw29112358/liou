/**
*
* DeleteNbInput Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'native-base';
import {
  TouchableHighlight,
  Image,
} from 'react-native';

import { nullFunction, executeFunction } from 'utils/helpers';
import { NBInput } from 'utils/inputSupportLanguage';

import variables from 'platform';
import deleteImage from './assets/delete.png';
import styles from './styles';


const { isIOS } = variables;

class DeleteNbInput extends React.Component { // eslint-disable-line
  state={
    showDelete: false,
    isFocus: false,
  }

  // input func
  onChange = (e) => {
    this.onExecuteInputFunc('onChange', e);
  }
  onChangeText = (value) => {
    this.onShowDeleteIcon(value);
    this.onExecuteInputFunc('onChangeText', value);
  }
  onFocus = () => {
    const { value } = this.props;
    this.onShowDeleteIcon(value);
    this.onFocusSetIsFocus();
    this.onExecuteInputFunc('onFocus');
  }
  onBlur = () => {
    this.onHideDeleteIcon();
    this.onBlurSetIsFocus();
    this.onExecuteInputFunc('onBlur');
  }
  onExecuteInputFunc(funcName, ...params) {
    const { [funcName]: func } = this.props;
    executeFunction(func, ...params);
  }

  // delete icon func
  onDelete = () => {
    this.onChange('');
    this.onChangeText('');
  }
  onShowDeleteIcon = (value) => {
    const { showDelete } = this.state;
    if (value && !showDelete) {
      this.onSetDeleteIcon(true);
    } else if (!value && showDelete) {
      this.onSetDeleteIcon(false);
    }
  }
  onHideDeleteIcon = () => {
    this.onSetDeleteIcon(false);
  }
  onSetDeleteIcon = (showDelete) => { // android
    const { hasDeleteIcon } = this.props;
    if (hasDeleteIcon && !isIOS) this.setState({ showDelete });
  }

  // isFocus
  onFocusSetIsFocus = () => {
    this.setIsFocus(true);
  }
  onBlurSetIsFocus = () => {
    this.setIsFocus(false);
  }
  setIsFocus(isFocus) { // ios
    const { noFocusPlaceholder } = this.props;
    if (noFocusPlaceholder && isIOS) this.setState({ isFocus });
  }

  getInputProps = () => ({
    onChange: this.onChange,
    onChangeText: this.onChangeText,
    onFocus: this.onFocus,
    onBlur: this.onBlur,
  })
  getInputRef = (ref) => {
    this.inputRef = ref;
    this.onExecuteInputFunc('inputRef', ref);
  }
  getPlaceholder = () => {
    const { noFocusPlaceholder, placeholder } = this.props;
    const { isFocus } = this.state;

    return (noFocusPlaceholder && isFocus) ? '' : placeholder;
  }

  renderDeleteButton() {
    const { deleteViewStyle } = this.props;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        style={[styles.deleteImageView, deleteViewStyle]}
        onPress={this.onDelete}
      >
        <Image source={deleteImage} style={styles.deleteImage} />
      </TouchableHighlight>
    );
  }
  renderTextInput() {
    const { hasDeleteIcon, value } = this.props;
    const deleteProps = this.getInputProps();

    return (
      <NBInput
        autoCapitalize="none"
        hasDeleteIcon
        clearButtonMode={hasDeleteIcon ? 'while-editing' : 'never'}
        {...this.props}
        inputRef={this.getInputRef}
        value={value}
        placeholder={this.getPlaceholder()}
        {...deleteProps}
      />
    );
  }
  render() {
    const { viewWithDeleteStyle, inputViewStyle } = this.props;
    const { showDelete } = this.state;

    const viewStyle = [styles.view];
    if (showDelete) viewStyle.push(styles.viewWithDelete);
    if (showDelete && viewWithDeleteStyle) viewStyle.push(viewWithDeleteStyle);

    return (
      <View style={[viewStyle, inputViewStyle]}>
        { this.renderTextInput() }
        { showDelete && this.renderDeleteButton()}
      </View>
    );
  }
}

DeleteNbInput.defaultProps = {
  noFocusPlaceholder: false,
  hasDeleteIcon: true,
  value: '',
  inputRef: nullFunction,
  viewWithDeleteStyle: undefined,
  deleteViewStyle: {},
  inputViewStyle: {},
};

DeleteNbInput.propTypes = {
  noFocusPlaceholder: PropTypes.bool,
  hasDeleteIcon: PropTypes.bool,
  value: PropTypes.string,
  inputRef: PropTypes.func,
  viewWithDeleteStyle: PropTypes.object,
  deleteViewStyle: PropTypes.object,
  inputViewStyle: PropTypes.object,
};

export default DeleteNbInput;
