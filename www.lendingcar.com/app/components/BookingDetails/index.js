/**
*
* BookingDetails
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { Icon, Tooltip } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';
import arrow from './arrow.png';
import './style.scss';

function BookingDetails(props) {
  const { bookingData, isShowError, isShowTermError, currentAreaConfig, isAskForPrice } = props;
  const bookingFee = parseFloat(bookingData.bookingFee).toFixed(2);
  const rate = parseFloat(bookingData.rate).toFixed(2);
  const totalDue = parseFloat(bookingData.totalDue).toFixed(2);
  const deposit = parseFloat(bookingData.deposit).toFixed(2);
  const term = bookingData.term;
  const getRateMessageId = (unit) => {
    let rateMessageId = 'unit';

    if (unit === 'month') {
      rateMessageId = 'monthlyPayment';
    } else if (unit === 'day') {
      rateMessageId = 'dailyPayment';
    }
    return rateMessageId;
  };
  const rateMessageId = getRateMessageId(bookingData.unit);

  const renderRentalDate = () => {
    const pickDateClassName = classNames({
      'pull-left': true,
      'date-font': true,
      'date-error': isShowError,
    });
    let pickupInfo = '';
    let returnInfo = '';
    if (bookingData.pickupMode === 'delivery') {
      pickupInfo = <TranslatedMessage messages={messages} messageId="delivery" tagName="span" />;
      returnInfo = <TranslatedMessage messages={messages} messageId="deliveryBack" tagName="span" />;
    } else {
      pickupInfo = `${bookingData.pickupAddress1 ? bookingData.pickupAddress1 : ''}${bookingData.pickupAddress2 ? `, ${bookingData.pickupAddress2}` : ''}${bookingData.pickupCity ? `, ${bookingData.pickupCity}` : ''}${bookingData.pickupState ? `, ${bookingData.pickupState}` : ''}${bookingData.pickupZip ? `, ${bookingData.pickupZip}` : ''}`;
      returnInfo = `${bookingData.returnAddress1 ? bookingData.returnAddress1 : ''}${bookingData.returnAddress2 ? `, ${bookingData.returnAddress2}` : ''}${bookingData.returnCity ? `, ${bookingData.returnCity}` : ''}${bookingData.returnState ? `, ${bookingData.returnState}` : ''}${bookingData.returnZip ? `, ${bookingData.returnZip}` : ''}`;
    }
    return (
      <div className="pick-return-info">
        <div className="pick-return-area">
          <p className="area-pick-up">
            <TranslatedMessage messages={messages} messageId="pickUp" tagName="span" />:<br />
            {/* {bookingData.pickupAddress1}
            {bookingData.pickupAddress2 ? `, ${bookingData.pickupAddress2}` : ''}
            {bookingData.pickupCity ? `, ${bookingData.pickupCity}` : ''}
            {bookingData.pickupState ? `, ${bookingData.pickupState}` : ''}
            {bookingData.pickupZip ? `, ${bookingData.pickupZip}` : ''} */}
            {pickupInfo}
          </p>
          <p className="area-return">
            <TranslatedMessage messages={messages} messageId="return" tagName="span" />:<br />
            {/* {bookingData.returnAddress1}
            {bookingData.returnAddress2 ? `, ${bookingData.returnAddress2}` : ''}
            {bookingData.returnCity ? `, ${bookingData.returnCity}` : ''}
            {bookingData.returnState ? `, ${bookingData.returnState}` : ''}
            {bookingData.returnZip ? `, ${bookingData.returnZip}` : ''} */}
            {returnInfo}
          </p>
        </div>
        <div className="pick-return-date">
          <Icon type="calendar" className="icon" />
          <div className="date-line font-regular">
            <span className={pickDateClassName}>{moment(bookingData.pickupDate).format('L')}</span>
            <img src={arrow} alt="arrow-right" className="arrow-right" />
            <span className="pull-right date-font">{moment(bookingData.returnDate).format('L')}</span>
          </div>
        </div>
        {isShowError && <p className="date-prompt">
          <TranslatedMessage messages={messages} messageId="leasingRequiredStartDate" />
          <TranslatedMessage messages={messages} messageId="leaseError" tagName="span" />
        </p>}
      </div>);
  };

  const renderTooltipMonthlyPayment = () => (
    <p>
      <TranslatedMessage messages={messages} messageId="monthlyPaymentInfoHinder" tagName="span" />
    </p>);

  const renderTooltipDeposit = () => (
    <p>
      <TranslatedMessage messages={messages} messageId="depositInfoAhead" tagName="span" />
      &nbsp;<span className="deposit-price">{!isAskForPrice ? '$' : ''}{!isAskForPrice ? bookingFee : 'ASK-FOR-PRICE'}</span>&nbsp;
      <TranslatedMessage messages={messages} messageId="depositInfoHinder" tagName="span" />
    </p>);

  const renderTooltipDueNow = () => (
    <p>
      <TranslatedMessage messages={messages} messageId="dueNowHinder" tagName="span" />
    </p>);

  const renderTooltipFeature = () => (
    <p>
      <TranslatedMessage messages={messages} messageId="featureInfoHinder" tagName="span" />
    </p>);

  const termClassNames = classNames({
    'info-line': true,
    'font-regular': true,
    'margin-b': isShowTermError,
    'term-error': isShowTermError,
  });
  const toolTipTrigger = isMobile ? 'click' : 'hover';

  return (
    <div className="reservation-price booking-detail">
      <div className="booking-price-cmp">
        {renderRentalDate()}

        <div className="info-div-box">
          <div className="info-div">
            <p className={termClassNames}>
              <span className="pull-left">
                <TranslatedMessage messages={messages} messageId="term" tagName="span" />:
              </span>
              <span className="pull-right">
                {term}
              </span>
            </p>
            {isShowTermError && <p className="term-prompt">
              <TranslatedMessage messages={messages} messageId="leasingRequiredTermHead" />
              {Number(currentAreaConfig.preOrderMinimumTerms)}
              <TranslatedMessage messages={messages} messageId="leasingRequiredTermFoot" />
              <TranslatedMessage messages={messages} messageId="leaseError" tagName="span" />
            </p>}
          </div>

          <div className="info-div">
            <p className="info-line font-bold">
              <span className="pull-left">
                <TranslatedMessage messages={messages} messageId="total" tagName="span" />:
              </span>
              <span className="pull-right deposit-price">
                {!isAskForPrice ? '$' : ''}{!isAskForPrice ? totalDue : 'Ask For Price'}
              </span>
            </p>

            <p className="info-line font-bold">
              <span className="pull-left">
                <TranslatedMessage messages={messages} messageId={rateMessageId} tagName="span" />:&nbsp;
                <Tooltip
                  placement="bottomRight"
                  title={renderTooltipMonthlyPayment()}
                  trigger={toolTipTrigger}
                >
                  <Icon type="question-circle-o" className="margin-l-10" />
                </Tooltip>
              </span>
              <span className="pull-right deposit-price">
                {!isAskForPrice ? '$' : ''}{!isAskForPrice ? rate : 'Ask For Price'}
              </span>
            </p>

            <p className="info-line font-bold">
              <span className="pull-left">
                <TranslatedMessage messages={messages} messageId="deposit" tagName="span" />:&nbsp;
                <Tooltip
                  placement="bottomRight"
                  title={renderTooltipDeposit()}
                  trigger={toolTipTrigger}
                >
                  <Icon type="question-circle-o" className="margin-l-10" />
                </Tooltip>
              </span>
              <span className="pull-right deposit-price">
                {!isAskForPrice ? '$' : ''}{!isAskForPrice ? deposit : 'Ask For Price'}
              </span>
            </p>
          </div>

          <div className="info-div">
            <p className="info-line font-bold margin-adjust">
              <span className="pull-left dueNow-price">
                <TranslatedMessage messages={messages} messageId="dueNow" tagName="span" />:&nbsp;
                <Tooltip
                  placement="bottomRight"
                  title={renderTooltipDueNow()}
                  trigger={toolTipTrigger}
                >
                  <Icon type="question-circle-o" className="margin-l-10" />
                </Tooltip>
              </span>
              <span className="pull-right dueNow-price">
                {!isAskForPrice ? '$' : ''}{!isAskForPrice ? bookingFee : 'Ask For Price'}
              </span>
            </p>
          </div>

          <div className="info-div">
            <p className="info-line font-regular margin-minus">
              <TranslatedMessage messages={messages} messageId="feature" tagName="span" />
              <Tooltip
                placement="bottomRight"
                title={renderTooltipFeature()}
                trigger={toolTipTrigger}
              >
                <Icon type="question-circle-o" className="margin-l-10" />
              </Tooltip>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

BookingDetails.propTypes = {
  // intl: intlShape.isRequired,
  bookingData: PropTypes.object,
  isShowTermError: PropTypes.bool,
  isShowError: PropTypes.bool,
  currentAreaConfig: PropTypes.object,
  isAskForPrice: PropTypes.bool,
};

export default BookingDetails;
