/*
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Row } from 'antd';
import { injectIntl } from 'react-intl';
import { isMobile, isMobileOnly } from 'react-device-detect';
import classNames from 'classnames';

import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';
import { selectActiveAreas } from 'containers/App/selectors';
import { changeCalculatorAction } from 'containers/App/actions';
import Loader from 'components/Loader';
import { selectLocale } from 'containers/LanguageProvider/selectors';
import { selectMultiFilterCurrentPageInventory } from 'containers/InventoryPage/selectors';
// import TripConfigurationBar from 'components/TripConfigurationBar';
import TripConfigurationBarMonth from 'components/TripConfigurationBarMonth';
import ShowcaseCars from 'components/ShowcaseCars';
import ContactUs from 'containers/ContactUs';
// import ContactUs from './components/ContactUs';
import DisplayCard from './components/DisplayCard';
import CarCarousel from './components/CarCarousel';
import LandingFooter from './components/LandingFooter';
import CompareModal from './components/CompareModal';
import messages from './messages';
// import propagandaImg from './assets/propagandaImg.png';
// import sampleLease from './assets/sampleLease.png';
import sampleLease from './assets/RentSampleGraphic.png';
import sampleCar from './assets/sampleCar.png';
// import ourCars from './assets/ourcars.png';
// import howitworks from './assets/howitworks.jpg';
import customer1 from './assets/testimony1.jpg';
import customer2 from './assets/testimony2.jpg';
import customer3 from './assets/testimony3.jpg';
import * as selectors from './selectors';
import './style.scss';

export class LandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      handle: false,
    };
  }

  // componentDidMount() {
  //   const intercom = document.querySelector('#intercom-container');
  //   if (intercom) intercom.style.display = 'block';
  // }

  onTouchModal = () => {
    this.setState({ show: !this.state.show });
  }

  onClickViewCars = () => {
    this.props.linkTo('/inventory');
  }

  renderHelmet() {
    const translatedTitle = formatMessage(this.props.intl, messages, this.props.route.name);
    return (
      <Helmet
        title={translatedTitle}
        meta={[{ name: 'description', content: 'LendingCar' }]}
      />
    );
  }

  renderHeadliner(handle) {
    return (
      <div className="background-image" id="search">
        {!isMobileOnly ?
          <h1 className="h1-title font-black">
            {/* <TranslatedMessage messages={messages} messageId="title" /> */}
          </h1>
          :
          <h1 className="h1-title font-black" />
        }
        <h1 className="sub-title font-regular">
          <TranslatedMessage messages={messages} messageId="topTitle" />
        </h1>
        {!isMobileOnly ?
          <h2 className="h2-title font-regular" style={{ lineHeight: '10px' }}>
            <TranslatedMessage messages={messages} messageId="subTitle" />
          </h2>
          :
          <div className="col-sm-6 col-md-6" >
            <h2 className="h2-title font-regular">
              <TranslatedMessage messages={messages} messageId="subTitle0" />
            </h2>
            <h2 className="h2-title font-regular">
              <TranslatedMessage messages={messages} messageId="subTitle1" />
            </h2>
          </div>
        }
        {!isMobileOnly ?
          <TripConfigurationBarMonth {...this.props} intl={this.props.intl} landingPage submitText="go" handle={handle} />
          :
          <TripConfigurationBarMonth {...this.props} intl={this.props.intl} fromMobile submitText="go" handle={handle} />
        }
        <p className="head-note">
          <TranslatedMessage messages={messages} messageId="note" />
        </p>
        <br />
      </div>
    );
  }

  renderSectionA() {
    const sectionAStyle = isMobile ? { paddingBottom: '15px' } : { paddingBottom: '15px' };
    return (
      <div className="darker-background" style={sectionAStyle}>
        <Row className="sectionA" justify="space-between" type="flex" >
          <div className="sectionA-words">
            <h3 className="h3-section" style={{ marginBottom: '15px' }}>
              <TranslatedMessage messages={messages} messageId="reviewTitle" />
            </h3>
            <h5 className="h5-section">
              <p><TranslatedMessage messages={messages} messageId="reviewDscribe" /></p>
              <a role="button" className="link-section-text" onClick={this.onTouchModal} >
                <TranslatedMessage messages={messages} messageId="reviewNote" />&nbsp;&gt;
                   </a>
            </h5>
            {/* <p className="note-section">
                <a role="button" className="link-section-text" onClick={this.onTouchModal} >
                  <TranslatedMessage messages={messages} messageId="reviewNote" />&nbsp;&gt;
                </a>
              </p> */}
          </div>
          <div >
            <img alt="car" src={sampleLease} className="sectionA-img" width="100%" />
          </div>
        </Row>
      </div>
    );
  }

  renderSectionB() {
    const sectionBStyle = isMobile ? { paddingTop: '30px', paddingBottom: '1px' } : { paddingTop: '30px', paddingBottom: '1px' };
    const sectionBClassName = classNames({
      sectionB: true,
      'sectionB-mobile': isMobile,
    });
    return (
      <Row className={sectionBClassName} justify="center" type="flex" style={sectionBStyle}>
        <div>
          <img alt="car" src={sampleCar} className="sectionB-img" />
        </div>
        <div className="sectionB-words">
          <h3 className="h3-sectionB" style={{ marginBottom: '15px' }}>
            <TranslatedMessage messages={messages} messageId="sectionTitleA" />
          </h3>
          <p className="note-sectionB">
            <TranslatedMessage messages={messages} messageId="sectionNoteA" />&nbsp;&nbsp;
            {/* <TranslatedMessage messages={messages} messageId="sectionTitleB" /> */}
          </p>
          {!isMobile &&
          <div className="col-lg-12">
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <ul style={{ textAlign: 'left', paddingLeft: '0px' }}>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="springs" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="shocks/struts" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="tieRods" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="ballJoints" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="controlArms" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="swayBars" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="gauges" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="locks" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="wipers" />
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <ul style={{ textAlign: 'left', paddingLeft: '0px' }}>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="directionalLights" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="lights" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="windows" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="seatBelts" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="breaks" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="wheels" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="gauges" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="oilLevel" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="battery" />
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <ul style={{ textAlign: 'left', paddingLeft: '0px' }}>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="brakeFluid" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="washerFluid" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="coolant" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="powerSteeringFluid" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="leakTest" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="noPerforatedRust" />
                </li>
                <li className="li-sectionB">
                  <TranslatedMessage messages={messages} messageId="noFrameDamage" />
                </li>
              </ul>
            </div>
          </div>
        }

          <p className="note-section">
            <a role="button" className="link-section-text" onClick={this.onClickViewCars}>
              <TranslatedMessage messages={messages} messageId="viewCars" />&nbsp;&gt;
            </a>
          </p>
        </div>
      </Row>
    );
  }

  renderHowItWorks() {
    const spaceStyle = isMobile ? { paddingBottom: '10px', paddingTop: '28px' } : { paddingBottom: '10px', paddingTop: '28px' };
    return (
      <Row id="howItWorks" className="darker-background" justify="center" type="flex">
        <div className="how-it-works" style={spaceStyle}>
          {!isMobile ?
            <h6 className="h3-section" style={{ marginBottom: '20px', marginTop: '20px' }}>
              <TranslatedMessage messages={messages} messageId="howitWorksSection" />
            </h6>
          :
            <h6 className="h3-section" style={{ textAlign: 'center', marginBottom: '12px', marginTop: '15px' }}>
              <TranslatedMessage messages={messages} messageId="howitWorksSection" />
            </h6>
          }
          <div className="number-section">
            <div className="section-part">
              <div className="rightBorder">1</div>
              <div className="howItWorks-div">
                <h6 className="h6-section"><TranslatedMessage messages={messages} messageId="howitWorksTitle1" /></h6>
                <p className="howitWorkNotes"><TranslatedMessage messages={messages} messageId="howitworksParagraph1" /></p>
              </div>
            </div>
            <div className="section-part">
              <div className="rightBorder">2</div>
              <div className="howItWorks-div">
                <h6 className="h6-section"><TranslatedMessage messages={messages} messageId="howitWorksTitle2" /></h6>
                <p className="howitWorkNotes"><TranslatedMessage messages={messages} messageId="howitworksParagraph2" /></p>
              </div>
            </div>
            <div className="section-part">
              <div className="rightBorder">3</div>
              <div className="howItWorks-div">
                <h6 className="h6-section"><TranslatedMessage messages={messages} messageId="howitWorksTitle3" /></h6>
                <p className="howitWorkNotes"><TranslatedMessage messages={messages} messageId="howitworksParagraph3" /></p>
              </div>
            </div>
          </div>
          <div className="note-text" style={{ marginTop: 20 }}>
            {!isMobile ?
              <p className="note-section" style={{ textAlign: 'left' }}>
                <TranslatedMessage messages={messages} messageId="howItWorksMoto" />
                &nbsp;&nbsp;
                <a role="button" className="link-section-text" onClick={this.onClickViewCars} >
                  <TranslatedMessage messages={messages} messageId="learnMore" />&nbsp;&gt;
                </a>
              </p>
            :
              <p className="note-section" style={{ textAlign: 'left' }}>
                <TranslatedMessage messages={messages} messageId="howItWorksMoto" />
                &nbsp;&nbsp;
                <a role="button" className="link-section-text" onClick={this.onClickViewCars} >
                  <TranslatedMessage messages={messages} messageId="learnMore" />&nbsp;&gt;
                </a>
              </p>
          }
          </div>
        </div>
        {/* {!isMobile &&
          <div className="col-xs-12 col-sm-5 col-lg-5">
            <img alt="car" src={howitworks} className="howitWorks-img" />
          </div>
      } */}
      </Row>
    );
  }

  renderTestimonial() {
    const marginStyle = isMobile ? {} : { marginBottom: '-40px' };
    const paddingStyle = isMobile ? {} : { paddingLeft: '0px' };
    return (
      <Row className="testimonial-Section" justify="center" type="flex" style={{ paddingTop: '40px', paddingBottom: '0px' }}>
        <div className="testimonial-style" style={marginStyle}>
          <div className="col-xs-11 col-sm-11 col-lg-12">
            <h6 className="h3-section" style={{ marginBottom: '15px' }}>
              <TranslatedMessage messages={messages} messageId="ourCustomers" />
            </h6>
            <div className="testimonial-header">
              <div className="col-xs-11 col-sm-6 col-lg-4" style={paddingStyle}>
                <img alt="car" src={customer1} className="customer-img" />
              </div>
              <div className="col-xs-11 col-sm-6 col-lg-8">
                <p className="customer-note">
                  <TranslatedMessage messages={messages} messageId="customer1" />
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-11 col-sm-11 col-lg-12">
            <div className="testimonial-header">
              <div className="col-xs-11 col-sm-6 col-lg-4" style={paddingStyle}>
                <img alt="car" src={customer2} className="customer-img" />
              </div>
              <div className="col-xs-11 col-sm-6 col-lg-8">
                <p className="customer-note">
                  <TranslatedMessage messages={messages} messageId="customer2" />&nbsp;&nbsp;
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-11 col-sm-11 col-lg-12">
            <div className="testimonial-header">
              <div className="col-xs-11 col-sm-6 col-lg-4" style={paddingStyle}>
                <img alt="car" src={customer3} className="customer-img" />
              </div>
              <div className="col-xs-11 col-sm-6 col-lg-8">
                <p className="customer-note">
                  <TranslatedMessage messages={messages} messageId="customer3" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  }
  // renderSummary() {
  //   return (
  //     <Row justify="center" type="flex">
  //       <img alt="car" src={propagandaImg} className="summary-img" />
  //       <div className="text-div">
  //         <h3 className="h3">
  //           <TranslatedMessage messages={messages} messageId="reviewTitle" />
  //         </h3>
  //         <h5 className="h5">
  //           <TranslatedMessage messages={messages} messageId="reviewDscribe" />
  //         </h5>
  //         <p className="note">
  //           <TranslatedMessage messages={messages} messageId="reviewNote" />&nbsp;&nbsp;
  //           <a role="button" className="link-text" onClick={this.onTouchModal} >
  //             <TranslatedMessage messages={messages} messageId="reviewLink" />
  //           </a>
  //         </p>
  //       </div>
  //     </Row>
  //   );
  // }

  render3Benefits() {
    return (
      <div>
        {!isMobileOnly ?
          <h2 className="title" style={{ marginBottom: '5px', paddingTop: '45px' }}>
            <TranslatedMessage messages={messages} messageId="secondaryTitle" />
          </h2>
        :
          <div className="col-sm-6 col-md-6" >
            <h2 className="title">
              <TranslatedMessage messages={messages} messageId="secondaryTitle0" />
            </h2>
            <h2 style={{ fontSize: 24, fontWeight: 400 }}>
              <TranslatedMessage messages={messages} messageId="secondaryTitle1" />
            </h2>
          </div>
      }
        <DisplayCard />
        <a
          className="link rental-btn" onClick={() => {
            this.setState({ handle: !this.state.handle });
            this.props.linkTo('/inventory');
          }}
        >
          <TranslatedMessage messages={messages} messageId="rental" />
        </a>
      </div>
    );
  }

  renderBody() {
    return (
      <div className="card-div">
        {this.render3Benefits()}
        {/* {this.renderSummary()} */}
        {this.renderSectionA()}
        {this.renderSectionB()}
        {this.renderHowItWorks()}
        {this.renderTestimonial()}
      </div>
    );
  }

  renderCarousel() {
    const { inventory, cars, linkTo } = this.props;
    return (
      <div>
        <CarCarousel inventory={inventory.slice(0, 3)} cars={cars} linkTo={linkTo} />
      </div>
    );
  }

  renderShowcaseCars() {
    const { inventory, cars, linkTo } = this.props;
    return (
      <div className="darker-background">
        <ShowcaseCars inventory={inventory.slice(0, 3)} cars={cars} linkTo={linkTo} messages={messages} />
      </div>
    );
  }

  renderContactUs() {
    return (
      <div id="contactUs">
        <ContactUs />
      </div>
    );
  }
  renderFooter() {
    return (
      <div className="render-footer" style={{ paddingTop: '7px' }}>
        <LandingFooter isMobile={isMobile} locale={this.props.locale} />
      </div>
    );
  }

  render() {
    if (!this.props.cars) return <Loader />;
    return (
      <div className="landing">
        <div className="navbar-black"></div>
        <div className="div">
          {this.renderHelmet()}
          {this.renderHeadliner(this.state.handle)}
          {this.renderBody()}
          {this.renderShowcaseCars()}
          {this.renderContactUs()}
          {this.renderFooter()}
          <CompareModal show={this.state.show} onHide={this.onTouchModal} />
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  intl: PropTypes.object,
  route: PropTypes.object,
  cars: PropTypes.array,
  locale: PropTypes.string,
  linkTo: PropTypes.func,
  inventory: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

function mapDispatchToProps(dispatch) {
  return {
    changeCalculator: (calculator) => dispatch(changeCalculatorAction(calculator)),
    linkTo: (url) => dispatch(push(url)),
  };
}

const mapStateToProps = createPropsSelector({
  locale: selectLocale,
  locationsField: selectActiveAreas,
  cars: selectors.selectCars,
  searchContent: selectors.selectSearchBar,
  inventory: selectMultiFilterCurrentPageInventory,
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
