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
  OPTIONS_COUNTRY,
  PHONE_AREA_CODE,
} from 'utils/constants';

import styles from './styles';

const {
  isRequired, isDate, isValidString, isEmail, isInternationalPhone,
} = formValidators;
const getAPIPath = (props) => {
  const { authUser: { drivers } } = props;
  const driverId = drivers[0] ? drivers[0].id : '';
  return `api/driver/${driverId}`;
};
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile', 'drivers', 0];

function DriverForm(props) {
  const {
    selectedLicenseType, ...otherProps
  } = props;
  const formFieldsObject = {
    firstName: {
      hasLabel: true,
      validate: [isRequired],
      type: 'textInput',
      placeholder: 'placeholderDriverFormFirstName',
      layout: 'vertical',
      hasDeleteIcon: true,
      itemstyle: styles.item48,
      inputStyle: styles.inputStyle,
    },
    lastName: {
      hasLabel: true,
      validate: [isRequired],
      type: 'textInput',
      placeholder: 'placeholderDriverFormLastName',
      layout: 'vertical',
      hasDeleteIcon: true,
      itemstyle: styles.item48,
      inputStyle: styles.inputStyle,
    },
    birthday: {
      hasLabel: true,
      validate: [isRequired, isDate],
      type: 'dateTimeSelectInput',
      mode: 'date',
      placeholder: 'placeholderDriverFormBirthday',
      layout: 'vertical',
      itemstyle: styles.item48,
      textStyle: styles.inputStyle,
    },
    driverLicenseType: {
      hasLabel: true,
      validate: [isRequired],
      type: 'selectInput',
      placeholder: 'placeholderDriverLicenseType',
      title: 'driverLicenseType',
      options: OPTIONS_DRIVER_LICENSE_TYPE,
      layout: 'vertical',
      itemstyle: styles.item48,
    },
    driverLicenseNum: {
      hasLabel: true,
      validate: [isRequired, isValidString],
      type: 'textInput',
      placeholder: 'placeholderDriverFormDriverLicenseNum',
      layout: 'vertical',
      hasDeleteIcon: true,
      itemstyle: styles.item48,
      inputStyle: styles.inputStyle,
    },
    driverLicenseState: {
      hasLabel: true,
      validate: [isRequired],
      type: 'selectInput',
      placeholder: 'placeholderState',
      title: 'state',
      options: OPTIONS_STATE,
      isTranslate: false,
      layout: 'vertical',
      hasDeleteIcon: true,
      itemstyle: styles.item48,
    },
    driverLicenseCountry: {
      hasLabel: true,
      validate: [isRequired],
      type: 'selectInput',
      placeholder: 'placeholderDriverLicenseCountry',
      title: 'driverLicenseCountry',
      options: OPTIONS_COUNTRY,
      isTranslate: false,
      layout: 'vertical',
      hasDeleteIcon: true,
      itemstyle: styles.item48,
    },
    phoneNumber: {
      type: 'internationalPhoneField',
      layout: 'vertical',
      hasLabel: true,
      inputPlaceholderText: 'placeholderDriverFormPhone',
      selectOptions: PHONE_AREA_CODE,
      selectTitle: 'selectPhoneArea',
      selectPlaceholderStyle: styles.placeholderStyle,
      itemstyle: styles.item48,
      validate: [isRequired, isInternationalPhone],
    },
    email: {
      hasLabel: true,
      validate: [isRequired, isEmail],
      type: 'textInput',
      placeholder: 'placeholderDriverFormEmail',
      layout: 'vertical',
      hasDeleteIcon: true,
      itemstyle: styles.item48,
      inputStyle: styles.inputStyle,
    },
  };
  const isUs = selectedLicenseType === 'unitedStates';
  const state = isUs
    ? 'driverLicenseState' : 'driverLicenseCountry';
  const formFields = [
    pick(formFieldsObject,
      'firstName', 'lastName', 'birthday', 'driverLicenseType',
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
    const deleteKey = isUs ? 'driverLicenseCountry' : 'driverLicenseState';
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
    initialValues: Immutable.fromJS({
      driverLicenseType: 'unitedStates',
      driverLicenseState: 'al',
      driverLicenseCountry: 'afghanistan',
    }).merge(initialValues),
  };
})(form);

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
