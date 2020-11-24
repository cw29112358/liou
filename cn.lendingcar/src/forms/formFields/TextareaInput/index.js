/**
*
* TextareaInput
*
*/
import React from 'react';
import PropTypes from 'prop-types';

import { NBTextarea } from 'utils/inputSupportLanguage';

import { renderLabel, getPlaceholder, getInputStyle } from 'formFields/helpers';
import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

const TextareaInput = (props) => {
  const {
    input, onClearFirstErrorFieldKey,
  } = props;

  return (
    <LayoutItem {...props} defaultStyle={styles.withBorder}>
      { renderLabel(props) }
      <NBTextarea
        placeholder={getPlaceholder(props)}
        placeholderTextColor={styles.placeholder.color}
        value={input.value}
        style={getInputStyle(props)}
        onChangeText={input.onChange}
        onFocus={() => onClearFirstErrorFieldKey(input.name)}
      />
    </LayoutItem>
  );
};

TextareaInput.defaultProps = {
  input: {},
};

TextareaInput.propTypes = {
  input: PropTypes.object,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default TextareaInput;
