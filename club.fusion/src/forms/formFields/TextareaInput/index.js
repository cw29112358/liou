/**
*
* TextareaInput
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
} from 'native-base';

import { NBTextarea } from 'utils/inputSupportLanguage';

import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

const TextareaInput = (props) => {
  const {
    input, placeholder, label, hasLabel,
    layout, itemSettings, itemstyle, labelStyle, textareaStyle,
    firstErrorFieldKey, onSetFirstErrorFieldKeLayout, onClearFirstErrorFieldKey,
  } = props;

  const itemLayout = [styles.fieldNoBorder];
  const labelVertical = [];
  const inputVertical = [];
  if (layout === 'vertical') {
    itemLayout.push(styles.fieldVertical);
    labelVertical.push(styles.labelVertical);
  }
  if (itemstyle) itemLayout.push(itemstyle);
  if (labelStyle) labelVertical.push(labelStyle);
  if (textareaStyle) inputVertical.push(textareaStyle);

  if (firstErrorFieldKey === input.name) inputVertical.push(styles.fieldError);

  const labelText = label || input.name;
  const placeholderText = translate(placeholder);

  return (
    <LayoutItem
      name={input.name}
      firstErrorFieldKey={firstErrorFieldKey}
      onSetFirstErrorFieldKeLayout={onSetFirstErrorFieldKeLayout}
      {...itemSettings}
      style={itemLayout}
    >
      { hasLabel && (
        <Label style={labelVertical}>
          {translate(labelText)}
        </Label>
      )}
      <NBTextarea
        placeholder={placeholderText}
        value={input.value}
        bordered
        onChangeText={input.onChange}
        onFocus={() => onClearFirstErrorFieldKey(input.name)}
        style={inputVertical}
      />
    </LayoutItem>
  );
};

TextareaInput.defaultProps = {
  input: {},
  hasLabel: false,
  layout: undefined,
  label: undefined,
  placeholder: '',
  itemSettings: {},
  itemstyle: {},
  textareaStyle: {},
  labelStyle: {},
  firstErrorFieldKey: null,
  onSetFirstErrorFieldKeLayout: () => {},
};

TextareaInput.propTypes = {
  input: PropTypes.object,
  hasLabel: PropTypes.bool,
  layout: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  itemSettings: PropTypes.object,
  itemstyle: PropTypes.object,
  labelStyle: PropTypes.object,
  textareaStyle: PropTypes.object,
  firstErrorFieldKey: PropTypes.string,
  onSetFirstErrorFieldKeLayout: PropTypes.func,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default TextareaInput;
