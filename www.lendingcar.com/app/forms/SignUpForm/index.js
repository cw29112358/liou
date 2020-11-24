/**
*
* SignUpForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import TranslatedMessage from 'components/TranslatedMessage';
import { isRequired, isValidEmail, isValidNameLen, isValidReferralCodeLen } from 'utils/validators';
import FormField from 'components/Form/BootstrapFormField';
// import FormField from 'components/Form/SemanticUIFormField';
import map from 'lodash/map';
import messages from './messages';

const getFormFieldsArray = (intl) => ([
  {
    label: 'EMAIL',
    name: 'email',
    type: 'email',
    placeholder: intl.formatMessage(messages.placeholderEmail),
    component: FormField,
    validate: [isRequired, isValidEmail],
  },
  {
    name: 'name',
    type: 'text',
    placeholder: intl.formatMessage(messages.placeholderName),
    component: FormField,
    validate: [isRequired, isValidNameLen],
  },
  {
    name: 'referralCode',
    type: 'text',
    placeholder: intl.formatMessage(messages.placeholderReferralCode),
    component: FormField,
    validate: [isValidReferralCodeLen],
  },
]);

function SignUpForm(props) {
  const { intl, handleSubmit, invalid, linkTo, redirectUrl } = props;
  const formFieldsArray = getFormFieldsArray(intl);
  const onClick = (properties) => {
    handleSubmit(properties);
    // TODO: @Yilin does not like this!!!
    if (typeof redirectUrl === 'string') {
      linkTo(redirectUrl);
    }
  };
  return (
    <form onSubmit={onClick} className="m-t" role="form">
      {
        map(formFieldsArray, (fieldObject, i) => <Field {...fieldObject} key={i} />)
      }
      <Button type="submit" bsStyle="primary" disabled={invalid} >
        <TranslatedMessage messages={messages} messageId="button" tagName="span" />
      </Button>
    </form>
  );
}

SignUpForm.propTypes = {
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  linkTo: PropTypes.func,
  redirectUrl: PropTypes.any,
};

export default injectIntl(reduxForm({
  form: 'SignUpForm',
  enableReinitialize: true,
})(SignUpForm));
