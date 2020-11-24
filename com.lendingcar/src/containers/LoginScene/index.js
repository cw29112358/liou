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
import {
  Container,
  Content,
} from 'native-base';

import { setIsOnline } from 'utils/helpers';

import {
  selectIsDone,
} from 'containers/AppRouter/selectors';
import {
  sendVerificationCodeAction,
  loginByUserAction,
  saveNotificationTokenAction,
} from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';

import LoginForm from 'forms/LoginForm';

import styles from './styles';

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
      Actions.reset('home');
    };
    onLogin(formMap.toJS(), isPasswordLogin, successCallback);
  }

  onPasswordLogin = () => {
    this.setState({
      isPasswordLogin: true,
    });
  }
  onVerificationCodeLogin = () => {
    this.setState({
      isPasswordLogin: false,
    });
  }
  linkToForgetPassword() {
    Actions.push('forgetPassword');
  }

  render() {
    const { isDone } = this.props;
    const { isPasswordLogin } = this.state;

    return (
      <Container>
        {!isDone && <Loader />}
        <AppHeader
          hasTitle={false}
          hasRight={false}
          hiddenBorder
          hasShadow={false}
        />

        <Content
          contentContainerStyle={styles.contentBox}
          style={styles.content}
          scrollEnabled={false}
        >
          <LoginForm
            onSubmit={this.onSubmitLogin}
            isPasswordLogin={isPasswordLogin}
            linkToForgetPassword={this.linkToForgetPassword}
            onPasswordLogin={this.onPasswordLogin}
            onVerificationCodeLogin={this.onVerificationCodeLogin}
            onSendVerificationCode={this.onSendVerificationCode}
          />
        </Content>
      </Container>
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
