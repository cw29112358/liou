/**
*
* ProfileForm
*
*/
import React from 'react';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Form,
} from 'native-base';

import {
  OPTIONS_STATE,
  OPTIONS_GENDER,

  FORMAT_ZIP_CODE,

  PHONE_AREA_CODE,
} from 'utils/constants';
import formValidators from 'utils/formValidators';

import {
  selectAuthUserId,
  selectAuthUserInfo,
  selectAuthUserMembership,
} from 'containers/AppRouter/selectors';
import {
  updateFormAction,
  uploadRefFileAction,
} from 'containers/AppRouter/actions';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired, isDate, isEmail, isZipCode, isNotUserPhone, isInternationalPhone,
} = formValidators;
const getAPIPath = (props) => `api/profile/${props.authUserId}`;
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile'];

function ProfileForm(props) {
  const formFieldsObject = {
    logo: {
      type: 'avatar',
      fileType: 'image',
      avatarStyle: styles.avatarStyle,
    },
    firstName: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderFirstName',
      layout: 'vertical',
      hasDeleteIcon: true,
      inputStyle: styles.inputStyle,
    },
    lastName: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderLastName',
      layout: 'vertical',
      hasDeleteIcon: true,
      inputStyle: styles.inputStyle,
    },
    gender: {
      type: 'selectInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderGender',
      title: 'gender',
      options: OPTIONS_GENDER,
      layout: 'vertical',
    },
    birthday: {
      type: 'dateTimeSelectInput',
      mode: 'date',
      validate: [isRequired, isDate],
      hasLabel: true,
      layout: 'vertical',
      textStyle: styles.inputStyle,
    },
    email: {
      type: 'textInput',
      validate: [isRequired, isEmail],
      hasLabel: true,
      placeholder: 'placeholderEmail',
      layout: 'vertical',
      hasDeleteIcon: true,
      inputStyle: styles.inputStyle,
    },
    streetAddress: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderStreetAddress',
      layout: 'vertical',
      hasDeleteIcon: true,
      inputStyle: styles.inputStyle,
    },
    streetAddress2: {
      type: 'textInput',
      hasLabel: true,
      layout: 'vertical',
      hasDeleteIcon: true,
      inputStyle: styles.inputStyle,
    },
    city: {
      type: 'textInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderCity',
      layout: 'vertical',
      hasDeleteIcon: true,
      inputStyle: styles.inputStyle,
    },
    state: {
      type: 'selectInput',
      validate: [isRequired],
      hasLabel: true,
      placeholder: 'placeholderState',
      title: 'state',
      options: OPTIONS_STATE,
      isTranslate: false,
      layout: 'vertical',
    },
    zipCode: {
      type: 'numberInput',
      validate: [isRequired, isZipCode],
      hasLabel: true,
      placeholder: 'placeholderZipCode',
      numberFormat: FORMAT_ZIP_CODE,
      layout: 'vertical',
      maxLength: 5,
      inputStyle: styles.inputStyle,
    },
    emergencyPhoneNumber: {
      type: 'internationalPhoneField',
      layout: 'vertical',
      inputPlaceholderText: 'placeholderEmergencyPhoneNumber',
      hasLabel: true,
      selectOptions: PHONE_AREA_CODE,
      selectTitle: 'selectPhoneArea',
      selectPlaceholderStyle: styles.placeholderStyle,
      validate: [isInternationalPhone, isNotUserPhone],
    },
  };
  const formFields = [
    pick(formFieldsObject, 'logo', 'firstName', 'lastName',
      'gender', 'birthday', 'email',
      'streetAddress', 'streetAddress2', 'city', 'state',
      'zipCode', 'emergencyPhoneNumber'),
  ];
  return (
    <Form style={styles.form}>
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...props}
        />
      ))}
    </Form>
  );
}

ProfileForm.defaultProps = {
};

ProfileForm.propTypes = {
};

const FormWithError = (props) => <ValidForm {...props} component={ProfileForm} />;

const form = reduxForm({
  form: 'profileForm',
})(FormWithError);

const connectedForm = connect((state, props) => {
  const profileData = state.getIn(getReduxEndPoint(props));
  return ({
    initialValues: profileData,
  });
})(form);

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
  authUser: selectAuthUserInfo,
  authUserMembership: selectAuthUserMembership,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (formMap, _dispatch, props) => {
      const { onBack } = props;
      dispatch(updateFormAction(formMap, getAPIPath(props), getReduxEndPoint(props), false, onBack));
    },
    onUpload: (field, fileBuffer, props) => {
      const { authUserId } = props;
      const reduxEndPoint = ['appRouter', 'users', props.authUserId, 'profile', field];
      const reduxFormEndPoint = ['form', 'profileForm', 'values', field];
      dispatch(uploadRefFileAction('Profile', authUserId, field, fileBuffer, reduxEndPoint, reduxFormEndPoint, true));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(connectedForm);
