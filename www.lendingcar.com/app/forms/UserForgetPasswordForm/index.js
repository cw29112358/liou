import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import _ from 'lodash';
import Button from 'react-bootstrap-button-loader';

import TranslatedMessage from 'components/TranslatedMessage';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired, isEmail } from 'utils/formValidators';
import messages from 'forms/messages';
import 'forms/style.scss';

function forgetPasswordForm(props) {
  const { handleSubmit, submitting, intl, isDone } = props;
  const renderFromField = () => {
    const formFieldsObject = {
      email: {
        type: 'email',
        placeholder: intl.formatMessage(messages.placeholderEmail),
        className: 'form-field',
        validate: [isRequired, isEmail],
      },
    };
    const groups = [
      _.pick(formFieldsObject, 'email'),
    ];
    return (
      groups.map((group, i) =>
        <FormField.Group fieldsObject={group} key={i} messages={messages} intl={intl} />
    ));
  };
  return (
    <form onSubmit={handleSubmit} className="m-t" role="form" style={{ height: '250px' }}>
      { renderFromField() }
      <Button type="submit" bsStyle="primary" bsSize="lg" disabled={submitting} loading={!isDone} >
        <TranslatedMessage messages={messages} messageId="resetPassword" />
      </Button>
    </form>
  );
}

forgetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  intl: intlShape.isRequired,
  isDone: PropTypes.bool,
};

export default injectIntl(reduxForm({
  form: 'ForgetPasswordForm',
  // destroyOnUnmount: false,
  enableReinitialize: true,
})(forgetPasswordForm));
