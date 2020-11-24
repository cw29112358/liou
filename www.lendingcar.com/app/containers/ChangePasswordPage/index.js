/*
 *
 * ChangePasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { isNil } from 'lodash';
import { createPropsSelector } from 'reselect-immutable-helpers';

import { changePasswordAction } from 'containers/App/actions';
import { selectIsDone, selectError } from 'containers/App/selectors';
import AccountLayout from 'components/AccountLayout';
import Loader from 'components/Loader';
import ChangePasswordForm from 'forms/ChangePasswordForm';
import messages from './messages';
import './style.scss';

export class ChangePasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.showNotification = false;
  }

  componentWillUpdate(nextProps) {
    const { intl, isDone, changeError } = nextProps;
    if (isDone && this.showNotification) {
      const isError = !isNil(changeError);
      const type = isError ? 'error' : 'success';
      const descriptionId = isError ? 'changePasswordFail' : 'changePasswordSuccess';
      window.alert(intl.formatMessage(messages[type]), intl.formatMessage(messages[descriptionId]), type);
      this.showNotification = false;
    }
  }

  onSubmit = (formMap) => {
    const obj = formMap.toJS();
    const { intl } = this.props;
    if (!isNil(obj.newPassword)
        && !isNil(obj.repeatNewPassword)
        && obj.newPassword === obj.repeatNewPassword) {
      this.props.changePassword(obj.oldPassword, obj.newPassword);
      this.showNotification = true;
    } else {
      window.alert(intl.formatMessage(messages.warning), intl.formatMessage(messages.passwordNotSame), 'warning');
    }
  }


  render() {
    return (
      <div className="change-password">
        <AccountLayout {...this.props} messages={messages}>
          <ChangePasswordForm
            onSubmit={this.onSubmit}
            intl={this.props.intl}
            isDone={this.props.isDone}
          />
        </AccountLayout>
        { !this.props.isDone && <Loader isLoadImg={false} /> }
      </div>
    );
  }
}

ChangePasswordPage.defaultProps = {
  menuKey: 'changePassword',
  helmetContent: 'Description of ChangePasswordPage',
};

ChangePasswordPage.propTypes = {
  intl: intlShape.isRequired,
  changePassword: PropTypes.func,
  isDone: PropTypes.bool,
};

const mapStateToProps = createPropsSelector({
  isDone: selectIsDone,
  changeError: selectError,
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (email, password) => dispatch(changePasswordAction(email, password)),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage));
