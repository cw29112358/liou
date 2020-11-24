/**
*
* SignupForm
*
*/
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import Button from 'react-bootstrap-button-loader';
import { isMobile } from 'react-device-detect';
import _ from 'lodash';
import TranslatedMessage from 'components/TranslatedMessage';
import * as FormField from 'components/Form/BootstrapFormField';
import { isRequired, isEmail, isPassword, isPasswordLongEnough, isPasswordShortEnough, isRepeatPasswordSame } from 'utils/formValidators';
import messages from 'forms/messages';
import { OTHER_LINK } from 'utils/constants';
import 'forms/style.scss';

function SignupForm(props) {
  const { handleSubmit, submitting, intl, isDone } = props;
  const renderFormField = () => {
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
      repeatPassword: {
        type: 'password',
        placeholder: intl.formatMessage(messages.placeholderRepeatPassword),
        className: 'form-field',
        validate: [isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough, isRepeatPasswordSame],
      },
    };
    const groups = [
      _.pick(formFieldsObject, 'email'),
      _.pick(formFieldsObject, 'password'),
      _.pick(formFieldsObject, 'repeatPassword'),
    ];
    return (
      groups.map((group, i) =>
        <FormField.Group fieldsObject={group} key={i} messages={messages} intl={intl} />
    ));
  };

  const renderCheckbox = ({ input, meta: { touched, error, dirty } }) => (
    <div className="render-checkbox">
      <label htmlFor="agree">
        <input {...input} type="checkbox" checked={input.value === true} />&nbsp;
        <div className="text-wrapper">
          <TranslatedMessage messages={messages} messageId="signupAgreeWords" />&nbsp;
          <a href={OTHER_LINK.terms} target="_blank" className="link-color"><TranslatedMessage messages={messages} messageId="termsOfService" /></a>&nbsp;
          <TranslatedMessage messages={messages} messageId="signupAgreeWords2" />&nbsp;
          <a href={OTHER_LINK.privacyPolicy} target="_blank" className="link-color"><TranslatedMessage messages={messages} messageId="privacyPolicy" /></a>
        </div>
      </label>
      {(dirty || touched) && error &&
      <div className="text-danger error">
        <TranslatedMessage messages={messages} messageId={error} tagName="span" />
      </div>}
    </div>);

  const heightStyle = isMobile ? {} : { height: '580px' };

  renderCheckbox.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
  };

  return (
    <form onSubmit={handleSubmit} className="m-t" role="form" style={heightStyle} >
      { renderFormField() }
      <br />
      <Field name="agree" component={renderCheckbox} validate={[isRequired]} />
      <Button type="submit" bsStyle="primary" bsSize="lg" disabled={submitting} loading={!isDone} >
        <TranslatedMessage messages={messages} messageId="signup" />
      </Button>
    </form>
  );
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  intl: intlShape.isRequired,
  isDone: PropTypes.bool,
};

export default injectIntl(reduxForm({
  form: 'SignupForm',
  // destroyOnUnmount: false,
  enableReinitialize: true,
})(SignupForm));
