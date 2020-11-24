import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Row, Icon } from 'antd';
// import { Document, Page } from 'react-pdf';
import { SOCIAL_LINK, CONTACT_INFO, OTHER_LINK, FAQ_LINK } from 'utils/constants';
// import { lowerCase, pick, split } from 'lodash';

import TranslatedMessage from 'components/TranslatedMessage';
// import TranslatedMessage from 'components/TranslatedMessage';
// import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
// import messages from 'containers/InventoryPage/components/GridFilter/messages';

import messages from './messages';
import './style.scss';

class BookingConfirmation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    // this.state = {
    //   numPages: null,
    //   pageNumber: 1,
    // };
  }

  componentDidMount() {
    scrollTo(0, 0);
  }

  // onDocumentLoad = ({ numPages }) => {
  //   this.setState({ numPages });
  // };

  goBack() {
    window.history.go(-1);
  }

  // viewLeaseAgreement() {
  //   const { pageNumber, numPages } = this.state;
  //   return (
  //     <div>
  //       <Document
  //         onLoadSuccess={this.onDocumentLoad}
  //       >
  //         <Page pageNumber={pageNumber} />
  //       </Document>
  //       <p>Page {pageNumber} of {numPages}</p>
  //     </div>
  //   );
  // }

  renderSocialLinks() {
    const mobileContactStyle = isMobile ? { fontSize: '10px' } : {};
    return (
      <Row className="section-confirmation" justify="center" type="flex">
        <div className="col-xs-12 col-sm-10 col-sm-offset-1">
          <ul className="list-inline">
            <li>
              <a href={SOCIAL_LINK.twtiter} target="_blank"><Icon className="social-icons" type="twitter" /></a>
            </li>
            <li>
              <a href={SOCIAL_LINK.instagram} target="_blank"><Icon className="social-icons" type="instagram" /></a>
            </li>
            <li>
              <a href={SOCIAL_LINK.facebook} target="_blank"><Icon className="social-icons" type="facebook" /></a>
            </li>
            <li>
              <a href={SOCIAL_LINK.youtube} target="_blank"><Icon className="social-icons" type="youtube" /></a>
            </li>
          </ul>
          <p className="social-note" style={mobileContactStyle}>T: +1 {CONTACT_INFO.phone}</p>
          <p className="social-note" style={mobileContactStyle}>{CONTACT_INFO.email}</p>
        </div>
      </Row>
    );
  }

  renderBody() {
    const { bookingData, goToLoginPage } = this.props;
    const { tempPassword } = bookingData;
    const mobileContactStyle = isMobile ? { fontSize: '10px' } : {};
    const mobileCongStyle = isMobile ? { fontSize: '24px' } : {};
    // const mailLink = `mailto:${CONTACT_INFO.email}`;
    const isLoggedIn = !!localStorage.accessToken;
    const isNewUser = !!tempPassword;
    const showViewBookingInfoStyle = isLoggedIn ? { } : {};// display: 'none'
    const locale = this.props.bookingData.locale;
    const faq = (locale === 'en') ? FAQ_LINK.en : FAQ_LINK.zh;
    const viewLoginReminder = isNewUser ?
        (<div>
          <div>
            <TranslatedMessage messages={messages} messageId="newUserReminder" />
            &nbsp;<a onClick={goToLoginPage}><TranslatedMessage messages={messages} messageId="clickHere" /></a>.
          </div>
          <div>
            <TranslatedMessage messages={messages} messageId="newUserReminderCont" /> {tempPassword}
          </div>
        </div>)
      : (<div>
        <TranslatedMessage messages={messages} messageId="oldUserReminder" />
        &nbsp;<a onClick={goToLoginPage}><TranslatedMessage messages={messages} messageId="clickHere" /></a>.
        </div>);
    return (
      <Row className="section-confirmation" justify="center" type="flex">
        <div className="confirmation-card-div">
          <Icon className="confirmation-check" type="check-circle" />
          <h3 className="confirmation-title" style={mobileCongStyle}>
            <TranslatedMessage messages={messages} messageId="congratulationTitle" />
          </h3>
          <h6 className="confirmation-title" >
            <TranslatedMessage messages={messages} messageId="bookingId" />
            &nbsp;{bookingData.bookingId}
          </h6>
          <h6 className="confirmation-title" style={{ paddingBottom: 30 }}>
            <TranslatedMessage messages={messages} messageId="congratulationSubTitle" />
          </h6>

          <div className="col-xs-12 col-sm-10 col-sm-offset-1">
            <div className="col-md-4 col-sm-6">
              <div className="card-container">
                <div className="card">
                  <div className="card-title">
                    <h6 className="card-h6">1</h6>
                  </div>
                  <div className="content">
                    <div className="main">
                      <h3 className="name">
                        <TranslatedMessage messages={messages} messageId="stepOneTitle" />
                      </h3>
                      <div className="note">
                        <div><TranslatedMessage messages={messages} messageId="stepOneContent1" /></div>
                        <div><TranslatedMessage messages={messages} messageId="stepOneContent2" /></div>
                      </div>
                    </div>
                    <div className="card-footer" >
                      <a href={OTHER_LINK.calendar} target="_blank"><p className="social-links">
                        <TranslatedMessage messages={messages} messageId="stepOneButton" />
                      </p></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="card-container">
                <div className="card">
                  <div className="card-title">
                    <h6 className="circle">2</h6>
                  </div>
                  <div className="content">
                    <div className="main">
                      <h3 className="name">
                        <TranslatedMessage messages={messages} messageId="stepTwoTitle" /></h3>
                      <div className="note">
                        <div><TranslatedMessage messages={messages} messageId="stepTwoContent1" /></div>
                        <div><TranslatedMessage messages={messages} messageId="stepTwoContent2" /></div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a href={OTHER_LINK.insurance} target="_blank"><p className="social-links">
                        <TranslatedMessage messages={messages} messageId="stepTwoButton" />
                      </p></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="card-container">
                <div className="card">
                  <div className="card-title">
                    <h6 className="card-h6">3</h6>
                  </div>
                  <div className="content">
                    <div className="main">
                      <h3 className="name">
                        <TranslatedMessage messages={messages} messageId="stepThreeTitle" /></h3>
                      <div className="note">
                        <div><TranslatedMessage messages={messages} messageId="stepThreeContent1" /></div>
                        <div><TranslatedMessage messages={messages} messageId="stepThreeContent2" /></div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a href={faq} target="_top"><p className="social-links">
                        <TranslatedMessage messages={messages} messageId="stepThreeButton" />
                      </p></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-10 col-sm-offset-1">
            <h6 className="login-reminder" style={showViewBookingInfoStyle}>{viewLoginReminder}</h6>
            <h4 className="agreement-section">
              <a
                role="button" className="lease-agreement-text"
                href={bookingData.leaseAgreementLink}
                target="_blank"
              >
                <TranslatedMessage messages={messages} messageId="viewLeaseAgreement" />
              </a>
            </h4>
            {/* {this.viewLeaseAgreement()} */}
            <p className="facebook-note">
              <TranslatedMessage messages={messages} messageId="likeUs" />
              <span>
                <a role="button" className="lease-agreement-text" href={SOCIAL_LINK.facebook} target="_blank">
                  <Icon className="fbIcon" type="like" />
                </a>
              </span>
            </p>
            <ul className="list-inline" style={{ marginTop: '10px' }}>
              <li>
                <a href={SOCIAL_LINK.twtiter} target="_blank"><Icon className="social-icons" type="twitter" /></a>
              </li>
              <li>
                <a href={SOCIAL_LINK.instagram} target="_blank"><Icon className="social-icons" type="instagram" /></a>
              </li>
              <li>
                <a href={SOCIAL_LINK.facebook} target="_blank"><Icon className="social-icons" type="facebook" /></a>
              </li>
              <li>
                <a href={SOCIAL_LINK.youtube} target="_blank"><Icon className="social-icons" type="youtube" /></a>
              </li>
            </ul>
            <p className="social-note" style={mobileContactStyle}>Tel: +1-{CONTACT_INFO.phone}</p>
            <p className="social-note" style={mobileContactStyle}>Email: {CONTACT_INFO.email}</p>
          </div>
        </div>
      </Row>
    );
  }

  // renderLeaseAgreement() {
  //   // const { bookingData } = this.props;
  //   return (
  //     <Row className="section-confirmation" justify="center" type="flex">
  //       <div className="col-xs-12 col-sm-10 col-sm-offset-1">
  //         <h4 className="agreement-section">
  //           <a
  //             role="button" className="lease-agreement-text"
  //             // href={bookingData.leaseAgreementLink}
  //             target="_blank"
  //           >
  //             <TranslatedMessage messages={messages} messageId="viewLeaseAgreement" />
  //           </a>
  //         </h4>
  //         {/* {this.viewLeaseAgreement()} */}
  //         <p className="facebook-note">
  //           <TranslatedMessage messages={messages} messageId="likeUs" />
  //           <span><a role="button" className="lease-agreement-text" onClick={this.openFbPage} >
  //             <Icon className="fbIcon" type="like" />
  //           </a></span>
  //         </p>
  //       </div>
  //     </Row>
  //   );
  // }

  render() {
    return (
      <div className="booking-confirmation-div">
        {this.renderBody()}
        {/* {this.renderSocialLinks()} */}
        {/* {this.renderLeaseAgreement()} */}
      </div>
    );
  }
}

BookingConfirmation.propTypes = {
  bookingData: PropTypes.object,
  goToLoginPage: PropTypes.func,
};

export default BookingConfirmation;
