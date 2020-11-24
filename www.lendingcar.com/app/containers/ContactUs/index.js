/*
 *
 * ContactUs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
// import Form from './components/Form';
import { Row } from 'antd';
import { sendContactUsEmail } from 'apis/firebase';
import { reset } from 'redux-form/immutable';
import TranslatedMessage from 'components/TranslatedMessage';
import ContactForm from 'forms/ContactForm';
import messages from './messages';
import './style.scss';

export class ContactUs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    done: true,
  }

  submitContactUs = (formMap) => {
    const formObject = formMap.toJS();
    this.setState({ done: false });

    sendContactUsEmail(formObject)
    .then((data) => {
      this.setState({ done: true });
      if (data.error === false) {
        window.alert('Thank You', 'Your message has been sent, we are going to contact you shortly!', 'info');
      } else {
        window.alert('Error', 'Oops, something went wrong, please try again!', 'error');
      }
    })
    .catch((err) => {
      this.setState({ done: true });
      window.alert('Error', 'Oops, something went wrong, please try again!', 'error');
      console.log(err);
    });
    this.props.resetForm();
  }

  renderBody() {
    const style = !isMobile ? { height: '580px' } : { marginBottom: '-15px' };
    return (
      <div className="body-div">
        <Row justify="end" type="flex" className="body-div-background">
          <div className="reset-div contact-form" style={style}>
            <ContactForm
              {...this.props}
              loading={!this.state.done}
              onSubmit={this.submitContactUs}
            />
            {/* <div className="col-sm-12">
              <TranslatedMessage messages={messages} messageId="contactUsMessage" />
          </div>*/}
          </div>
        </Row>
      </div>
    );
  }

  renderTitle() {
    return (
      <h1 className="title">
        <TranslatedMessage messages={messages} messageId={`${this.props.route.name}`} />
      </h1>
    );
  }

  render() {
    // const { intl, route } = this.props;
    const singlePageStyle = location.pathname === '/contactUs' ? {} : { paddingTop: '0px' };
    return (
      <div className="about-us-container" style={singlePageStyle}>
        {/* <Helmet
          title={intl.formatMessage(messages[route.name])}
          meta={[
            { name: 'description', content: 'Login Page' },
          ]}
        /> */}
        <div className="login-div">
          {/* {this.renderTitle()} */}
          {/* <h3 className="h6-title" style={{ color: 'black' }}><TranslatedMessage messages={messages} messageId="contactUsPage" /></h3>*/}
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

ContactUs.propTypes = {
  // intl: intlShape.isRequired,
  route: PropTypes.object,
  // dispatch: PropTypes.func.isRequired,
  resetForm: PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    resetForm: () => dispatch(reset('ContactForm')),
  };
}

export default injectIntl(connect(null, mapDispatchToProps)(ContactUs));
