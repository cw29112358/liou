/**
*
* LoginForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import {
  Form,
} from 'native-base';
import {
  Image,
} from 'react-native';

import formValidators from 'utils/formValidators';
import { getImmutableData } from 'utils/helpers';

import VerificationCodeTimer from 'components/VerificationCodeTimer';

import Group from 'forms/formFields';
import ValidForm from 'forms/ValidForm';
import CompositeField from 'forms/formFields/CompositeField';

import logoImage from 'assets/logo.png';
import Button from 'components/Button';

import styles from './styles';
import passwordImage from './assets/password.png';

const {
  isRequired,
  isPassword,
  isPasswordLongEnough,
  isPasswordShortEnough,
  isRepeatPasswordSame,
} = formValidators;

class LoginForm extends React.Component {
  renderButton = (title, onPress) => (
    <Button
      shadowStyle={[styles.submitPosition, styles.brandShadow]}
      {...styles.linearProps}
      onPress={onPress}
      style={styles.linearButton}
      textLabel={title}
      textStyle={styles.linearButtonText}
    />
  );

  render() {
    const {
      placeholderPassword, placeholderRepeatPassword,
      logoProps, title, pickArray, phoneNumber, children,
      onSendVerificationCode, handleSubmit, promptKeyErrorBeforeEvent,
      countryCode, hasPhoneNumber,
      ...otherProps
    } = this.props;

    const formFieldsObject = {
      password: {
        type: 'textInput',
        secureTextEntry: true,
        placeholder: placeholderPassword,
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
        inputStyle: styles.inputStyle,
        validate: [isRequired],
        rightChildren: (
          <VerificationCodeTimer
            label="sendVerificationCode"
            onPress={(onSuccess) => {
              const callback = () => onSendVerificationCode(countryCode, phoneNumber, 60, onSuccess);
              promptKeyErrorBeforeEvent('phoneNumber', callback);
            }}
          />
        ),
      },
      repeatPassword: {
        type: 'textInput',
        secureTextEntry: true,
        placeholder: placeholderRepeatPassword,
        iconImage: passwordImage,
        itemSettings: {
          rounded: true,
        },
        itemstyle: styles.itemstyle,
        inputStyle: styles.inputStyle,
        iconStyle: styles.iconPasswordStyle,
        validate: [isRequired, isRepeatPasswordSame],
      },
    };
    const formFields = [
      pick(formFieldsObject, ...pickArray),
    ];

    return (
      <Form style={styles.form}>
        <Image source={logoImage} style={styles.logo} {...logoProps} />
        { hasPhoneNumber && <CompositeField {...this.props} /> }
        {formFields.map((formField) => (
          <Group
            fieldsObject={formField}
            key={formField}
            {...otherProps}
          />
        ))}
        { children }
        { this.renderButton(title, handleSubmit) }
      </Form>
    );
  }
}

LoginForm.defaultProps = {
  logoProps: {},
  title: 'login',
  pickArray: [],
  placeholderPassword: 'placeholderPassword',
  placeholderRepeatPassword: 'placeholderRepeatPassword',
  children: undefined,
  onSendVerificationCode: () => null,
  phoneNumber: null,
  countryCode: 1,
  hasPhoneNumber: true,
};

LoginForm.propTypes = {
  logoProps: PropTypes.object,
  title: PropTypes.string,
  pickArray: PropTypes.array,
  placeholderPassword: PropTypes.string,
  placeholderRepeatPassword: PropTypes.string,
  children: PropTypes.any,
  onSendVerificationCode: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  promptKeyErrorBeforeEvent: PropTypes.func.isRequired,
  phoneNumber: PropTypes.any,
  countryCode: PropTypes.any,
  hasPhoneNumber: PropTypes.bool,
};

const FormWithError = (props) => <ValidForm {...props} component={LoginForm} />;

const form = reduxForm({
  form: 'loginForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: false,
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
