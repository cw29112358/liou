import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import _ from 'lodash';

import TranslatedMessage from 'components/TranslatedMessage';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough, isRepeatNewPasswordSame } from 'utils/formValidators';
import messages from 'forms/messages';
import 'forms/style.scss';

const ChangePasswordForm = (props) => {
  const { handleSubmit, submitting, intl, isDone } = props;
  const renderFromField = () => {
    const formFieldsObject = {
      oldPassword: {
        type: 'password',
        placeholder: intl.formatMessage(messages.placeholderOldPassword),
        className: 'form-field',
        validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
      },
      newPassword: {
        type: 'password',
        placeholder: intl.formatMessage(messages.placeholderNewPassword),
        className: 'form-field',
        validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough],
      },
      repeatNewPassword: {
        type: 'password',
        placeholder: intl.formatMessage(messages.placeholderRepeatNewPassword),
        className: 'form-field',
        validate: [isRepeatNewPasswordSame],
      },
    };
    const groups = [
      _.pick(formFieldsObject, 'oldPassword'),
      _.pick(formFieldsObject, 'newPassword'),
      _.pick(formFieldsObject, 'repeatNewPassword'),
    ];
    return (
      groups.map((group, i) =>
        <FormField.Group fieldsObject={group} key={i} messages={messages} intl={intl} />
    ));
  };
  return (
    <Jumbotron className="text-center">
      <form onSubmit={handleSubmit} className="m-t" role="form">
        { renderFromField() }
        <Button type="submit" bsStyle="primary" bsSize="lg" className=" block m-b auth-form auth-btn" loading={!isDone} disabled={submitting}>
          <TranslatedMessage messages={messages} messageId="changePassword" />
        </Button>
      </form>
    </Jumbotron>
  );
};

ChangePasswordForm.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  isDone: PropTypes.bool,
};

const form = injectIntl(reduxForm({
  form: 'ChangePasswordForm',
})(ChangePasswordForm));

const selector = formValueSelector('ChangePasswordForm');

export default connect((state) => ({
  user: selector(state, 'email', 'password'),
}))(form);
