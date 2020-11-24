/**
*
* ChangePasswordCurrentForm
*
*/

/* global translate */
import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form/immutable';
import {
  Form,
  View,
  Button,
  Text,
  Icon,
} from 'native-base';

import formValidators from 'utils/formValidators';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';
import passwordImage from 'forms/LoginForm/assets/password.png';

import styles from './styles';

const {
  isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough,
} = formValidators;

const ChangePasswordCurrentForm = (props) => {
  const {
    linkToForgetPassword, handleSubmit, ...otherProps
  } = props;
  const formFieldsObject = {
    password: {
      type: 'textInput',
      secureTextEntry: true,
      placeholder: 'placeholderCurrentPassword',
      iconImage: passwordImage,
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      inputStyle: styles.inputStyle,
      iconStyle: styles.iconPasswordStyle,
      validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
    },
  };
  const formFields = [
    pick(formFieldsObject, 'password'),
  ];

  return (
    <Form style={styles.form}>
      <Text style={styles.title}>{translate('currentPassword')}</Text>

      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}

      <Text style={styles.darkGreyText} onPress={linkToForgetPassword}>
        {translate('forgetPassword')}
      </Text>

      <View style={styles.rowR}>
        <Button
          primary
          style={[styles.brandShadow, styles.buttonCircle]}
          onPress={handleSubmit}
        >
          <Icon name="ios-arrow-forward" style={styles.iconNext} />
        </Button>
      </View>
    </Form>
  );
};

ChangePasswordCurrentForm.defaultProps = {
  linkToForgetPassword: null,
};

ChangePasswordCurrentForm.propTypes = {
  linkToForgetPassword: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={ChangePasswordCurrentForm} />;

const form = reduxForm({
  form: 'changePasswordCurrentForm',
  destroyOnUnmount: true,
})(FormWithError);

export default form;
