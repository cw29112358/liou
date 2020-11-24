/**
*
* TextareaInput
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';

import { NBTextarea } from 'utils/inputSupportLanguage';

import styles from 'formFields/styles';

const TextareaInput = (props) => {
  const {
    input, placeholder,
    textareaStyle,
    firstErrorFieldKey, onClearFirstErrorFieldKey,
  } = props;

  const itemLayout = [textareaStyle];
  if (firstErrorFieldKey === input.name) itemLayout.push(styles.fieldError);

  const placeholderText = translate(placeholder);
  return (
    <NBTextarea
      placeholder={placeholderText}
      value={input.value}
      bordered
      onChangeText={input.onChange}
      onFocus={() => onClearFirstErrorFieldKey(input.name)}
      style={itemLayout}
    />
  );
};

TextareaInput.defaultProps = {
  input: {},
  placeholder: '',
  textareaStyle: {},
  firstErrorFieldKey: null,
};

TextareaInput.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  textareaStyle: PropTypes.object,
  firstErrorFieldKey: PropTypes.string,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default TextareaInput;
