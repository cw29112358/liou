import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { Jumbotron } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import _ from 'lodash';

import TranslatedMessage from 'components/TranslatedMessage';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough, isRepeatNewPasswordSame } from 'utils/formValidators';
import messages from 'forms/messages';
import 'forms/style.scss';

const ResetPasswordForm = (props) => {
  const { handleSubmit, submitting, intl, isDone } = props;
  const renderFromField = () => {
    const formFieldsObject = {
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
      _.pick(formFieldsObject, 'newPassword'),
      _.pick(formFieldsObject, 'repeatNewPassword'),
    ];
    return (
      groups.map((group, i) =>
        <FormField.Group fieldsObject={group} key={i} messages={messages} intl={intl} />
    ));
  };
  return (
    <Jumbotron className="middle-box text-center loginscreen fadeInDown">
      <h2>
        <TranslatedMessage messages={messages} messageId="resetPassword" tagName="span" />
      </h2>
      <form onSubmit={handleSubmit} className="m-t" role="form" >
        { renderFromField() }
        <Button type="submit" bsStyle="primary" bsSize="lg" className=" block m-b auth-form auth-btn" disabled={submitting} loading={!isDone}>
          <TranslatedMessage messages={messages} messageId="resetPassword" />
        </Button>
      </form>
    </Jumbotron>
  );
};

ResetPasswordForm.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  isDone: PropTypes.bool,
};

const form = injectIntl(reduxForm({
  form: 'ResetPasswordForm',
})(ResetPasswordForm));

const selector = formValueSelector('ResetPasswordForm');

export default connect((state) => ({
  user: selector(state, 'email', 'password'),
}))(form);
