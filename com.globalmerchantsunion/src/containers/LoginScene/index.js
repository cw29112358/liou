/**
 *
 * LoginScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { View } from 'native-base';

import { setIsOnline, loginJMessage } from 'utils/helpers';

import {
  selectIsDone,
} from 'containers/AppRouter/selectors';
import {
  sendVerificationCodeAction,
  loginByUserAction,
  saveNotificationTokenAction,
} from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import LoginForm from 'forms/LoginForm';
import styles from 'forms/styles';

export class LoginScene extends React.Component {
  state = {
    isPasswordLogin: true,
  }

  onSendVerificationCode = (countryCode, phoneNumber, seconds, onSuccess) => {
    const { sendVerificationCode } = this.props;
    sendVerificationCode(true, countryCode, phoneNumber, seconds, onSuccess);
  }
  onSubmitLogin = (formMap) => {
    const { onLogin, saveNotificationToken } = this.props;
    const { isPasswordLogin } = this.state;
    const successCallback = (authUserInfo) => {
      const { profile: { user, id } } = authUserInfo;
      const loginInfo = {
        username: user,
        password: id,
      };
      loginJMessage(loginInfo);
      setIsOnline();
      saveNotificationToken();
      Actions.reset('tabbar');
    };
    onLogin(formMap.toJS(), isPasswordLogin, successCallback);
  }

  onPasswordLogin = () => {
    this.setState({ isPasswordLogin: true });
  }
  onVerificationCodeLogin = () => {
    this.setState({ isPasswordLogin: false });
  }
  linkToForgetPassword() {
    Actions.push('forgetPassword');
  }

  /* render */

  renderPasswordText = () => (
    <View style={styles.rowLR}>
      <TranslateText label="forgetPassword" style={styles.greyText} onPress={this.linkToForgetPassword} />
      <TranslateText label="verificationCodeLogin" style={styles.greyText} onPress={this.onVerificationCodeLogin} />
    </View>
  );
  renderVerificationCodeText = () => (
    <View style={styles.rowR}>
      <TranslateText label="passwordLogin" style={styles.greyText} onPress={this.onPasswordLogin} />
    </View>
  );

  render() {
    const { isDone } = this.props;
    const { isPasswordLogin } = this.state;

    return (
      <FullScreenScene
        headerProps={{
          headerSettings: {
            transparent: true,
          },
        }}
        isLoading={!isDone}
        scrollEnabled={false}
      >
        <LoginForm
          onSubmit={this.onSubmitLogin}
          pickArray={['phoneNumber', isPasswordLogin ? 'password' : 'verificationCode']}
          linkToForgetPassword={this.linkToForgetPassword}
          onPasswordLogin={this.onPasswordLogin}
          onVerificationCodeLogin={this.onVerificationCodeLogin}
          onSendVerificationCode={this.onSendVerificationCode}
        >
          { isPasswordLogin ? this.renderPasswordText() : this.renderVerificationCodeText() }
        </LoginForm>
      </FullScreenScene>
    );
  }
}

LoginScene.defaultProps = {
};

LoginScene.propTypes = {
  isDone: PropTypes.bool.isRequired,
  sendVerificationCode: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  saveNotificationToken: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerificationCode: (isAccountUser, countryCode, phoneNumber, seconds, onSuccess) => dispatch(sendVerificationCodeAction(isAccountUser, countryCode, phoneNumber, seconds, onSuccess)),
  onLogin: (user, isPasswordLogin, successCallback) => dispatch(loginByUserAction(user, isPasswordLogin, successCallback)),
  saveNotificationToken: () => dispatch(saveNotificationTokenAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(LoginScene);
