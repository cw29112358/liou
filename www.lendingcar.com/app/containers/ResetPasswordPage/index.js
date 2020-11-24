/*
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl, intlShape } from 'react-intl';
import { isNil } from 'lodash';
import queryString from 'query-string';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { formatMessage } from 'components/TranslatedMessage';
import Loader from 'components/Loader';
import ResetPasswordForm from 'forms/ResetPasswordForm';
import { resetPasswordAction, hideNotificationAction } from 'containers/App/actions';
import { selectIsShowNotification, selectIsDone, selectError, selectMsg } from 'containers/App/selectors';
import { isValidEmail } from 'utils/validators';
import messages from './messages';
import './style.scss';

export class ResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillUpdate(nextProps) {
    const { isShowNotification, isDone, error, msg, intl } = nextProps;
    if (isShowNotification && isDone) {
      const type = error ? 'error' : 'success';
      const title = intl.formatMessage(messages[type]);
      const key = window.alert(title, msg, type);
      nextProps.hideNotification();

      setTimeout(() => {
        if (type === 'success') {
          window.alert.close(key);
          this.props.linkTo('/login');
        }
      }, 2000);
    }
  }

  onSubmitChangePassword = (formData) => {
    const { intl } = this.props;
    const obj = formData.toJS();
    const parsed = queryString.parse(location.search);
    const confirmationCode = parsed.confirmationCode;
    const email = parsed.email;
    if (!isNil(confirmationCode)
        && !isNil(email)
        && !isValidEmail(email)) {
      this.props.onResetPassword(confirmationCode, email, obj.repeatNewPassword);
    } else {
      window.alert(intl.formatMessage(messages.error), intl.formatMessage(messages.resetPasswordLinkError), 'error');
    }
  }

  render() {
    const { intl, route, isDone } = this.props;
    const translatedTitle = formatMessage(intl, messages, route.name);
    return (
      <div className="reset-password-page container page-container page-center">
        <Helmet
          title={translatedTitle}
          meta={[
            { name: 'description', content: 'Description of ResetPasswordPage' },
          ]}
        />
        <ResetPasswordForm
          onSubmit={this.onSubmitChangePassword}
          intl={intl}
          isDone={isDone}
        />
        { !isDone && <Loader isLoadImg={false} /> }
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  intl: intlShape.isRequired,
  route: PropTypes.object,
  onResetPassword: PropTypes.func,
  linkTo: PropTypes.func,
  isShowNotification: PropTypes.bool,
  isDone: PropTypes.bool,
  error: PropTypes.any,
  msg: PropTypes.string,
};

const mapStateToProps = createPropsSelector({
  isShowNotification: selectIsShowNotification,
  isDone: selectIsDone,
  error: selectError,
  msg: selectMsg,
});

function mapDispatchToProps(dispatch) {
  return {
    onResetPassword: (confirmationCode, email, password) => dispatch(resetPasswordAction(confirmationCode, email, password)),
    linkTo: (url) => dispatch(push(url)),
    hideNotification: () => dispatch(hideNotificationAction()),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage));
