/**
*
* FurtherInfomationForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
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
} from 'utils/constants';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired, isZipCode, isDate, isValidString,
} = formValidators;
const FIELDS_ARRAY = [
  {
    fieldName: 'firstName',
    type: 'textInput',
    validate: [isRequired],
    label: 'name',
    hasLabel: true,
    placeholder: 'firstName',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item47,
    inputStyle: styles.inputStyle,
  }, {
    fieldName: 'lastName',
    type: 'textInput',
    validate: [isRequired],
    hasBlankLabel: true,
    hasLabel: false,
    placeholder: 'lastName',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item49,
    inputStyle: styles.inputStyle,
  }, {
    fieldName: 'birthday',
    type: 'dateTimeSelectInput',
    mode: 'date',
    validate: [isRequired, isDate],
    label: 'birthday',
    placeholder: 'placeholderStreet2',
    hasLabel: true,
    layout: 'vertical',
    itemstyle: styles.item47,
    textStyle: styles.inputStyle,
  }, {
    fieldName: 'phoneNumber',
    type: 'numberInput',
    validate: [isRequired],
    label: 'emergencyContactPhoneNumber',
    hasLabel: true,
    placeholder: 'placeholderStreet2',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item49,
    inputStyle: styles.inputStyle,
  }, {
    fieldName: 'driverLicenseState',
    label: 'driverLicenseState',
    hasLabel: true,
    validate: [isRequired],
    type: 'selectInput',
    title: 'state',
    placeholder: 'placeholderStreet2',
    options: OPTIONS_STATE,
    isTranslate: false,
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item47,
  }, {
    fieldName: 'driverLicenseNum',
    label: 'driverLicenseNum',
    hasLabel: true,
    validate: [isRequired, isValidString],
    type: 'textInput',
    placeholder: 'placeholderStreet2',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item49,
    inputStyle: styles.inputStyle,
  }, {
    fieldName: 'streetAddress',
    type: 'textInput',
    validate: [isRequired],
    label: 'streetAddress',
    hasLabel: true,
    placeholder: 'placeholderStreet',
    layout: 'vertical',
    hasDeleteIcon: true,
    inputStyle: styles.inputStyle,
    itemstyle: styles.item100,
  }, {
    fieldName: 'streetAddress2',
    type: 'textInput',
    hasLabel: false,
    layout: 'vertical',
    hasDeleteIcon: true,
    placeholder: 'placeholderStreet2',
    inputStyle: styles.inputStyle,
    itemstyle: styles.item100,
  }, {
    fieldName: 'city',
    type: 'textInput',
    validate: [isRequired],
    hasLabel: false,
    placeholder: 'city',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item28,
    inputStyle: styles.inputStyle,
  }, {
    fieldName: 'state',
    type: 'selectInput',
    validate: [isRequired],
    hasLabel: false,
    placeholder: 'state',
    title: 'state',
    options: OPTIONS_STATE,
    isTranslate: false,
    layout: 'vertical',
    itemstyle: styles.item28,
  }, {
    fieldName: 'zipCode',
    type: 'numberInput',
    validate: [isRequired, isZipCode],
    hasLabel: false,
    placeholder: 'placeholderZip',
    numberFormat: FORMAT_ZIP_CODE,
    layout: 'vertical',
    maxLength: 5,
    inputStyle: styles.inputStyle,
    itemstyle: styles.item28,
  }];

const FurtherInfomationForm = (props) => {
  const {
    handleSubmit, submit, coApplicants, ...otherProps
  } = props;
  let isValidate = !!coApplicants;
  if (coApplicants) isValidate = coApplicants.size > 0;
  // Add your formField in this object
  const formFieldsObject = {
    coApplicants: {
      type: 'loanFormFieldsArray',
      fillContent: coApplicants,
      label: 'name',
      hasLabel: true,
      fieldsArray: FIELDS_ARRAY,

      hasEmptyList: true,
      isFieldArray: true,
      layout: 'vertical',
      hasDeleteIcon: true,
      minField: 0,
      maxField: 3,
      itemstyle: styles.item100,
      inputStyle: styles.inputStyle,
    },
  };

  // 使用 pick 方法挑选出你需要展示的formField
  const formFields = [
    pick(formFieldsObject, 'coApplicants'),
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
          onPress={isValidate ? handleSubmit : () => submit(Immutable.List([]))}
        >
          <Text style={styles.buttonText}>{translate('submit')}</Text>
        </Button>
      </View>
    </Form>
  );
};

FurtherInfomationForm.defaultProps = {
  coApplicants: null,
};

FurtherInfomationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  coApplicants: PropTypes.any,
};

const FormWithError = (props) => <ValidForm {...props} component={FurtherInfomationForm} />;

const form = reduxForm({
  form: 'furtherInfomationForm',
  destroyOnUnmount: true,
})(FormWithError);

const selector = formValueSelector('furtherInfomationForm');

const mapStateToProps = createPropsSelector({
  // authUser: selectAuthUserInfo,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const connectedForm = connect((state) => ({
  // initialValues: Immutable.fromJS({
  // }),
  coApplicants: selector(state, 'coApplicants'),
}))(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
