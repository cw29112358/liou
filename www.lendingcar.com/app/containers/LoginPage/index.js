/*
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import Helmet from 'react-helmet';
import { isMobile } from 'react-device-detect';
import { Tabs, Row } from 'antd';
import { Button } from 'react-bootstrap';

import TranslatedMessage from 'components/TranslatedMessage';
import Loader from 'components/Loader';
import { loginByUserAction, signupUserAction, userSendVerificationAction, forgetPasswordAction, hideNotificationAction } from 'containers/App/actions';
import { selectShowResend, selectIsShowNotification, selectIsDone, selectError, selectMsg } from 'containers/App/selectors';
import LoginForm from 'forms/UserLoginForm';
import ForgetPasswordForm from 'forms/UserForgetPasswordForm';
import SignupForm from 'forms/UserSignUpForm';
import messages from './messages';
import './style.scss';

const TabPane = Tabs.TabPane;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.path = this.props.route.path;
    this.sendVerification = false;
  }

  componentWillUpdate(nextProps) {
    const { isShowNotification, isDone, error, msg, intl } = nextProps;
    if (isShowNotification && isDone) {
      const type = error ? 'error' : 'success';
      const title = intl.formatMessage(messages[type]);
      const key = window.alert(title, msg, type);
      nextProps.hideNotification();
      if (type === 'success' && this.path === '/login') {
        if (this.sendVerification) {
          this.sendVerification = false;
        } else {
          window.alert.close(key);
        }
      }
    }
  }

  onSendVerification = (user) => {
    this.sendVerification = true;
    this.props.onSendVerification(user);
  }

  switchToLogin = () => this.switchCurrentPage('/login');

  switchToSignup = () => this.switchCurrentPage('/signup');

  switchToForgetPassword = () => this.switchCurrentPage('/forgetPassword');

  switchCurrentPage = (path) => {
    this.props.linkTo(path);
  }

  renderTitle() {
    return (
      <h1 className="title">
        <TranslatedMessage messages={messages} messageId={`${this.props.route.name}Title`} />
      </h1>
    );
  }

  renderLoginTab = () =>
    <TabPane
      tab={<TranslatedMessage messages={messages} messageId="loginPage" />}
      key="/login"
    >
      <LoginForm
        onSubmit={this.props.onLogin} onSendVerification={this.onSendVerification}
        showResend={this.props.showResend} isDone={this.props.isDone}
      />
      <p className="prompt-text">
        <TranslatedMessage messages={messages} messageId="forgetPasswordNote" />&nbsp;&nbsp;
        <a role="button" onClick={this.switchToForgetPassword} className="link-color">
          <TranslatedMessage messages={messages} messageId="retrievePassword" />
        </a>
      </p>
    </TabPane>

  renderLogin = () =>
    <div className="reset-div">
      <p className="reset-label">
        <TranslatedMessage messages={messages} messageId="loginPageTitle" />
      </p>
      <LoginForm
        onSubmit={this.props.onLogin} onSendVerification={this.onSendVerification}
        showResend={this.props.showResend} isDone={this.props.isDone}
      />
      <p className="prompt-text">
        <TranslatedMessage messages={messages} messageId="forgetPasswordNote" />&nbsp;&nbsp;
        <a role="button" onClick={this.switchToForgetPassword} className="link-color">
          <TranslatedMessage messages={messages} messageId="retrievePassword" />
        </a>
      </p>
      <p>
        <TranslatedMessage messages={messages} messageId="askForSignUp" />
        <a type="button" onClick={() => this.props.linkTo('/signup')}>
          <TranslatedMessage messages={messages} messageId="signup" />
        </a>
      </p>
    </div>

  renderSignupTab = () =>
    <TabPane
      tab={<TranslatedMessage messages={messages} messageId="signupPage" />}
      key="/signup"
    >
      <SignupForm
        onSubmit={this.props.onSignUp} isDone={this.props.isDone}
      />
    </TabPane>

  renderSignup = () =>
    <div className="reset-div">
      <p className="reset-label">
        <TranslatedMessage messages={messages} messageId="signupPageTitle" />
      </p>
      <SignupForm
        onSubmit={this.props.onSignUp} isDone={this.props.isDone}
      />
      <p style={isMobile ? { } : { marginTop: '0px' }}>
        <TranslatedMessage messages={messages} messageId="askForLogin" />
        <Button type="submit" onClick={() => this.props.linkTo('/login')} >
          <TranslatedMessage messages={messages} messageId="login" />
        </Button>
      </p>
    </div>

  renderTabs() {
    return (
      <Tabs activeKey={this.path} onChange={this.switchCurrentPage}>
        {this.renderLoginTab()}
        {this.renderSignupTab()}
      </Tabs>
    );
  }

  renderForgetPassword() {
    return (
      <div className="reset-div">
        <p className="reset-label">
          <TranslatedMessage messages={messages} messageId="forgetPasswordSubTitle" />
        </p>
        <ForgetPasswordForm
          onSubmit={this.props.onForgetPassword}
          onBack={this.switchToLogin}
          isDone={this.props.isDone}
        />
        <p className="prompt-text">
          <TranslatedMessage messages={messages} messageId="forgetPasswordReturnNote" />&nbsp;&nbsp;
          <a role="button" onClick={this.switchToLogin} className="link-color">
            <TranslatedMessage messages={messages} messageId="back" />
          </a>
        </p>
      </div>
    );
  }

  renderBody() {
    return (
      <div className="body-div">
        <Row justify="end" type="flex" className="body-div-background">
          {/* { this.path !== '/forgetPassword'
            ? this.renderTabs()
            : this.renderForgetPassword() } */}
          {this.path === '/forgetPassword' && this.renderForgetPassword()}
          {this.path === '/login' && this.renderLogin()}
          {this.path === '/signup' && this.renderSignup()}
        </Row>
      </div>
    );
  }

  render() {
    const { intl, route, isDone } = this.props;
    return (
      <div className="login-page-lc">
        <Helmet
          title={intl.formatMessage(messages[route.name])}
          meta={[
            { name: 'description', content: 'Login Page' },
          ]}
        />
        <div className="login-div">
          { this.renderTitle() }
          { this.renderBody() }
          { !isDone && <Loader isLoadImg={false} />}
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  intl: intlShape.isRequired,
  linkTo: PropTypes.func,
  route: PropTypes.object,
  onLogin: PropTypes.func,
  onSignUp: PropTypes.func,
  onForgetPassword: PropTypes.func,
  onSendVerification: PropTypes.func,
  showResend: PropTypes.bool,
  isShowNotification: PropTypes.bool,
  isDone: PropTypes.bool,
  error: PropTypes.any,
  msg: PropTypes.string,
};

const mapStateToProps = createPropsSelector({
  showResend: selectShowResend,
  isShowNotification: selectIsShowNotification,
  isDone: selectIsDone,
  error: selectError,
  msg: selectMsg,
});

function mapDispatchToProps(dispatch) {
  return {
    linkTo: (url) => dispatch(push(url)),
    onLogin: (formData) => dispatch(loginByUserAction(formData.toJS())),
    onSignUp: (formData) => dispatch(signupUserAction(formData.toJS())),
    onForgetPassword: (formData) => dispatch(forgetPasswordAction(formData.toJS())),
    onSendVerification: (user) => dispatch(userSendVerificationAction(user)),
    hideNotification: () => dispatch(hideNotificationAction()),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
