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
import {
  Container,
  Content,
} from 'native-base';

import {
  selectIsDone,
} from 'containers/AppRouter/selectors';
import {
  sendVerificationCodeAction,
  verifyVerificationCodeAction,
  signupUserAction,
} from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import Steps from 'components/Steps';
import Loader from 'components/Loader';

import PhoneVerificationForm from 'forms/PhoneVerificationForm';
import PasswordForm from 'forms/PasswordForm';

import styles from './styles';

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
      phoneNumber, verificationCode, refId, signupUser, countryCode,
    } = this.props;
    signupUser({
      countryCode,
      phoneNumber,
      verificationCode,
      password,
      refId,
    });
  }

  renderStepOne() {
    return (
      <PhoneVerificationForm
        title="signUp"
        onSendVerificationCode={this.onSendVerificationCode}
        onSubmit={this.onSubmitVerificationCode}
      />
    );
  }
  renderStepTwo() {
    return (
      <PasswordForm
        title="password"
        onSubmit={this.onSubmitPassword}
        hasTerms
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
        <AppHeader hasRight={false} />

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

SignUpScene.defaultProps = {
  step: 1,
  refId: null,
  phoneNumber: null,
  countryCode: null,
  verificationCode: null,
};

SignUpScene.propTypes = {
  step: PropTypes.number,
  countryCode: PropTypes.number,
  phoneNumber: PropTypes.string,
  verificationCode: PropTypes.string,
  refId: PropTypes.string,
  isDone: PropTypes.bool.isRequired,
  sendVerificationCode: PropTypes.func.isRequired,
  verifyVerificationCode: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
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
