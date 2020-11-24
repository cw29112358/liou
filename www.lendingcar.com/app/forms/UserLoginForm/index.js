import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import Button from 'react-bootstrap-button-loader';
import _ from 'lodash';

import TranslatedMessage from 'components/TranslatedMessage';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired, isEmail, isPassword, isPasswordLongEnough, isPasswordShortEnough } from 'utils/formValidators';
import messages from 'forms/messages';
import 'forms/style.scss';

const LoginForm = (props) => {
  const { handleSubmit, submitting, intl, user, onSendVerification, showResend, isDone } = props;
  const sendVerification = () => {
    onSendVerification(user);
  };
  const renderFromField = () => {
    const formFieldsObject = {
      email: {
        type: 'email',
        placeholder: intl.formatMessage(messages.placeholderEmail),
        className: 'form-field',
        validate: [isRequired, isEmail],
      },
      password: {
        type: 'password',
        placeholder: intl.formatMessage(messages.placeholderPassword),
        className: 'form-field',
        validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
      },
    };
    const groups = [
      _.pick(formFieldsObject, 'email'),
      _.pick(formFieldsObject, 'password'),
    ];
    return (
      groups.map((group, i) =>
        <FormField.Group fieldsObject={group} key={i} messages={messages} intl={intl} />
    ));
  };
  const renderShowResend = () =>
    <div>
      <Button type="button" bsStyle="primary" bsSize="lg" loading={showResend && !isDone} onClick={sendVerification} >
        <TranslatedMessage messages={messages} messageId="sendVerificationEmail" />
      </Button>
    </div>;

  return (
    <form onSubmit={handleSubmit} className="m-t" role="form" style={{ height: '420px' }}>
      { renderFromField() }
      <Button type="submit" bsStyle="primary" bsSize="lg" disabled={submitting} loading={!showResend && !isDone} >
        <TranslatedMessage messages={messages} messageId="login" />
      </Button>
      { showResend && renderShowResend() }
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  intl: intlShape.isRequired,
  onSendVerification: PropTypes.func,
  user: PropTypes.object,
  showResend: PropTypes.bool,
  isDone: PropTypes.bool,
};

const form = injectIntl(reduxForm({
  form: 'LoginForm',
})(LoginForm));

const selector = formValueSelector('LoginForm');

export default connect((state) => ({
  user: selector(state, 'email', 'password'),
}))(form);
