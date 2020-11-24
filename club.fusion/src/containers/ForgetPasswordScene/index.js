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
  selectIsDone,
  selectAuthUserId,
} from 'containers/AppRouter/selectors';
import {
  sendVerificationCodeAction,
  loginByUserAction,
  resetPasswordAction,
} from 'containers/AppRouter/actions';

import { clearLoginAuthKey } from 'utils/helpers';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import LoginForm from 'forms/LoginForm';
import styles from 'forms/styles';

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
      });
    };
    onLogin({ countryCode, phoneNumber, verificationCode }, false, successCallback);
  }
  onSubmitPassword = (formData) => {
    const password = formData.get('password');
    const { resetPassword } = this.props;
    resetPassword(password);
  }

  renderLoginForm(step) {
    const allProps = [
      {
        title: 'resetPassword',
        pickArray: ['verificationCode'],
        onSendVerificationCode: this.onSendVerificationCode,
        onSubmit: this.onSubmitVerificationCode,
      },
      {
        title: 'setThePassword',
        pickArray: ['password', 'repeatPassword'],
        onSubmit: this.onSubmitPassword,
        children: <TranslateText label="passwordTip" style={styles.greyText} numberOfLines={2} />,
        hasPhoneNumber: false,
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm
        {...formProps}
      />
    );
  }
  render() {
    const { step, isDone } = this.props;

    return (
      <FullScreenScene
        headerProps={{
          headerSettings: {
            transparent: true,
          },
          leftPress: this.onHeaderBack,
        }}
        isLoading={!isDone}
        scrollEnabled={false}
      >
        { this.renderLoginForm(step) }
      </FullScreenScene>
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
