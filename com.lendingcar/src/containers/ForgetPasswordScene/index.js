/**
 *
 * ForgetPasswordScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
} from 'native-base';

import {
  selectIsDone,
  selectAuthUserId,
} from 'containers/AppRouter/selectors';
import {
  sendVerificationCodeAction,
  loginByUserAction,
  resetPasswordAction,
} from 'containers/AppRouter/actions';

import { clearLoginAuthKey } from 'utils/helpers';

import AppHeader from 'components/AppHeader';
import Steps from 'components/Steps';
import Loader from 'components/Loader';

import PhoneVerificationForm from 'forms/PhoneVerificationForm';
import PasswordForm from 'forms/PasswordForm';

import styles from './styles';

export class ForgetPasswordScene extends React.Component {
  onHeaderBack = () => {
    const { authUserId } = this.props;
    if (!authUserId) clearLoginAuthKey();
    Actions.pop();
  }

  onSendVerificationCode = (countryCode, phoneNumber, seconds, onSuccess) => {
    const { sendVerificationCode } = this.props;
    sendVerificationCode(true, countryCode, phoneNumber, seconds, onSuccess);
  }
  onSubmitVerificationCode = (formData) => {
    const countryCode = formData.get('countryCode');
    const phoneNumber = formData.get('phoneNumber');
    const verificationCode = formData.get('verificationCode');
    const { onLogin } = this.props;

    const successCallback = () => {
      Actions.push('forgetPassword', {
        step: 2,
        countryCode,
      });
    };
    onLogin({ countryCode, phoneNumber, verificationCode }, false, successCallback);
  }
  onSubmitPassword = (formData) => {
    const password = formData.get('password');
    const { resetPassword } = this.props;
    resetPassword(password);
  }

  renderStepOne() {
    return (
      <PhoneVerificationForm
        title="resetPassword"
        onSendVerificationCode={this.onSendVerificationCode}
        onSubmit={this.onSubmitVerificationCode}
      />
    );
  }
  renderStepTwo() {
    return (
      <PasswordForm
        title="setThePassword"
        onSubmit={this.onSubmitPassword}
      />
    );
  }
  renderStepsChildren(step) {
    switch (step) {
      case 2:
        return this.renderStepTwo();
      default:
        return this.renderStepOne();
    }
  }
  render() {
    const { step, isDone } = this.props;

    return (
      <Container style={styles.container}>
        { !isDone && <Loader /> }
        <AppHeader leftPress={this.onHeaderBack} hasRight={false} />

        <Content
          contentContainerStyle={[styles.contentBox]}
          style={styles.content}
          scrollEnabled={false}
        >
          <Steps current={step} length={2} />
          { this.renderStepsChildren(step) }
        </Content>
      </Container>
    );
  }
}

ForgetPasswordScene.defaultProps = {
  step: 1,
  authUserId: undefined,
};

ForgetPasswordScene.propTypes = {
  step: PropTypes.number,
  isDone: PropTypes.bool.isRequired,
  authUserId: PropTypes.string,
  sendVerificationCode: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
  authUserId: selectAuthUserId,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerificationCode: (isAccountUser, countryCode, phoneNumber, seconds, onSuccess) => dispatch(sendVerificationCodeAction(isAccountUser, countryCode, phoneNumber, seconds, onSuccess)),
  onLogin: (user, isPassword, successCallback) => dispatch(loginByUserAction(user, isPassword, successCallback, true)),
  resetPassword: (newPassword) => dispatch(resetPasswordAction(newPassword)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ForgetPasswordScene);
