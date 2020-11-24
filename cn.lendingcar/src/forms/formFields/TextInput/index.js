/**
*
* TextInput
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Icon,
} from 'native-base';
import {
  Image,
} from 'react-native';

import { executeFunction } from 'utils/helpers';

import DeleteNbInput from 'components/DeleteNbInput';

import { renderLabel, getInputStyle, getPlaceholder } from 'formFields/helpers';
import LayoutItem from 'formFields/LayoutItem';
import styles from 'formFields/styles';

function TextInput(props) {
  const {
    input, secureTextEntry, maxLength, editable, noFocusPlaceholder, hasDeleteIcon,
    iconNames, iconImage, iconStyle,
    leftChildren, rightChildren, onClearFirstErrorFieldKey,
  } = props;

  return (
    <LayoutItem {...props}>
      { renderLabel(props) }
      <View style={styles.row}>
        { leftChildren }
        <DeleteNbInput
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          editable={editable}
          noFocusPlaceholder={noFocusPlaceholder}
          hasDeleteIcon={hasDeleteIcon}
          style={getInputStyle(props)}
          placeholder={getPlaceholder(props)}
          placeholderTextColor={styles.placeholder.color}
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          onFocus={() => {
            onClearFirstErrorFieldKey(input.name);
            executeFunction(input.onFocus);
          }}
          onBlur={() => executeFunction(input.onBlur)}
        />
        {!!iconNames && <Icon active name={iconNames} style={iconStyle} />}
        {!!iconImage && <Image source={iconImage} style={iconStyle} />}
        { rightChildren }
      </View>
    </LayoutItem>
  );
}

TextInput.defaultProps = {
  input: {
    value: false,
    onChange: () => null,
  },
  secureTextEntry: false,
  maxLength: undefined,
  editable: true,
  noFocusPlaceholder: false,
  hasDeleteIcon: false,
  iconNames: '',
  iconImage: '',
  iconStyle: {},
  leftChildren: undefined,
  rightChildren: undefined,
};

TextInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }),
  secureTextEntry: PropTypes.bool,
  maxLength: PropTypes.number,
  editable: PropTypes.bool,
  noFocusPlaceholder: PropTypes.bool,
  hasDeleteIcon: PropTypes.bool,
  iconNames: PropTypes.string,
  iconImage: PropTypes.any,
  iconStyle: PropTypes.object,
  leftChildren: PropTypes.node,
  rightChildren: PropTypes.node,
  onClearFirstErrorFieldKey: PropTypes.func.isRequired,
};

export default TextInput;
