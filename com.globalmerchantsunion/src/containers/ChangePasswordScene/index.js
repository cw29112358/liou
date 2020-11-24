/**
 *
 * ChangePasswordScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import {
  selectAuthUserInfo,
  selectIsDone,
} from 'containers/AppRouter/selectors';
import {
  loginByUserAction,
  changePasswordAction,
} from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import successImage from 'assets/success.png';
import LoginForm from 'forms/LoginForm';
import styles from 'forms/styles';

export class ChangePasswordScene extends React.Component {
  onSubmitCurrentPassword = (formData) => {
    const password = formData.get('password');
    const { authUser, onLogin } = this.props;
    const user = {
      countryCode: authUser.phoneNumber && authUser.phoneNumber.length === 11 ? 86 : 1,
      phoneNumber: authUser.phoneNumber,
      password,
    };

    const successCallback = () => {
      Actions.push('changePassword', {
        step: 2,
        password,
      });
    };
    onLogin(user, true, successCallback);
  }
  onSubmitNewPassword = (formData) => {
    const newPassword = formData.get('repeatPassword');
    const { password, changePassword } = this.props;
    const successCallback = () => {
      Actions.reset('changePassword', {
        step: 3,
      });
    };
    changePassword(password, newPassword, successCallback);
  }
  linkToForgetPassword() {
    Actions.push('forgetPassword');
  }
  linkToLogin() {
    Actions.reset('login');
  }

  renderLoginForm(step) {
    const allProps = [
      {
        title: 'next',
        pickArray: ['password'],
        placeholderPassword: 'placeholderCurrentPassword',
        onSubmit: this.onSubmitCurrentPassword,
        children: <TranslateText label="forgetPassword" style={styles.greyText} onPress={this.linkToForgetPassword} />,
        hasPhoneNumber: false,
      },
      {
        title: 'confirmModify',
        pickArray: ['password', 'repeatPassword'],
        placeholderPassword: 'placeholderNewPassword',
        placeholderRepeatPassword: 'placeholderRepeatNewPassword',
        onSubmit: this.onSubmitNewPassword,
        children: <TranslateText label="passwordTip" style={styles.greyText} numberOfLines={2} />,
        hasPhoneNumber: false,
      },
      {
        logoProps: {
          source: successImage,
          style: styles.successImage,
        },
        title: 'toLogin',
        pickArray: [],
        onSubmit: () => { Actions.reset('login'); },
        children: <TranslateText label="changePasswordTip" style={styles.successText} />,
        hasPhoneNumber: false,
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm {...formProps} />
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
          hasLeft: step < 3,
        }}
        isLoading={!isDone}
        scrollEnabled={false}
      >
        { this.renderLoginForm(step) }
      </FullScreenScene>
    );
  }
}

ChangePasswordScene.defaultProps = {
  step: 1,
  password: '',
};

ChangePasswordScene.propTypes = {
  step: PropTypes.number,
  password: PropTypes.string,
  authUser: PropTypes.object.isRequired,
  isDone: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  authUser: selectAuthUserInfo,
  isDone: selectIsDone,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (user, isPasswordLogin, successCallback) => dispatch(loginByUserAction(user, isPasswordLogin, successCallback, true)),
  changePassword: (oldPassword, newPassword, successCallback) => dispatch(changePasswordAction(oldPassword, newPassword, successCallback)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ChangePasswordScene);
