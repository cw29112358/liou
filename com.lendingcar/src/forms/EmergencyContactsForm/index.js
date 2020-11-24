/**
*
* EmergencyContactsForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
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
  isRequired, isZipCode,
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
    itemstyle: styles.item48,
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
    itemstyle: styles.item48,
    inputStyle: styles.inputStyle,
  }, {
    fieldName: 'phoneNumber',
    type: 'numberInput',
    validate: [isRequired],
    label: 'emergencyContactPhoneNumber',
    hasLabel: true,
    placeholder: 'placeholderStreet2',
    layout: 'vertical',
    hasDeleteIcon: true,
    itemstyle: styles.item100,
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

const EmergencyContactsForm = (props) => {
  const { handleSubmit, emergencyContacts, ...otherProps } = props;
  // Add your formField in this object
  const formFieldsObject = {
    emergencyContacts: {
      type: 'loanFormFieldsArray',
      fillContent: emergencyContacts,
      validate: [isRequired],
      label: 'name',
      fieldsArray: FIELDS_ARRAY,
      hasLabel: true,

      isFieldArray: true,
      layout: 'vertical',
      hasDeleteIcon: true,
      minField: 1,
      maxField: 5,
      itemPaddingTop: 20,
      itemstyle: styles.item100,
      inputStyle: styles.inputStyle,
    },
  };

  // 使用 pick 方法挑选出你需要展示的formField
  const formFields = [
    pick(formFieldsObject, 'emergencyContacts'),
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
          <Text style={styles.buttonText}>{translate('next')}</Text>
        </Button>
      </View>
    </Form>
  );
};

EmergencyContactsForm.defaultProps = {
  emergencyContacts: null,
};

EmergencyContactsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  emergencyContacts: PropTypes.any,
};

const FormWithError = (props) => <ValidForm {...props} component={EmergencyContactsForm} />;

const form = reduxForm({
  form: 'emergencyContactForm',
  destroyOnUnmount: true,
})(FormWithError);

const selector = formValueSelector('emergencyContactForm');

const mapStateToProps = createPropsSelector({
  // authUser: selectAuthUserInfo,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const connectedForm = connect((state) => ({
  // initialValues: Immutable.fromJS({
  // }),
  emergencyContacts: selector(state, 'emergencyContacts'),
}))(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
