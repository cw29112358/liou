/**
*
* PaymentForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import pick from 'lodash/pick';
import {
  Form,
  View,
  Button,
  Text,
} from 'native-base';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import formValidators from 'utils/formValidators';

import {
  OPTIONS_COUNTRY,
} from 'utils/constants';

import styles from './styles';

const {
  isRequired, isValidString, isValidCardNum, isZipCode, isValidNumber, isEmail,
} = formValidators;

const formFieldsObject = {
  paymentName: {
    hasLabel: true,
    validate: [isRequired],
    type: 'textInput',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item100,
    inputStyle: styles.inputStyle,
  },
  paymentCardNum: {
    hasLabel: true,
    validate: [isRequired, isValidCardNum],
    type: 'numberInput',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item100,
    inputStyle: styles.inputStyle,
    placeholder: 'placeholderPaymentCardNum',
    interval: 4,
    maxLength: 19,
  },
  paymentExp: {
    hasLabel: true,
    validate: [isRequired],
    type: 'monthYearInput',
    mode: 'date',
    dateFormat: 'MM/YY',
    layout: 'vertical',
    itemstyle: styles.item48,
    textStyle: styles.inputStyle,
    placeHolderTextStyle: styles.inputStyle,
    placeholder: 'placeholderPaymentExp',
  },
  paymentCvv: {
    hasLabel: true,
    validate: [isRequired, isValidNumber],
    type: 'numberInput',
    layout: 'vertical',
    itemstyle: styles.item48,
    inputStyle: styles.inputStyle,
    placeholder: 'placeholderPaymentCvv',
    maxLength: 3,
  },
  paymentZip: {
    hasLabel: true,
    validate: [isRequired, isValidString, isZipCode],
    type: 'numberInput',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item48,
    inputStyle: styles.inputStyle,
    placeholder: 'placeholderPaymentZip',
    maxLength: 5,
  },
  paymentCountry: {
    hasLabel: true,
    validate: [isRequired],
    type: 'selectInput',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item48,
    title: 'driverLicenseCountry',
    options: OPTIONS_COUNTRY,
    isTranslate: false,
  },
  email: {
    hasLabel: true,
    validate: [isEmail],
    type: 'textInput',
    layout: 'vertical',
    placeholder: 'placeholderCardEmail',
    hasDeleteIcon: true,
    itemstyle: styles.item100,
  },
};

function PaymentForm(props) {
  const {
    handleSubmit, selectedLicenseType, ...otherProps
  } = props;
  const formFields = [
    pick(formFieldsObject,
      'paymentName', 'paymentCardNum',
      'paymentExp', 'paymentCvv',
      'paymentZip', 'paymentCountry', 'email'),
  ];

  return (
    <Form style={[styles.form, styles.rowLR, styles.rowWrap]}>
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}

      <View style={styles.buttonView}>
        <Button
          rounded
          style={[styles.brandShadow, styles.button]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>{translate('confirmPayment')}</Text>
        </Button>
      </View>
    </Form>
  );
}

PaymentForm.defaultProps = {
  selectedLicenseType: '',
};

PaymentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  selectedLicenseType: PropTypes.string,
};

const FormWithError = (props) => <ValidForm {...props} component={PaymentForm} />;

const form = reduxForm({
  form: 'paymentForm',
  destroyOnUnmount: true,
  initialValues: {
    paymentCountry: 'unitedStates',
  },
})(FormWithError);

export default form;
