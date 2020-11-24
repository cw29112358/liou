/**
*
* BookingPayInformation
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { Icon } from 'antd';
import { isMobile } from 'react-device-detect';

// import { getFeature, printByDomId } from 'utils/helpers';
import TranslatedMessage from 'components/TranslatedMessage';
// import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
// import LogoImage from 'assets/logo.png';

import messages from './messages';
import { defaultValue } from './constants';
// import arrow from './arrow.png';
import './style.scss';

// const onPrintClick = () => printByDomId('booking-contract');

function BookingPayInformation(props) {
  const { bookingData = defaultValue } = props;
  // const { rate, totalDue, deposit, bookingFee } = bookingData;
  const { bookingFee } = bookingData;
  const translatedDueNow = isMobile ? <TranslatedMessage messages={messages} messageId="mobileDueNow" tagName="span" /> : <TranslatedMessage messages={messages} messageId="dueNow" tagName="span" />;
  // const translatedTotal = isMobile ? <TranslatedMessage messages={messages} messageId="mobileTotal" tagName="span" /> : <TranslatedMessage messages={messages} messageId="total" tagName="span" />;

  return (
    <div id="booking-contract" className="ibox-content">
      {/* <div className="alert " style={{ textAlign: 'center' }}>
        <img src={imageLogo} alt="" className="logo-img" />
      </div> */}

      <div className="contract-title-div">
        <div className="font-bold contract-title">
          <TranslatedMessage messages={messages} messageId="bookingPayInformation" tagName="span" />
        </div>
      </div>
      <div className="alert contract-info-div">

        {/* <div className="alert info-head-div no-print" style={{ marginBottom: '30px' }}>
          <div className="info-div">
            <div className="info-line font-regular fontSize">
              <span className="pull-left">
                <div style={{ fontWeight: 'bold', textAlign: 'left' }}>{translatedTotal}:</div>
              </span>
              <span className="pull-right">${ parseFloat(totalDue).toFixed(2) } </span>
            </div>
          </div>
        </div>

        <div className="alert info-head-div no-print" style={{ marginBottom: '30px' }}>
          <div className="info-div">
            <div className="info-line font-regular fontSize">
              <span className="pull-left">
                <div style={{ fontWeight: 'bold', textAlign: 'left' }}><TranslatedMessage messages={messages} messageId="yourMonthlyPayment" tagName="span" />:</div>
              </span>
              <span className="pull-right">${ parseFloat(rate).toFixed(2) } </span>
            </div>
          </div>
        </div>

        <div className="alert info-head-div no-print" style={{ marginBottom: '30px' }}>
          <div className="info-div">
            <div className="info-line font-regular fontSize">
              <span className="pull-left">
                <div style={{ fontWeight: 'bold', textAlign: 'left' }}><TranslatedMessage messages={messages} messageId="deposit" tagName="span" />:</div>
              </span>
              <span className="pull-right">${ parseFloat(deposit).toFixed(2) } </span>
            </div>
          </div>
        </div> */}

        {/* <div className="alert info-head-div no-print" style={{ marginBottom: '30px' }}> */}
        <div className="font-regular fontWithColor fontSize font-display" style={{ marginBottom: '1px' }}>
          <p style={{ fontWeight: 'bold' }}>{translatedDueNow}:</p>
          <p>${ parseFloat(bookingFee).toFixed(2) } </p>
        </div>
        <div className="" style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '-15px' }}>
          <TranslatedMessage messages={messages} messageId="bookingPayStatement" tagName="span" />
        </div>
        {/* </div> */}

      </div>
    </div>
  );
}

BookingPayInformation.propTypes = {
  bookingData: PropTypes.object,
};

export default BookingPayInformation;
