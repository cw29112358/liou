import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Jumbotron } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import _ from 'lodash';
import TranslatedMessage from 'components/TranslatedMessage';
// import * as FormField from 'components/Form/BootstrapFormField';
// import { isRequired, isPassword, isPasswordLongEnough, isPasswordShortEnough, isRepeatNewPasswordSame } from 'utils/formValidators';
import messages from 'forms/messages';
import 'forms/style.scss';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={_.startCase(placeholder)} className="form-control" type={type} />
    {touched && <span>{error}</span>}
  </div>
);

renderField.propTypes = {
  input: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

const ResendVerifyEmailForm = (props) => {
  const { handleSubmit, submitting, isDone, intl, error } = props;

  return (
    <Jumbotron className="middle-box text-center loginscreen fadeInDown">
      <h2>
        <TranslatedMessage messages={messages} messageId="sendVerificationEmailText" tagName="span" />
      </h2>
      <form onSubmit={handleSubmit} className="m-t" role="form" >
        <div className="form-group auth-form">
          <Field
            name="email"
            type="email"
            placeholder={intl.formatMessage(messages.email)}
            className="form-control"
            required component={renderField}
          />
        </div>

        {error && <strong>{error}</strong>}

        <Button type="submit" bsStyle="primary" bsSize="lg" className=" block m-b auth-form auth-btn" disabled={submitting} loading={!isDone}>
          <TranslatedMessage messages={messages} messageId="sendVerificationEmail" />
        </Button>
      </form>
    </Jumbotron>
  );
};

ResendVerifyEmailForm.propTypes = {
  intl: intlShape.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  isDone: PropTypes.bool,
};

const form = injectIntl(reduxForm({
  form: 'ResendVerifyEmailForm',
})(ResendVerifyEmailForm));

const selector = formValueSelector('ResendVerifyEmailForm');

export default connect((state) => ({
  user: selector(state, 'email'),
}))(form);
