/**
*
* ContactForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { connect } from 'react-redux';
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { isMobile } from 'react-device-detect';
import pick from 'lodash/pick';
import { injectIntl, intlShape } from 'react-intl';
import * as FormField from 'components/Form/BootstrapFormField';

import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import './style.scss';

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  formFieldsObject = {
    name: {
      type: 'text',
      hasLabel: false,
      className: 'col-sm-12',
      placeholder: this.props.intl.formatMessage(messages.placeholderYourName),
    },
    email: {
      type: 'text',
      hasLabel: false,
      className: 'col-sm-12',
      placeholder: this.props.intl.formatMessage(messages.placeholderYourEmail),
    },
    phone: {
      type: 'text',
      hasLabel: false,
      className: 'col-sm-12',
      placeholder: this.props.intl.formatMessage(messages.placeholderYourPhone),
    },
    message: {
      type: 'textArea',
      hasLabel: false,
      className: 'col-sm-12',
      placeholder: this.props.intl.formatMessage(messages.placeholderMessage),
    },
  };

  render() {
    const name = pick(this.formFieldsObject, 'name');
    const email = pick(this.formFieldsObject, 'email');
    const phone = pick(this.formFieldsObject, 'phone');
    const message = pick(this.formFieldsObject, 'message');
    const { intl, handleSubmit, loading, readyToSubmit, ...otherProps } = this.props;
    const titleClass = isMobile ? 'titleMobile' : 'titleWeb';
    return (
      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className={titleClass}><TranslatedMessage messages={messages} messageId="contactUs" tagName="span" /></div>
        <div className="row">
          <div className="col-sm-12">
            <FormField.Group className="col-sm-12" fieldsObject={name} {...otherProps} intl={intl} messages={messages} />
            <br />
            <FormField.Group className="col-sm-12" fieldsObject={email} {...otherProps} intl={intl} messages={messages} />
            <br />
            <FormField.Group className="col-sm-12" fieldsObject={phone} {...otherProps} intl={intl} messages={messages} />
            <br />
            <FormField.Group className="col-sm-12" fieldsObject={message} {...otherProps} intl={intl} messages={messages} />
            <br />
            <Button type="submit" className="bgColor" bsSize="lg" loading={loading} disabled={!readyToSubmit}>
              <TranslatedMessage messages={messages} messageId="send" tagName="span" />
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool,
  readyToSubmit: PropTypes.string,
};

const form = reduxForm({
  form: 'ContactForm',
  destroyOnUnmount: false,
  // dispatch(change('name', 'email', 'message')),
  // enableReinitialize: true, //Tips: to keep redux-form values from previous page, do not enable reinitialize
})(ContactForm);

const selector = formValueSelector('ContactForm');

export default injectIntl(connect((state) => ({
  // initialValues,
  readyToSubmit: selector(state, 'name') && selector(state, 'email') && selector(state, 'message'),
}))(form));
