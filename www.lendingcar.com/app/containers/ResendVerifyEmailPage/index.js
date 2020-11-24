/*
 *
 * ResendVerifyEmailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { injectIntl, intlShape } from 'react-intl';
import { isNil } from 'lodash';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { formatMessage } from 'components/TranslatedMessage';
import Loader from 'components/Loader';
import ResendVerifyEmailForm from 'forms/ResendVerifyEmailForm';
import { userSendVerificationAction, hideNotificationAction } from 'containers/App/actions';
import { selectIsShowNotification, selectIsDone, selectError, selectMsg } from 'containers/App/selectors';
import messages from './messages';
import './style.scss';

export class ResendVerifyEmailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

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

  onSubmit = (formData) => {
    const { intl } = this.props;
    const obj = formData.toJS();
    if (!isNil(obj.email)) {
      this.props.onSendRequest(obj);
    } else {
      window.alert(intl.formatMessage(messages.error), intl.formatMessage(messages.resetPasswordLinkError), 'error');
    }
  }

  render() {
    const { intl, route, isDone } = this.props;
    const translatedTitle = formatMessage(intl, messages, route.name);
    return (
      <div className="reset-password-page container page-containe page-center">
        <Helmet
          title={translatedTitle}
          meta={[
            { name: 'description', content: 'Description of ResendVerifyEmailPage' },
          ]}
        />
        <ResendVerifyEmailForm
          onSubmit={this.onSubmit}
          intl={intl}
          isDone={isDone}
          onSendRequest={this.props.onSendRequest}
        />
        { !isDone && <Loader isLoadImg={false} /> }
      </div>
    );
  }
}

ResendVerifyEmailPage.propTypes = {
  intl: intlShape.isRequired,
  route: PropTypes.object,
  onSendRequest: PropTypes.func,
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
    onSendRequest: (user) => dispatch(userSendVerificationAction(user)),
    linkTo: (url) => dispatch(push(url)),
    hideNotification: () => dispatch(hideNotificationAction()),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ResendVerifyEmailPage));
