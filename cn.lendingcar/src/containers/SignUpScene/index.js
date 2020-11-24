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
import { View, ImageBackground } from 'react-native';

import { openURLByLinking } from 'utils/helpers';

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

import LoginForm from 'forms/LoginForm';
import styles from 'forms/styles';

export class SignUpScene extends React.Component {
  onSendVerificationCode = (countryCode, phoneNumber, seconds, onSuccess) => {
    const { sendVerificationCode } = this.props;
    sendVerificationCode(false, countryCode, phoneNumber, seconds, onSuccess);
  }
  onSubmitVerificationCode = (formData) => {
    const {
      countryCode, phoneNumber, verificationCode, refId,
    } = formData.toJS();
    const { verifyVerificationCode } = this.props;
    const successCallback = () => {
      Actions.push('signUp', {
        step: 2,
        countryCode,
        phoneNumber,
        verificationCode,
        refId,
      });
    };
    verifyVerificationCode(countryCode, phoneNumber, verificationCode, successCallback);
  }
  onSubmitPassword = (formData) => {
    const password = formData.get('password');
    const {
      countryCode, phoneNumber, verificationCode, refId, signupUser,
    } = this.props;
    signupUser({
      countryCode,
      phoneNumber,
      verificationCode,
      password,
      refId,
    });
  }

  onPressServiceTerms = () => {
    openURLByLinking('https://help.lendingcar.com/beta/lendingcar-terms-and-conditions');
  }
  onPressPrivacyPolicy = () => {
    openURLByLinking('https://help.lendingcar.com/faq/lendingcar-privacy-policy');
  }
  linkToLogin() {
    Actions.reset('login');
  }

  renderLoginForm(step) {
    const allProps = [
      {
        title: 'next',
        onSendVerificationCode: this.onSendVerificationCode,
        onSubmit: this.onSubmitVerificationCode,
        bottomChildren: this.renderAccountTipView(step),
      },
      {
        title: 'signUp',
        pickArray: ['password', 'repeatPassword'],
        onSubmit: this.onSubmitPassword,
        middleChildren: <TranslateText label="passwordTip" style={[styles.tipText, styles.passwordTip]} numberOfLines={2} />,
        bottomChildren: this.renderAccountTipView(step),
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm formName="signUpForm" {...formProps} />
    );
  }
  renderAccountTipView = (step) => (
    <View style={styles.accountTipView}>
      { step > 1 && (
        <View style={styles.row}>
          <TranslateText label="inputPasswordTipLineOne" style={styles.tipText} />
          <TranslateText label="serviceTerms" style={[styles.tipText, styles.brand]} onPress={this.onPressServiceTerms} />
          <TranslateText label="and" style={styles.tipText} />
          <TranslateText label="privacyPolicy" style={[styles.tipText, styles.brand]} onPress={this.onPressPrivacyPolicy} />
        </View>
      )}
      <View style={[styles.row, styles.accountTipRow1]}>
        <TranslateText label="hasAccount" style={styles.tipText} />
        <TranslateText label="login" style={[styles.tipText, styles.brand]} onPress={this.linkToLogin} />
      </View>
    </View>
  )
  render() {
    const { step, isDone } = this.props;

    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerTitle="signUp"
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

SignUpScene.defaultProps = {
  step: 1,
  refId: null,
  phoneNumber: null,
  verificationCode: null,
  countryCode: 86,
};

SignUpScene.propTypes = {
  step: PropTypes.number,
  phoneNumber: PropTypes.string,
  verificationCode: PropTypes.string,
  refId: PropTypes.string,
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
  signupUser: (user) => dispatch(signupUserAction(user)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SignUpScene);
