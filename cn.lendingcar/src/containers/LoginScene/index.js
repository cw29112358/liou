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
import { ImageBackground } from 'react-native';
import auth from 'utils/auth';

import { setIsOnline } from 'utils/helpers';

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
    const successCallback = () => {
      setIsOnline();
      saveNotificationToken();
      auth.getLeaseType().then((key) => {
        if (!key) Actions.reset('leaseType');
        if (key === 'rent') Actions.reset('rent');
        if (key === 'lease') Actions.reset('home');
      });
      // Actions.reset('home');
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
      <TranslateText label="forgetPassword" rightChildren="?" style={styles.tipText} onPress={this.linkToForgetPassword} />
      <TranslateText label="verificationCodeLogin" style={styles.tipText} onPress={this.onVerificationCodeLogin} />
    </View>
  );
  renderVerificationCodeText = () => (
    <View style={styles.rowR}>
      <TranslateText label="passwordLogin" style={styles.tipText} onPress={this.onPasswordLogin} />
    </View>
  );
  renderAccountTipView = () => (
    <View style={[styles.accountTipView, styles.row]}>
      <TranslateText label="noAccount" style={styles.tipText} />
      <TranslateText label="signUp" style={[styles.tipText, styles.brand]} onPress={() => { Actions.push('signUp'); }} />
    </View>
  );

  render() {
    const { isDone } = this.props;
    const { isPasswordLogin } = this.state;

    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerTitle="login"
          headerProps={{
            headerSettings: {
              transparent: true,
            },
            hasLeft: false,
          }}
          isLoading={!isDone}
          scrollEnabled={false}
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          <LoginForm
            hasTakeLook
            pickArray={['phoneNumber', isPasswordLogin ? 'password' : 'verificationCode']}
            onSubmit={this.onSubmitLogin}
            onSendVerificationCode={this.onSendVerificationCode}
            middleChildren={isPasswordLogin ? this.renderPasswordText() : this.renderVerificationCodeText()}
            bottomChildren={this.renderAccountTipView()}
          />
        </FullScreenScene>
      </ImageBackground>
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
