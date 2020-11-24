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
import { View, Image, ImageBackground } from 'react-native';

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

import LoginForm from 'forms/LoginForm';
import successImage from './assets/success.png';
import styles from './styles';

export class ChangePasswordScene extends React.Component {
  onSubmitCurrentPassword = (formData) => {
    const password = formData.get('password');
    const { authUser, onLogin } = this.props;
    const user = {
      countryCode: authUser.countryCode,
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
        middleChildren: <TranslateText label="forgetPassword" style={[styles.tipText, styles.passwordTip]} onPress={this.linkToForgetPassword} />,
        formStyle: { paddingTop: styles.form.paddingTop + styles.itemStyle.height + styles.itemStyle.marginBottom },
      },
      {
        title: 'next',
        pickArray: ['password', 'repeatPassword'],
        placeholderPassword: 'placeholderNewPassword',
        placeholderRepeatPassword: 'placeholderRepeatNewPassword',
        onSubmit: this.onSubmitNewPassword,
        middleChildren: <TranslateText label="passwordTip" style={[styles.tipText, styles.passwordTip]} numberOfLines={2} />,
      },
      {
        title: 'toLogin',
        pickArray: [],
        onSubmit: this.linkToLogin,
        formStyle: { paddingTop: 83 },
        middleChildren: (
          <View style={styles.successImageView}>
            <Image source={successImage} style={styles.successImage} />
            <TranslateText label="changeSuccess" style={styles.changeSuccess} numberOfLines={2} />
          </View>
        ),
        bottomChildren: <TranslateText label="changePasswordTip" style={[styles.tipText, styles.passwordTip, styles.changePasswordTip]} />,
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm formName="changePasswordForm" {...formProps} />
    );
  }

  render() {
    const { step, isDone } = this.props;

    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerTitle="changePassword"
          headerProps={{
            headerSettings: {
              transparent: true,
            },
            hasLeft: step < 3,
          }}
          isLoading={!isDone}
          scrollEnabled={false}
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          { this.renderLoginForm(step) }
        </FullScreenScene>
      </ImageBackground>
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
