/**
*
* PasswordForm
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
} from 'native-base';

import formValidators from 'utils/formValidators';
import { openURLByLinking } from 'utils/helpers';
import { DOCUMENT_URL } from 'utils/constants';

import Feedback from 'components/Feedback';

import Group from 'forms/formFields';
import passwordImage from 'forms/LoginForm/assets/password.png';
import ValidForm from 'forms/ValidForm';

import styles from './styles';

const {
  isRequired,
  isPassword, isPasswordLongEnough, isPasswordShortEnough, isRepeatPasswordSame,
  isTerm,
} = formValidators;

const getSignUpTip = () => {
  const feedbackProps = {
    hasTitle: false,
    hasLink: false,
    viewStyle: styles.radioChildren,
    textStyle: styles.greyText,
    textArray: [
      { label: 'inputPasswordTipLineOne' },
      {
        label: 'serviceTerms',
        isStress: true,
        onPress: () => {
          openURLByLinking(DOCUMENT_URL.terms);
        },
      },
      { label: 'and' },
      {
        label: 'privacyPolicy',
        isStress: true,
        onPress: () => {
          openURLByLinking(DOCUMENT_URL.privacy);
        },
      },
    ],
  };
  return <Feedback {...feedbackProps} />;
};

const PasswordForm = (props) => {
  const {
    title, hasTerms, handleSubmit, ...otherProps
  } = props;
  const formFieldsObject = {
    password: {
      type: 'textInput',
      secureTextEntry: true,
      placeholder: 'placeholderPassword',
      iconImage: passwordImage,
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      iconStyle: styles.iconPasswordStyle,
      validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
    },
    repeatPassword: {
      type: 'textInput',
      secureTextEntry: true,
      placeholder: 'placeholderRepeatPassword',
      iconImage: passwordImage,
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      iconStyle: styles.iconPasswordStyle,
      validate: [isRequired, isRepeatPasswordSame],
    },
    terms: {
      type: 'radioButton',
      children: getSignUpTip(),
      validate: [isTerm],
    },
  };
  const formFields = [
    pick(formFieldsObject, 'password', 'repeatPassword', hasTerms ? 'terms' : ''),
  ];

  return (
    <Form style={styles.form}>
      <Text style={styles.title}>{translate(title)}</Text>

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
          <Text>{translate('finish')}</Text>
        </Button>
      </View>
    </Form>
  );
};

PasswordForm.defaultProps = {
  hasTerms: false,
  title: '',
};

PasswordForm.propTypes = {
  hasTerms: PropTypes.bool,
  title: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

const FormWithError = (props) => <ValidForm {...props} component={PasswordForm} />;

const form = reduxForm({
  form: 'passwordForm',
  destroyOnUnmount: true,
})(FormWithError);

export default form;
