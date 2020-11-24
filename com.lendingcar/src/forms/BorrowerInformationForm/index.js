/**
*
* BorrowerInformationForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import Immutable from 'immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import {
  Button,
  Text,
  Form,
  View,
} from 'native-base';

import formValidators from 'utils/formValidators';
import {
  OPTIONS_STATE,
  FORMAT_ZIP_CODE,
  HOME_OPTIONS,
} from 'utils/constants';

import {
  selectDrivers,
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired, isValidString, isDate, isZipCode,
} = formValidators;

class BorrowerInformationForm extends React.Component { // eslint-disable-line
  render() {
    const { handleSubmit, haveOwnHome, ...otherProps } = this.props;
    const formFieldsObject = {
      firstName: {
        type: 'textInput',
        validate: [isRequired],
        label: 'name',
        hasLabel: true,
        placeholder: 'firstName',
        layout: 'vertical',
        hasDeleteIcon: true,
        itemstyle: styles.item48,
        inputStyle: styles.inputStyle,
      },
      lastName: {
        type: 'textInput',
        validate: [isRequired],
        hasBlankLabel: true,
        hasLabel: false,
        placeholder: 'lastName',
        layout: 'vertical',
        hasDeleteIcon: true,
        itemstyle: styles.item48,
        inputStyle: styles.inputStyle,
      },
      birthday: {
        type: 'dateTimeSelectInput',
        mode: 'date',
        validate: [isRequired, isDate],
        hasLabel: true,
        layout: 'vertical',
        itemstyle: styles.item48,
        textStyle: styles.inputStyle,
      },
      phoneNumber: {
        type: 'numberInput',
        validate: [isRequired],
        label: 'emergencyContactPhoneNumber',
        hasLabel: true,
        placeholder: 'placeholderStreet2',
        layout: 'vertical',
        hasDeleteIcon: true,
        itemstyle: styles.item48,
        inputStyle: styles.inputStyle,
      },
      driverLicenseState: {
        hasLabel: true,
        validate: [isRequired],
        type: 'selectInput',
        title: 'state',
        options: OPTIONS_STATE,
        isTranslate: false,
        layout: 'vertical',
        hasDeleteIcon: true,
        itemstyle: styles.item48,
      },
      driverLicenseNum: {
        hasLabel: true,
        validate: [isRequired, isValidString],
        type: 'textInput',
        layout: 'vertical',
        hasDeleteIcon: true,
        itemstyle: styles.item48,
        inputStyle: styles.inputStyle,
      },
      streetAddress: {
        type: 'textInput',
        validate: [isRequired],
        hasLabel: true,
        placeholder: 'placeholderStreet',
        layout: 'vertical',
        hasDeleteIcon: true,
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      streetAddress2: {
        type: 'textInput',
        hasLabel: false,
        layout: 'vertical',
        hasDeleteIcon: true,
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      city: {
        type: 'textInput',
        validate: [isRequired],
        hasLabel: false,
        placeholder: 'city',
        layout: 'vertical',
        hasDeleteIcon: true,
        itemstyle: styles.item28,
        inputStyle: styles.inputStyle,
      },
      state: {
        type: 'selectInput',
        validate: [isRequired],
        hasLabel: false,
        placeholder: 'state',
        title: 'state',
        options: OPTIONS_STATE,
        isTranslate: false,
        layout: 'vertical',
        itemstyle: styles.item28,
      },
      zipCode: {
        type: 'numberInput',
        validate: [isRequired, isZipCode],
        hasLabel: false,
        placeholder: 'placeholderZip',
        numberFormat: FORMAT_ZIP_CODE,
        layout: 'vertical',
        maxLength: 5,
        inputStyle: styles.inputStyle,
        itemstyle: styles.item28,
      },
      haveOwnHome: {
        type: 'multiRadioButtonInput',
        validate: [isRequired],
        hasLabel: true,
        options: HOME_OPTIONS,
        placeholder: 'placeholderHaveOwnHome',
        layout: 'vertical',
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      monthlyRent: {
        type: 'numberInput',
        validate: haveOwnHome ? null : [isRequired],
        parseNumber: true,
        hasLabel: true,
        layout: 'vertical',
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      monthlyIncome: {
        type: 'numberInput',
        validate: [isRequired],
        parseNumber: true,
        hasLabel: true,
        layout: 'vertical',
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      creditScore: {
        type: 'numberInput',
        validate: [isRequired],
        hasLabel: true,
        placeholder: 'placeholderCreditScore',
        layout: 'vertical',
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      ssn: {
        type: 'textInput',
        validate: [isRequired],
        hasLabel: true,
        placeholder: 'placeholderSSN',
        layout: 'vertical',
        inputStyle: styles.inputStyle,
        itemstyle: styles.item100,
      },
      authorized: {
        type: 'radioButton',
        validate: [isRequired],
        hasLabel: true,
        layout: 'vertical',
        labelStyle: styles.optionText,
        radioIconStyle: styles.radioIcon,
        inputStyle: styles.inputStyle,
        itemstyle: styles.radioButton,
      },
    };

    const monthlyRent = haveOwnHome ? '' : 'monthlyRent';
    const formFields = [
      pick(formFieldsObject, 'firstName', 'lastName', 'birthday', 'phoneNumber',
        'driverLicenseState', 'driverLicenseNum', 'streetAddress', 'streetAddress2', 'city', 'state', 'zipCode',
        'haveOwnHome', monthlyRent, 'monthlyIncome', 'creditScore', 'ssn', 'authorized'),
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
            block
            primary
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text>{translate('submit')}</Text>
          </Button>
        </View>
      </Form>
    );
  }
}

BorrowerInformationForm.defaultProps = {
};

BorrowerInformationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={BorrowerInformationForm} />;

const form = reduxForm({
  form: 'borrowerInformationForm',
  destroyOnUnmount: false,
})(FormWithError);

const selector = formValueSelector('borrowerInformationForm');

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  drivers: selectDrivers,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const connectedForm = connect((state, props) => {
  const { drivers, authUser } = props;
  return ({
    initialValues: Immutable.fromJS({
      ...authUser,
      ...drivers[0],
    }),
    haveOwnHome: selector(state, 'haveOwnHome'),
  });
})(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
