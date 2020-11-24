/**
*
* BookingContract
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Row } from 'antd';
import { isMobile } from 'react-device-detect';
import moment from 'moment';

// import { getFeature, printByDomId } from 'utils/helpers';
// import LogoImage from 'assets/logo.png';
import CarImage from 'components/CarImage';
import TranslatedMessage from 'components/TranslatedMessage';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
import messages from './messages';
import { defaultValue } from './constants';
// import arrow from './arrow.png';
import './style.scss';

function BookingContract(props) {
  const { titleId, isShow, iconType, buttonId, bookingData, onEdit } = props;
  // const featureArr = getFeature(bookingData, locale) || [];
  const pStyle = isMobile ? { } : { fontSize: '14px' };
  // const widthStyle = isMobile ? { width: '100%', marginTop: '10px' } : { width: '30%' };
  // const blockStyle = isMobile ? { display: 'block', marginBottom: '0px', paddingLeft: '8%' } : { marginBottom: '-10px', marginTop: '40px', paddingLeft: '3%' };
  return (
    <div id="booking-contract" className="ibox-content">
      {/* <div className="alert " style={{ textAlign: 'center' }}>
        <img src={imageLogo} alt="" className="logo-img" />
      </div> */}
      {/* <div className="print-header">
        <img className="logo" src={LogoImage} alt="" />
        <div className="car-info">
          <CarImage isLazyLoad={false} url={bookingData.vehicleImage} className="img-responsive car-img" />
          <div className="car-info-text">
            <div className="font-regular info-description">
              <TranslatedMessage messages={messagesCarPage} messageId={bookingData.vehicleMake} tagName="span" />
              &#32;{bookingData.vehicleModel}
              &#32;{bookingData.vehicleYear}
              &#32;<TranslatedMessage messages={messagesCarPage} messageId={bookingData.vehicleColor} tagName="span" /></div>
            <div className="font-medium booking-number">
              <TranslatedMessage messages={messages} messageId="bookingNumber" tagName="span" />
              #{bookingData.bookingId}
            </div>
          </div>
        </div>
      </div> */}

      <div className="contract-title-div">
        <div className="font-bold contract-title">
          <TranslatedMessage messages={messages} messageId={titleId} tagName="span" />
        </div>
      </div>

      <div className="alert contract-info-div">
        {/* {!isMobile && <div className="header no-print">
          <button onClick={onPrintClick}>
            <Icon type="printer" style={{ fontSize: 16 }} />&nbsp;<TranslatedMessage messages={messages} messageId="print" tagName="span" />
          </button>
        </div>}*/}
        <div className="header" style={{ display: isShow ? 'flex' : 'none' }}>
          <button onClick={onEdit}>
            <Icon type={iconType} style={{ fontSize: 16 }} />&nbsp;
            <TranslatedMessage messages={messages} messageId={buttonId} tagName="span" />
          </button>
        </div>
        <div className="alert info-head-div">
          {/* <p><TranslatedMessage messages={messages} messageId="congratulations" tagName="span" /></p>
          <p><TranslatedMessage messages={messages} messageId="reservationSuccess" tagName="span" /></p>
          <br></br>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <p style={{ fontSize: '18px', textAlign: 'left' }}><TranslatedMessage messages={messages} messageId="reservationSuccessDescription" tagName="span" /></p>
            </div>
          </div>
          <br></br>
          <p style={{ fontSize: '18px' }}><TranslatedMessage messages={messages} messageId="bookingNumber" tagName="span" />#bookingNumber</p> */}
          <CarImage isLazyLoad={false} url={bookingData.vehicleImage} className="img-responsive car-img" />
          {/* <p className="font-medium booking-number">
            <TranslatedMessage messages={messages} messageId="bookingNumber" tagName="span" />
            #{bookingData.bookingId}
          </p>*/}
        </div>

        {/* <div className="rental-info-block" style={blockStyle}>
          <div className="detail-info-rental" style={widthStyle}>
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="driverInformation" tagName="span" />:
            </p>
            <Row>
              <Col xs={10} sm={10} md={11} lg={12}>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="name" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="email" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="phoneNumber" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="birthday" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="diverLicenseNumber" tagName="span" />:</p>
                {bookingData.driverLicenseType === 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="driverLicenseState" tagName="span" />:</p>}
                {bookingData.driverLicenseType !== 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="country" tagName="span" />:</p>}
              </Col>
              <Col xs={14} sm={14} md={13} lg={12}>
                <p className="font-regular info-description" style={pStyle}>{bookingData.firstName}&#32;{bookingData.lastName}</p>
                <p className="font-regular info-description" style={pStyle}>{bookingData.email}</p>
                <p className="font-regular info-description" style={pStyle}>{bookingData.phoneNumber}</p>
                <p className="font-regular info-description" style={pStyle}>{moment(bookingData.birthday).format('L')}</p>
                <p className="font-regular info-description" style={pStyle}>{bookingData.driverLicenseNum}</p>
                {bookingData.driverLicenseType === 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description" style={pStyle}>{bookingData.driverLicenseState}&#32;</p>}
                {bookingData.driverLicenseType !== 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description" style={pStyle}>{bookingData.driverLicenseCountry}</p>}
              </Col>
            </Row>
          </div>

          <div className="detail-info-rental" style={widthStyle}>
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="leasingInformation" tagName="span" />:
            </p>
            <Row>
              <Col xs={14} sm={14} md={14} lg={12}>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="vehicle" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="year" tagName="span" />:</p> */}
        {/* <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="mileage" tagName="span" />:</p>*/}
        {/* <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="start" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="term" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="total" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="yourMonthlyPayment" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="deposit" tagName="span" />:</p>
              </Col>
              <Col xs={10} sm={10} md={10} lg={12}>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messagesCarPage} messageId={bookingData.vehicleMake} tagName="span" />
                  &nbsp;{bookingData.vehicleModel}</p>
                <p className="font-regular info-description" style={pStyle}>{bookingData.vehicleYear}</p> */}
        {/* <p className="font-regular info-description" style={pStyle}>{bookingData.vehicleMileage}&nbsp;<TranslatedMessage messages={messagesCarPage} messageId="miles" tagName="span" /></p>*/}
        {/* <p className="font-regular info-description" style={pStyle}>{moment(bookingData.pickupDate).format('L')}</p>
                <p className="font-regular info-description" style={pStyle}>&#32;{bookingData.term} <TranslatedMessage messages={messages} messageId="months" tagName="span" /></p>
                <p className="font-regular info-description" style={pStyle}>${ parseFloat(bookingData.totalDue).toFixed(2) }</p>
                <p className="font-regular info-description" style={pStyle}>${ parseFloat(bookingData.rate).toFixed(2) }</p>
                <p className="font-regular info-description" style={pStyle}>${ parseFloat(bookingData.deposit).toFixed(2) }</p>
              </Col>
            </Row>
          </div>
        </div> */}

        {/* <div className="rental-info-block" style={blockStyle}>
          <div className="detail-info-rental" style={widthStyle}>
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="includes" tagName="span" />:
            </p>
            <Row>
              <Col xs={10} sm={10} md={10} lg={12}>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="milesPerMonth" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="warranty" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="registration" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="insurance" tagName="span" />:</p>
              </Col>
              <Col xs={14} sm={14} md={14} lg={12}>
                <p className="font-regular info-description" style={pStyle}>1,500 <TranslatedMessage messages={messages} messageId="miles" tagName="span" /></p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="limitedMechanical" tagName="span" /></p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="included" tagName="span" /></p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="notIncluded" tagName="span" /></p>
              </Col>
            </Row>
          </div>

          <div className="detail-info-rental" style={widthStyle}>
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="pickupAndReturn" tagName="span" />:
            </p>
            <Row>
              <Col xs={10} sm={10} md={10} lg={12}>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="street" tagName="span" />:</p>
                <p className="font-regular info-description" style={pStyle}><TranslatedMessage messages={messages} messageId="city" tagName="span" />:</p>
              </Col>
              <Col xs={14} sm={14} md={14} lg={12}>
                <p className="font-regular info-description" style={pStyle}>{bookingData.pickupAddress1}</p>
                <p className="font-regular info-description" style={pStyle}>{bookingData.pickupCity},&#32;{bookingData.pickupState}&#32;{bookingData.pickupZip}</p>
              </Col>
            </Row>
          </div>
        </div> */}
        <Row justify="space-around" type="flex" className="row-contract">
          <div className="detail-info-rental">
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="driverInformation" tagName="span" />:
            </p>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="name" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.firstName}&#32;{bookingData.lastName}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="email" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.email}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="phoneNumber" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.phoneNumber}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="birthday" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{moment(bookingData.birthday).format('L')}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="diverLicenseNumber" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.driverLicenseNum}</p>
            </div>
            <div className="info-line">
              {bookingData.driverLicenseType === 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="driverLicenseState" tagName="span" />:</p>}
              {bookingData.driverLicenseType === 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description info-value" style={pStyle}>{bookingData.driverLicenseState}&#32;</p>}
            </div>
            <div className="info-line">
              {bookingData.driverLicenseType !== 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="country" tagName="span" />:</p>}
              {bookingData.driverLicenseType !== 'United States' && bookingData.driverLicenseState && <p className="font-regular info-description info-value" style={pStyle}>{bookingData.driverLicenseCountry}</p>}
            </div>
          </div>

          <div className="detail-info-rental">
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="leasingInformation" tagName="span" />:
            </p>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="vehicle" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}><TranslatedMessage messages={messagesCarPage} messageId={bookingData.vehicleMake} tagName="span" />
                &nbsp;{bookingData.vehicleModel}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="year" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.vehicleYear}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="start" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{moment(bookingData.pickupDate).format('L')}</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="term" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>&#32;{bookingData.term} <TranslatedMessage messages={messages} messageId="months" tagName="span" /></p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="total" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>${ parseFloat(bookingData.totalDue).toFixed(2) }</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="yourMonthlyPayment" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>${ parseFloat(bookingData.rate).toFixed(2) }</p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="deposit" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>${ parseFloat(bookingData.deposit).toFixed(2) }</p>
            </div>
          </div>
        </Row>

        <Row justify="space-around" type="flex" style={{ marginTop: '15px' }}>
          <div className="detail-info-rental">
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="includes" tagName="span" />:
            </p>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="warranty" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>1,500 <TranslatedMessage messages={messages} messageId="miles" tagName="span" /></p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="serviceCoverage" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}><TranslatedMessage messages={messages} messageId="limitedMechanical" tagName="span" /></p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="registration" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}><TranslatedMessage messages={messages} messageId="included" tagName="span" /></p>
            </div>
            <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="insurance" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}><TranslatedMessage messages={messages} messageId="notIncluded" tagName="span" /></p>
            </div>
          </div>
          <div className="detail-info-rental">
            <p className="font-bold detail-info-title font-title">
              <TranslatedMessage messages={messages} messageId="pickupAndReturn" tagName="span" />:
            </p>
            {bookingData.pickupMode !== 'delivery' && <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="street" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.pickupAddress1}</p>
            </div>}
            {bookingData.pickupMode !== 'delivery' && <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="city" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}>{bookingData.pickupCity}{bookingData.pickupState ? `, ${bookingData.pickupState}` : ''}{bookingData.pickupZip ? ` ${bookingData.pickupZip}` : ''}</p>
            </div>}
            {bookingData.pickupMode === 'delivery' && <div className="info-line">
              <p className="font-regular info-description info-key" style={pStyle}><TranslatedMessage messages={messages} messageId="method" tagName="span" />:</p>
              <p className="font-regular info-description info-value" style={pStyle}><TranslatedMessage messages={messages} messageId="delivery" tagName="span" /></p>
            </div>}
          </div>
        </Row>
      </div>
    </div>
  );
}

BookingContract.defaultProps = {
  titleId: 'bookingInformation',
  isShow: true,
  iconType: 'edit',
  buttonId: 'changeVehicle',
  bookingData: defaultValue,
  onEdit: () => null,
};

BookingContract.propTypes = {
  titleId: PropTypes.string,
  isShow: PropTypes.bool,
  iconType: PropTypes.string,
  buttonId: PropTypes.string,
  bookingData: PropTypes.object,
  onEdit: PropTypes.func,
  // locale: PropTypes.string,
};

export default BookingContract;
