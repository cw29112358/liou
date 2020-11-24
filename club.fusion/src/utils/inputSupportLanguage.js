/**
*
* return InputSupportLanguage Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
} from 'react-native';
import {
  Textarea,
  Input,
} from 'native-base';
import isNil from 'lodash/isNil';

export const inputSupportLanguage = (WrappedComponent) => {
  class InputSupportLanguage extends React.Component { // eslint-disable-line


    shouldComponentUpdate(nextProps) {
      const isUpdate = Platform.OS !== 'ios'
      || this.isUpdateKey(nextProps, 'value', 'defaultValue')
      || this.isUpdateKey(nextProps, 'defaultValue', 'value');
      return isUpdate;
    }
    isUpdateKey(nextProps, key, nillKey) {
      const { [key]: value } = this.props;
      const { [key]: nextValue } = nextProps;

      return isNil(nextProps[nillKey]) && (value === nextValue || !nextValue);
    }

    render() {
      const { inputRef } = this.props;
      return <WrappedComponent ref={inputRef} {...this.props} />;
    }
  }

  InputSupportLanguage.defaultProps = {
    inputRef: undefined,
    value: undefined,
    defaultValue: undefined,
  };

  InputSupportLanguage.propTypes = {
    inputRef: PropTypes.func,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
  };

  return InputSupportLanguage;
};

export const NBInput = inputSupportLanguage(Input);
export const NBTextarea = inputSupportLanguage(Textarea);
