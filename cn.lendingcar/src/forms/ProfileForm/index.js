/**
*
* ProfileForm
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Form,
  Icon,
  Text,
} from 'native-base';

import {
  OPTIONS_STATE,
  OPTIONS_GENDER,

  FORMAT_ZIP_CODE,
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
  isRequired, isDate, isEmail, isPhone,
} = formValidators;
const getAPIPath = (props) => `api/profile/${props.authUserId}`;
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile'];

function ProfileForm(props) {
  const {
    linkToENAddressTip, ...otherProps
  } = props;
  const formFieldsObject = {
    logo: {
      type: 'avatar',
      fileType: 'image',
      avatarStyle: styles.avatarStyle,
    },
    firstName: {
      type: 'textInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasAsterisk: true,
      placeholder: 'placeholderFirstName',
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    lastName: {
      type: 'textInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasAsterisk: true,
      placeholder: 'placeholderLastName',
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    gender: {
      type: 'selectInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasAsterisk: true,
      placeholder: 'placeholderGender',
      title: 'gender',
      options: OPTIONS_GENDER,
      inputStyle: styles.boldInput,
    },
    birthday: {
      type: 'dateTimeSelectInput',
      validate: [isRequired, isDate],
      layout: 'vertical',
      placeholder: 'placeholderBirthday',
      mode: 'date',
      hasLabel: true,
      hasAsterisk: true,
      inputStyle: styles.boldInput,
    },
    email: {
      type: 'textInput',
      validate: [isRequired, isEmail],
      layout: 'vertical',
      hasLabel: true,
      hasAsterisk: true,
      placeholder: 'placeholderEmail',
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    cnAddress: {
      type: 'areaPickerInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasAsterisk: true,
      placeholder: 'placeholderCnAddress',
      inputStyle: styles.boldInput,
    },
    cnStreetAddress: {
      type: 'textInput',
      validate: [isRequired],
      layout: 'vertical',
      hasLabel: true,
      hasAsterisk: true,
      placeholder: 'placeholderCnStreetAddress',
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    cnEmergencyPhoneNumber: {
      type: 'numberInput',
      validate: [isPhone],
      layout: 'vertical',
      maxLength: 11,
      hasLabel: true,
      placeholder: 'placeholderCnEmergencyPhoneNumber',
      prefix: '+86 ',
      inputStyle: styles.boldInput,
    },
    streetAddress: {
      type: 'textInput',
      layout: 'vertical',
      hasLabel: true,
      labelRight: (
        <Text style={[styles.questionIcon, { marginTop: -20, paddingTop: 20 }]} onPress={linkToENAddressTip}>
          &nbsp;
          <Icon
            style={styles.questionIcon}
            name="question"
            type="SimpleLineIcons"
            onPress={linkToENAddressTip}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Text>
      ),
      placeholder: 'placeholderStreetAddress',
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    streetAddress2: {
      type: 'textInput',
      layout: 'vertical',
      hasLabel: true,
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    city: {
      type: 'textInput',
      layout: 'vertical',
      hasLabel: true,
      placeholder: 'placeholderCity',
      hasDeleteIcon: true,
      inputStyle: styles.boldInput,
    },
    state: {
      type: 'selectInput',
      layout: 'vertical',
      hasLabel: true,
      placeholder: 'placeholderState',
      title: 'state',
      options: OPTIONS_STATE,
      isTranslate: false,
      inputStyle: styles.boldInput,
    },
    zipCode: {
      type: 'numberInput',
      layout: 'vertical',
      hasLabel: true,
      placeholder: 'placeholderZipCode',
      numberFormat: FORMAT_ZIP_CODE,
      maxLength: 5,
      inputStyle: styles.boldInput,
    },
    emergencyPhoneNumber: {
      type: 'numberInput',
      layout: 'vertical',
      maxLength: 10,
      hasLabel: true,
      placeholder: 'placeholderEmergencyPhoneNumber',
      prefix: '+1',
      inputStyle: styles.boldInput,
    },
  };
  const formFields = [
    pick(formFieldsObject, 'logo', 'lastName', 'firstName',
      'gender', 'birthday', 'email',
      'cnAddress', 'cnStreetAddress', 'cnEmergencyPhoneNumber',
      'streetAddress', 'streetAddress2', 'city', 'state',
      'zipCode', 'emergencyPhoneNumber'),
  ];

  return (
    <Form style={styles.form}>
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

ProfileForm.defaultProps = {
};

ProfileForm.propTypes = {
  linkToENAddressTip: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={ProfileForm} />;

const form = reduxForm({
  form: 'profileForm',
})(FormWithError);

const connectedForm = connect((state, props) => ({
  initialValues: state.getIn(getReduxEndPoint(props)),
}))(form);

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
