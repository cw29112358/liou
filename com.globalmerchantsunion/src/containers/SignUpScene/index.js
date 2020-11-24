/**
 *
 * SignUpScene Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import JMessage from 'jmessage-react-plugin';

import {
  selectIsDone,
} from 'containers/AppRouter/selectors';
import {
  sendVerificationCodeAction,
  verifyVerificationCodeAction,
  signupUserAction,
} from 'containers/AppRouter/actions';

import FullScreenScene from 'components/FullScreenScene';
import TranslateText from 'components/TranslateText';

import successImage from 'assets/success.png';
import LoginForm from 'forms/LoginForm';
import styles from 'forms/styles';

export class SignUpScene extends React.Component {
  onSendVerificationCode = (countryCode, phoneNumber, seconds, onSuccess) => {
    const { sendVerificationCode } = this.props;
    sendVerificationCode(false, countryCode, phoneNumber, seconds, onSuccess);
  }
  onSubmitVerificationCode = (formData) => {
    const { countryCode, phoneNumber, verificationCode } = formData.toJS();
    const { verifyVerificationCode } = this.props;
    const successCallback = () => {
      Actions.push('signUp', {
        step: 2,
        countryCode,
        phoneNumber,
        verificationCode,
      });
    };
    verifyVerificationCode(countryCode, phoneNumber, verificationCode, successCallback);
  }
  onSubmitPassword = (formData) => {
    const password = formData.get('password');
    const {
      countryCode,
      phoneNumber,
      verificationCode,
      signupUser,
    } = this.props;
    const onSuccessCallBack = (result) => {
      const { profile: { user, id } } = result;
      const registerInfo = {
        username: user,
        password: id,
      };
      JMessage.register(registerInfo, () => {
        console.log('注册成功');
      }, (err) => {
        console.log(err);
      });
    };
    const userInfo = {
      countryCode,
      phoneNumber,
      verificationCode,
      password,
    };
    signupUser(userInfo, onSuccessCallBack);
  }

  renderLoginForm(step) {
    const allProps = [
      {
        title: 'next',
        pickArray: ['verificationCode'],
        onSendVerificationCode: this.onSendVerificationCode,
        onSubmit: this.onSubmitVerificationCode,
      },
      {
        title: 'signUp',
        pickArray: ['password', 'repeatPassword'],
        onSubmit: this.onSubmitPassword,
        children: <TranslateText label="passwordTip" style={styles.greyText} numberOfLines={2} />,
        hasPhoneNumber: false,
      },
      {
        logoProps: {
          source: successImage,
          style: styles.successImage,
        },
        title: 'entryApp',
        pickArray: [],
        onSubmit: () => { Actions.reset('tabbar'); },
        children: <TranslateText label="signUpSuccess" style={styles.successText} />,
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

SignUpScene.defaultProps = {
  step: 1,
  phoneNumber: null,
  verificationCode: null,
  countryCode: 1,
};

SignUpScene.propTypes = {
  step: PropTypes.number,
  phoneNumber: PropTypes.string,
  verificationCode: PropTypes.string,
  isDone: PropTypes.bool.isRequired,
  sendVerificationCode: PropTypes.func.isRequired,
  verifyVerificationCode: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  countryCode: PropTypes.number,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
});

const mapDispatchToProps = (dispatch) => ({
  sendVerificationCode: (isAccountUser, countryCode, phoneNumber, seconds, onSuccess) => dispatch(sendVerificationCodeAction(isAccountUser, countryCode, phoneNumber, seconds, onSuccess)),
  verifyVerificationCode: (countryCode, phoneNumber, verificationCode, successCallback) => dispatch(verifyVerificationCodeAction(countryCode, phoneNumber, verificationCode, successCallback)),
  signupUser: (user, onSuccess) => dispatch(signupUserAction(user, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SignUpScene);
