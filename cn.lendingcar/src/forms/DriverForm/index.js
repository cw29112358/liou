/**
*
* DriverForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import {
  Form,
} from 'native-base';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import { updateFormAction } from 'containers/AppRouter/actions';
import { selectAuthUserId, selectAuthUserInfo } from 'containers/AppRouter/selectors';

import formValidators from 'utils/formValidators';

import {
  OPTIONS_DRIVER_LICENSE_TYPE,
  OPTIONS_STATE,
  OPTIONS_PROVINCE,
} from 'utils/constants';

import styles from './styles';

const {
  isRequired, isDate, isValidString, isDriverLicense, isEmail,
} = formValidators;
const getAPIPath = (props) => {
  const { authUser: { drivers } } = props;
  const driverId = drivers[0] ? drivers[0].id : '';
  return `api/driver/${driverId}`;
};
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile', 'drivers', 0];

function DriverForm(props) {
  const { selectedLicenseType, ...otherProps } = props;
  const isUs = selectedLicenseType === 'unitedStates';
  const state = isUs ? 'driverLicenseState' : 'driverLicenseProvince';

  const formFieldsObject = {
    firstName: {
      type: 'textInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      placeholder: 'placeholderDriverFormFirstName',
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    lastName: {
      type: 'textInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      placeholder: 'placeholderDriverFormLastName',
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    birthday: {
      type: 'dateTimeSelectInput',
      validate: [isRequired, isDate],
      layout: 'vertical',
      hasLabel: true,
      mode: 'date',
      placeholder: 'placeholderDriverFormBirthday',
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    driverLicenseType: {
      type: 'selectInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      placeholder: 'placeholderDriverLicenseType',
      title: 'driverLicenseType',
      options: OPTIONS_DRIVER_LICENSE_TYPE,
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    driverLicenseNum: {
      type: 'textInput',
      validate: isUs ? [isRequired, isValidString] : [isRequired, isValidString, isDriverLicense],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      maxLength: 18,
      placeholder: 'placeholderDriverFormDriverLicenseNum',
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    driverLicenseState: {
      type: 'selectInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      placeholder: 'placeholderState',
      title: 'state',
      options: OPTIONS_STATE,
      isTranslate: false,
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    driverLicenseProvince: {
      type: 'selectInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      placeholder: 'placeholderDriverLicenseProvince',
      title: 'driverLicenseProvince',
      options: OPTIONS_PROVINCE,
      isTranslate: false,
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    phoneNumber: {
      type: 'numberInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      maxLength: 11,
      placeholder: 'placeholderDriverFormPhone',
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
    email: {
      type: 'textInput',
      validate: [isRequired, isEmail],
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      placeholder: 'placeholderDriverFormEmail',
      itemStyle: styles.item48,
      inputStyle: styles.boldInput,
    },
  };
  const formFields = [
    pick(formFieldsObject,
      'lastName', 'firstName', 'birthday', 'driverLicenseType',
      'driverLicenseNum', state, 'phoneNumber', 'email'),
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
    </Form>
  );
}

DriverForm.defaultProps = {
  selectedLicenseType: '',
};

DriverForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  selectedLicenseType: PropTypes.string,
};

const FormWithError = (props) => <ValidForm {...props} component={DriverForm} />;

const form = reduxForm({
  form: 'driverForm',
  destroyOnUnmount: true,
})(FormWithError);

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
  authUser: selectAuthUserInfo,
});
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (formMap, _dispatch, props) => {
    const { authUser: { drivers }, onBack } = props;
    const driverId = drivers[0] ? drivers[0].id : '';
    const isCreate = !driverId;

    const driverLicenseType = formMap ? formMap.get('driverLicenseType') : '';
    const isUs = driverLicenseType === 'unitedStates';
    const deleteKey = isUs ? 'driverLicenseProvince' : 'driverLicenseState';
    const handledFormMap = formMap.delete(deleteKey);

    dispatch(updateFormAction(handledFormMap, getAPIPath(props), getReduxEndPoint(props), isCreate, onBack));
  },
});

const selector = formValueSelector('driverForm');
const connectedForm = connect((state, props) => {
  let initialValues = state.getIn(getReduxEndPoint(props));
  if (!initialValues || !initialValues.size) initialValues = Immutable.Map();

  return {
    selectedLicenseType: selector(state, 'driverLicenseType'),
    initialValues: initialValues.merge(Immutable.fromJS({
      driverLicenseType: initialValues.get('driverLicenseType') || 'unitedStates',
      driverLicenseState: initialValues.get('driverLicenseState') || 'al',
      driverLicenseProvince: initialValues.get('driverLicenseProvince') || '北京',
    })),
  };
})(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
