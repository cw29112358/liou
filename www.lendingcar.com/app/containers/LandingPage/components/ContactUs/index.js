/*
 *
 * LandingPage
 *
 */

import React from 'react';
import { Row } from 'antd';
import { isMobile } from 'react-device-detect';
import ContactForm from 'forms/ContactForm';
// import TranslatedMessage from 'components/TranslatedMessage';
// import messages from 'containers/LandingPage/messages';

import './style.scss';

export class ContactUs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // submitContactUs = (formMap) => {
  //   const formObject = formMap.toJS();
  //   sendContactUsEmail(formObject)
  //   .then((data) => {
  //     if (data.error === false) {
  //       window.alert('Thank You', 'Your message has been sent, we are going to contact you shortly!', 'info');
  //     } else {
  //       window.alert('Error', 'Oops, something went wrong, please try again!', 'error');
  //     }
  //   })
  //   .catch((err) => {
  //     window.alert('Error', 'Oops, something went wrong, please try again!', 'error');
  //     console.log(err);
  //   });
  //   this.props.resetForm();
  // }

  renderBody() {
    const style = !isMobile ? { height: '580px' } : { marginBottom: '-15px' };
    return (
      <div className="body-div">
        <Row justify="end" type="flex" className="body-div-background">
          <div className="reset-div contact-form" style={style}>
            <ContactForm
              {...this.props}
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

  render() {
    return (
      <div className="about-us-container">
        <div className="login-div">
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default ContactUs;
