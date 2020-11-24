/**
*
* LoginForm
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Icon,
  View,
  Text,
} from 'native-base';

import formValidators from 'utils/formValidators';
import { getImmutableData } from 'utils/helpers';

import VerificationCodeTimer from 'components/VerificationCodeTimer';

import Group from 'forms/formFields';
import CompositeField from 'forms/formFields/CompositeField';
import ValidForm from 'forms/ValidForm';

import styles from './styles';
// import phoneImage from './assets/phone.png';
import passwordImage from './assets/password.png';

const {
  isRequired,
  // isPhone,
  isPassword, isPasswordLongEnough, isPasswordShortEnough,
} = formValidators;

function LoginForm(props) {
  const {
    isPasswordLogin, linkToForgetPassword, onVerificationCodeLogin, onPasswordLogin,
    onSendVerificationCode,
    handleSubmit, formSyncErrors, promptKeyErrorBeforeEvent,
    countryCode, phoneNumber,
    ...otherProps
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
      inputStyle: styles.inputStyle,
      iconStyle: styles.iconPasswordStyle,
      validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
    },
    verificationCode: {
      type: 'numberInput',
      placeholder: 'placeholderVerificationCode',
      itemSettings: {
        rounded: true,
      },
      itemstyle: styles.itemstyle,
      validate: [isRequired],
      rightChildren: (
        <VerificationCodeTimer
          label="sendVerificationCode"
          onPress={(onSuccess) => {
            const callback = () => onSendVerificationCode(countryCode, phoneNumber, 60, onSuccess);
            promptKeyErrorBeforeEvent('phoneNumber', callback);
          }}
          buttonStyle={styles.brandShadow}
        />
      ),
    },
  };
  const formFields = [
    pick(formFieldsObject, isPasswordLogin ? 'password' : 'verificationCode'),
  ];
  const renderPasswordText = () => (
    <View style={styles.rowLR}>
      <Text style={styles.darkGreyText} onPress={linkToForgetPassword}>
        {translate('forgetPassword')}
      </Text>
      <Text style={styles.greyText} onPress={onVerificationCodeLogin}>
        {translate('verificationCodeLogin')}
      </Text>
    </View>
  );
  const renderVerificationCodeText = () => (
    <View style={styles.rowR}>
      <Text style={styles.greyText} onPress={onPasswordLogin}>
        {translate('passwordLogin')}
      </Text>
    </View>
  );

  return (
    <Form style={styles.form}>
      <Text style={styles.title}>{translate('login')}</Text>
      <CompositeField {...props} />
      {formFields.map((formField) => (
        <Group
          fieldsObject={formField}
          key={formField}
          {...otherProps}
        />
      ))}

      { isPasswordLogin ? renderPasswordText() : renderVerificationCodeText() }

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
}

LoginForm.defaultProps = {
  phoneNumber: null,
  countryCode: 1,
};

LoginForm.propTypes = {
  isPasswordLogin: PropTypes.bool.isRequired,
  linkToForgetPassword: PropTypes.func.isRequired,
  onPasswordLogin: PropTypes.func.isRequired,
  onVerificationCodeLogin: PropTypes.func.isRequired,
  onSendVerificationCode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formSyncErrors: PropTypes.object.isRequired,
  promptKeyErrorBeforeEvent: PropTypes.func.isRequired,
  phoneNumber: PropTypes.any,
  countryCode: PropTypes.number,
};

const FormWithError = (props) => <ValidForm {...props} component={LoginForm} />;

const form = reduxForm({
  form: 'loginForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
})(FormWithError);

const selector = formValueSelector('loginForm');

const mapStateToProps = (state) => ({
  initialValues: getImmutableData({
    countryCode: 1,
  }),
  phoneNumber: selector(state, 'phoneNumber'),
  countryCode: selector(state, 'countryCode'),
});

export default connect(mapStateToProps, null)(form);
