/**
*
* CompositeField
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import {
  View,
  Label,
} from 'native-base';

import formValidators from 'utils/formValidators';
import { PHONE_AREA_CODE } from 'utils/constants';

import Group from 'forms/formFields';
import phoneImage from 'forms/LoginForm/assets/phone.png';

import styles from 'formFields/styles';

const {
  isRequired,
  isPhone,
} = formValidators;

function CompositeField(props) {
  const {
    prefixKey, suffixKey, hasIcon, hasLabel, labelStyle,
    suffixPlaceholder,
    compositeLayoutStyle,
    layout, itemStyle, inputStyle,
    title, onSendVerificationCode,
    handleSubmit, formSyncErrors, promptKeyErrorBeforeEvent,
    countryCode, phoneNumber,
    firstErrorFieldKey,
    ...otherProps
  } = props;

  const formFieldsObject = {
    [prefixKey]: {
      valueLabel: `area${countryCode}`,
      isShowValueLabel: true,
      type: 'selectInput',
      title: 'selectPhoneArea',
      options: PHONE_AREA_CODE,
      itemstyle: styles.countryCodeField,
      iconStyle: styles.iconPhoneStyle,
      placeholderStyle: styles.selectPlaceholderStyle,
      dropdownStyles: styles.dropdownStyles,
      textStyle: styles.selectLabelStyle,
      inputStyle,
      isShowArrow: true,
    },
    [suffixKey]: {
      type: 'numberInput',
      placeholder: suffixPlaceholder,
      iconImage: hasIcon ? phoneImage : null,
      itemSettings: {
        rounded: true,
      },
      inputStyle,
      itemstyle: styles.phoneNumberField,
      iconStyle: styles.iconPhoneStyle,
      validate: [isRequired, isPhone],
    },
  };

  const labelVertical = [labelStyle];
  if (layout === 'vertical') {
    labelVertical.push(styles.labelVertical);
  }

  const formFields = [
    pick(formFieldsObject, prefixKey, suffixKey),
  ];
  const phoneItem = [styles.numberLayoutStyle, compositeLayoutStyle];
  if (firstErrorFieldKey === suffixKey) phoneItem.push(styles.fieldError);
  return (
    <View style={itemStyle}>
      { hasLabel && <Label style={labelVertical}>{translate(suffixKey)}</Label>}
      <View style={phoneItem}>
        {
          formFields.map((formField) => (
            <Group
              fieldsObject={formField}
              key={formField}
              {...otherProps}
            />
          ))
        }
      </View>
    </View>
  );
}

CompositeField.defaultProps = {
  prefixKey: 'countryCode',
  suffixKey: 'phoneNumber',
  suffixPlaceholder: 'placeholderPhoneNumber',
  hasIcon: true,
  hasLabel: false,
  labelStyle: {},
  layout: '',
  compositeLayoutStyle: {},
  itemStyle: {},
  inputStyle: {},
  title: '',
  firstErrorFieldKey: '',
  phoneNumber: null,
  onSendVerificationCode: () => null,
  countryCode: 1,
};

CompositeField.propTypes = {
  prefixKey: PropTypes.string,
  suffixKey: PropTypes.string,
  suffixPlaceholder: PropTypes.string,
  hasIcon: PropTypes.bool,
  hasLabel: PropTypes.bool,
  labelStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  inputStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  compositeLayoutStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  itemStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  layout: PropTypes.string,
  title: PropTypes.string,
  firstErrorFieldKey: PropTypes.string,
  onSendVerificationCode: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  formSyncErrors: PropTypes.object.isRequired,
  promptKeyErrorBeforeEvent: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  countryCode: PropTypes.number,
};

export default CompositeField;
