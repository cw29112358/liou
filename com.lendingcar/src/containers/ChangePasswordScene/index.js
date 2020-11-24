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
  Container,
  Content,
} from 'native-base';

import {
  selectAuthUserInfo,
  selectIsDone,
} from 'containers/AppRouter/selectors';
import {
  loginByUserAction,
  changePasswordAction,
} from 'containers/AppRouter/actions';

import AppHeader from 'components/AppHeader';
import Steps from 'components/Steps';
import Feedback from 'components/Feedback';
import Loader from 'components/Loader';

import ChangePasswordCurrentForm from 'forms/ChangePasswordCurrentForm';
import ChangePasswordNewForm from 'forms/ChangePasswordNewForm';

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
    const newPassword = formData.get('newPassword');
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

  renderStepOne() {
    return (
      <ChangePasswordCurrentForm
        onSubmit={this.onSubmitCurrentPassword}
        linkToForgetPassword={this.linkToForgetPassword}
      />
    );
  }
  renderStepTwo() {
    return (
      <ChangePasswordNewForm
        onSubmit={this.onSubmitNewPassword}
      />
    );
  }
  renderStepThree() {
    const feedbackProps = {
      title: 'changeSuccess',
      textArray: [
        {
          label: 'changePasswordTip',
        },
      ],
      onSubmit: this.linkToLogin,
    };

    return (
      <Feedback {...feedbackProps} />
    );
  }
  renderStepsChildren(step) {
    switch (step) {
      case 2:
        return this.renderStepTwo();
      case 3:
        return this.renderStepThree();
      default:
        return this.renderStepOne();
    }
  }

  render() {
    const { step, isDone } = this.props;

    return (
      <Container style={styles.container}>
        { !isDone && <Loader /> }
        <AppHeader hasRight={false} hasLeft={step !== 3} hasShadow={false} />

        <Content
          contentContainerStyle={[styles.contentBox]}
          style={styles.content}
          scrollEnabled={false}
        >
          <Steps current={step} length={3} />
          { this.renderStepsChildren(step) }
        </Content>
      </Container>
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
