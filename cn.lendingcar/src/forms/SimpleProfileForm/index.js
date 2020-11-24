/**
*
* SimpleProfileForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Form,
} from 'native-base';

import formValidators from 'utils/formValidators';

import {
  selectAuthUserId,
  selectAuthUserInfo,
} from 'containers/AppRouter/selectors';
import {
  updateFormAction,
  uploadRefFileAction,
  logInByJwtTokenAction,
} from 'containers/AppRouter/actions';

import Button from 'components/Button';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const { isRequired, isEmail } = formValidators;

const getAPIPath = (props) => `api/profile/${props.authUserId}`;
const getReduxEndPoint = (props) => ['appRouter', 'users', props.authUserId, 'profile'];

const SimpleProfileForm = (props) => {
  const {
    onFocusRefId, onBlurRefId, handleSubmit, ...otherProps
  } = props;

  const formFieldsObject = {
    logo: {
      type: 'avatar',
      fileType: 'image',
      isShowAvatarInfo: false,
      isShowUserName: true,
      itemStyle: styles.avatarItem,
      avatarStyle: styles.avatarStyle,
      nameStyle: styles.nameStyle,
    },
    firstName: {
      type: 'textInput',
      validate: [isRequired],
      noFocusPlaceholder: true,
      layout: 'vertical',
      placeholder: 'placeholderFirstName',
      itemStyle: styles.item48,
      inputStyle: styles.inputStyle,
    },
    lastName: {
      type: 'textInput',
      validate: [isRequired],
      layout: 'vertical',
      noFocusPlaceholder: true,
      placeholder: 'placeholderLastName',
      itemStyle: styles.item48,
      inputStyle: styles.inputStyle,
    },
    email: {
      type: 'textInput',
      validate: [isEmail],
      layout: 'vertical',
      noFocusPlaceholder: true,
      placeholder: 'placeholderEmail',
      itemStyle: styles.item100,
      inputStyle: styles.inputStyle,
    },
    refId: {
      type: 'textInput',
      layout: 'vertical',
      noFocusPlaceholder: true,
      placeholder: 'placeholderSimpleRefId',
      itemStyle: styles.item100,
      inputStyle: styles.inputStyle,
      onFocus: onFocusRefId,
      onBlur: onBlurRefId,
    },
  };
  const formFields = [
    pick(formFieldsObject, 'logo', 'lastName', 'firstName', 'email', 'refId'),
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

      <Button
        shadowStyle={styles.buttonView}
        onPress={handleSubmit}
        style={styles.button}
        textLabel="submit"
        textStyle={styles.buttonText}
      />
    </Form>
  );
};

SimpleProfileForm.defaultProps = {
};

SimpleProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onFocusRefId: PropTypes.func.isRequired,
  onBlurRefId: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} showAllError component={SimpleProfileForm} />;

const form = reduxForm({
  form: 'simpleProfileForm',
  destroyOnUnmount: true,
})(FormWithError);

const connectedForm = connect((state, props) => ({
  initialValues: state.getIn(getReduxEndPoint(props)),
}))(form);

const mapStateToProps = createPropsSelector({
  authUserId: selectAuthUserId,
  authUser: selectAuthUserInfo,
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (formMap, _dispatch, props) => {
      const onSuccess = () => {
        Actions.reset('home');
        dispatch(logInByJwtTokenAction());
      };
      dispatch(updateFormAction(formMap, getAPIPath(props), getReduxEndPoint(props), false, onSuccess));
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
