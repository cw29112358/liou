/*
 *
 * MyDocumentsPage
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
import messages from './messages';
import './style.scss';
import UploadForm from './components/UploadForm';

export class MyDocumentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

  // renderRight = () => <iframe
  //   src="https://www.polydojo.com/@lendingcar/form?formId=5ad10f579483b80004fcb447"
  //   width="770" height="500" frameBorder="0" marginHeight="0" marginWidth="0"
  //   style={{ maxWidth: '100%' }}
  // >Loading...</iframe>
  renderRight = () => <UploadForm />;

  render() {
    return (
      <div className="change-password">
        <AccountLayout {...this.props} messages={messages} renderRight={this.renderRight} />
        { !this.props.isDone && <Loader isLoadImg={false} /> }
      </div>
    );
  }
}

MyDocumentsPage.defaultProps = {
  menuKey: 'myDocuments',
  helmetContent: 'Description of MyDocumentsPage',
};

MyDocumentsPage.propTypes = {
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MyDocumentsPage));
