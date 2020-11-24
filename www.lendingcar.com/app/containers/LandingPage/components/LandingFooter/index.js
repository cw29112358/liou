/*
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile, isAndroid } from 'react-device-detect';
import { Row, Icon } from 'antd';
import { Link } from 'react-router';
import TranslatedMessage from 'components/TranslatedMessage';
import { CONTACT_INFO, APP_LINK, FAQ_LINK } from 'utils/constants';
// import Loader from "components/Loader";

import messages from '../../messages';
import './style.scss';

// const style = { color: '#8F8F8F', marginRight: 20 };

export class LandingFooter extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderDownload() {
    return (
      <div className="div">
        <h3 className="title-color font-medium">
          <TranslatedMessage messages={messages} messageId="downLoadTitle" />
        </h3>
        <p className="link-text">
          <a className="link-color" href={APP_LINK.ios} target="blank">
            <TranslatedMessage messages={messages} messageId="downLoadIPhone" />
          </a>
        </p>
        <p className="link-text">
          <a className="link-color" href={APP_LINK.android} target="blank">
            <TranslatedMessage messages={messages} messageId="downLoadAndroid" />
          </a>
        </p>
      </div>
    );
  }

  renderLearn() {
    const { locale } = this.props;
    const faq = (locale === 'en') ? FAQ_LINK.en : FAQ_LINK.zh;
    return (
      <div className="div">
        <h3 className="title-color font-medium">
          <TranslatedMessage messages={messages} messageId="learnTitle" />
        </h3>
        {/* <p className="link-text">
          <Link className="link-color" to="/aboutUs">
            <TranslatedMessage messages={messages} messageId="learnAbout" />
          </Link>
        </p> */}
        <p className="link-text">
          <a className="link-color" href={faq} target="_blank">
            <TranslatedMessage messages={messages} messageId="learnFaq" />
          </a>
        </p>
        {/* <p className="link-text">
          <a className="link-color">
            <TranslatedMessage messages={messages} messageId="learnPolicies" />
          </a>
        </p> */}
      </div>
    );
  }

  renderContact() {
    const contactPhone = `tel:${CONTACT_INFO.phone}`;
    // const contactPhone2 = `tel:${CONTACT_INFO.phone2}`;
    return (
      <div className="div">
        <h3 className="title-color font-medium">
          <TranslatedMessage messages={messages} messageId="contactTitle" />
        </h3>
        {/* <p className="link-text font-regular">
          <Icon type="facebook" style={style} />
          <Icon type="twitter" style={style} />
          <Icon type="wechat" style={style} />
        </p> */}
        <p className="link-text">
          <a className="link-color" href={contactPhone}>
            <TranslatedMessage messages={messages} messageId="contactPhone" />: {CONTACT_INFO.phone}
          </a>
        </p>
        {/* <p className="link-text">
          <a className="link-color" href={contactPhone2}>
            <TranslatedMessage messages={messages} messageId="contactPhone" />: {CONTACT_INFO.phone2}
          </a>
        </p> */}
        <p className="link-text">
          <Link className="link-color" to="#contactUs">
            <TranslatedMessage messages={messages} messageId="contactEmail" />: {CONTACT_INFO.email}
          </Link>
        </p>
      </div>
    );
  }

  renderWeb() {
    return (
      <div className="footer-line">
        <Row type="flex" justify="space-between">
          {/* {this.renderDownload()}*/}
          {this.renderLearn()}
          {this.renderContact()}
        </Row>
      </div>
    );
  }

  renderMobile() {
    const { locale } = this.props;
    const faq = (locale === 'en') ? FAQ_LINK.en : FAQ_LINK.zh;
    const contactPhone = `tel:${CONTACT_INFO.phone}`;

    if (isAndroid) {
      return (
        <div className="mobile-footer">
          <Row type="flex" justify="space-between">
            {/* <a className="link-color" href={APP_LINK.android} target="blank">
              <Icon type="qrcode" style={{ fontSize: 24, marginBottom: 5 }} /><br />
              <TranslatedMessage messages={messages} messageId="mobileApp" />
            </a> */}
            <a className="link-color" href={contactPhone}>
              <Icon type="phone" style={{ fontSize: 24, marginBottom: 5 }} /><br />
              <TranslatedMessage messages={messages} messageId="phoneNumber" />
            </a>
            {/* <a className="link-color">
              <Icon type="mail" style={{ fontSize: 24, marginBottom: 5 }} /><br />
              <TranslatedMessage messages={messages} messageId="mobileEmail" />
              </a>*/}
            <Link className="link-color" to="/contactUs">
              <Icon type="mail" style={{ fontSize: 24, marginBottom: 5 }} /><br />
              <TranslatedMessage messages={messages} messageId="mobileEmail" />
            </Link>
            <a className="link-color" href={faq} target="_blank">
              <Icon type="message" style={{ fontSize: 24, marginBottom: 5 }} /><br />
              <TranslatedMessage messages={messages} messageId="mobileFAQ" />
            </a>
          </Row>
        </div>
      );
    }
    return (
      <div className="mobile-footer">
        <Row type="flex" justify="space-between">
          {/* <a className="link-color" href={APP_LINK.ios} target="blank">
            <Icon type="qrcode" style={{ fontSize: 24, marginBottom: 5 }} /><br />
            <TranslatedMessage messages={messages} messageId="mobileApp" />
          </a> */}
          <a className="link-color" href={contactPhone}>
            <Icon type="phone" style={{ fontSize: 24, marginBottom: 5 }} /><br />
            <TranslatedMessage messages={messages} messageId="phoneNumber" />
          </a>
          {/* <a className="link-color">
            <Icon type="mail" style={{ fontSize: 24, marginBottom: 5 }} /><br />
            <TranslatedMessage messages={messages} messageId="mobileEmail" />
            </a>*/}
          <Link className="link-color" to="/contactUs">
            <Icon type="mail" style={{ fontSize: 24, marginBottom: 5 }} /><br />
            <TranslatedMessage messages={messages} messageId="mobileEmail" />
          </Link>
          <a className="link-color" href={faq} >
            <Icon type="message" style={{ fontSize: 24, marginBottom: 5 }} /><br />
            <TranslatedMessage messages={messages} messageId="mobileFAQ" />
          </a>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div className="landing-footer">
        {isMobile ? this.renderMobile() : this.renderWeb()}
      </div>
    );
  }
}

LandingFooter.propTypes = {
  locale: PropTypes.string,
};

export default LandingFooter;
