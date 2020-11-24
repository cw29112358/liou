/**
*
* ChangePasswordNewForm
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
  isRequired,
  isPassword,
  isPasswordLongEnough,
  isPasswordShortEnough,
  isRepeatNewPasswordSame,
} = formValidators;

const ChangePasswordNewForm = (props) => {
  const { handleSubmit, ...otherProps } = props;
  const formFieldsObject = {
    newPassword: {
      type: 'textInput',
      secureTextEntry: true,
      placeholder: 'placeholderNewPassword',
      iconImage: passwordImage,
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      inputStyle: styles.inputStyle,
      iconStyle: styles.iconPasswordStyle,
      validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
    },
    repeatNewPassword: {
      type: 'textInput',
      secureTextEntry: true,
      placeholder: 'placeholderRepeatNewPassword',
      iconImage: passwordImage,
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      inputStyle: styles.inputStyle,
      iconStyle: styles.iconPasswordStyle,
      validate: [isRequired, isRepeatNewPasswordSame],
    },
  };
  const formFields = [
    pick(formFieldsObject, 'newPassword', 'repeatNewPassword'),
  ];

  return (
    <Form style={styles.form}>
      <Text style={styles.title}>{translate('newPassword')}</Text>
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}
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

ChangePasswordNewForm.defaultProps = {
};

ChangePasswordNewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={ChangePasswordNewForm} />;

const form = reduxForm({
  form: 'changePasswordNewForm',
  destroyOnUnmount: true,
})(FormWithError);

export default form;
