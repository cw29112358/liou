/**
*
* ListItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import { Icon } from 'antd';
import { startCase, isNil, isNaN, toInteger, upperCase } from 'lodash';
import moment from 'moment';
// import classNames from 'classnames';
// import { FormattedMessage } from 'react-intl';

import { getDaysByStartDate } from 'utils/helpers';
import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';
import CarImage from 'components/CarImage';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';

import messages from './messages';
// import Placeholder from '../Placeholder';
import './style.scss';

function ListItem(props) {
  const { id, make, model, plan, year, size, images = [], linkTo, calculator, occupancy, index, availability, carClass, intl, mpgCity, mpgHighway, currentAreaConfig, leasePrice, leaseDeposit, askForPrice } = props;
  const { date, term } = calculator;
  const isLazyLoad = index > 4;
  const isAvailable = availability === 'available';
  const isAskForPrice = askForPrice === 'true';

  // const startDate = moment(date, moment.ISO_8601).add(1, 'days');
  const startDate = moment(date).add(1, 'days');
  const todayDate = moment();
  const meetBookingDateRequirement = startDate.diff(todayDate, 'days') > 14;
  const meetTermRequirement = Number(term) >= Number(currentAreaConfig.preOrderMinimumTerms);
  const isNeedPreOrder = !!props.needPreOrder;

  const gotoDetailPage = () => {
    linkTo(`/c/${id}`);
  };
  const renderCarClassLabel = () => {
    const carClassStyle = carClass ? { zIndex: 999 } : { display: 'none' };
    const labelClassShown = leasePrice && leaseDeposit ? <TranslatedMessage messages={messages} messageId="special" tagName="span" /> : <TranslatedMessage messages={messages} messageId={carClass} tagName="span" />;
    const labelShown = !isAskForPrice ? labelClassShown : <TranslatedMessage messages={messages} messageId="askPrice" tagName="span" />;
    return (
      <div className="carClass-label" style={carClassStyle}>
        <div className="carClass-font">
          {labelShown}
          {/* <TranslatedMessage messages={messages} messageId={carClass} tagName="span" /> */}
        </div>
      </div>
    );
  };

  const renderCarBaseInfoMobile = () => (
    <div className="left-car-base-info">
      <div>
        <CarImage isLazyLoad={isLazyLoad} url={images[0]} className="car-image img-responsive" />
        <h4 className="car-info-title" style={{ fontSize: '12px', marginTop: '20px' }}>
          <TranslatedMessage messages={messagesCarPage} messageId={make} tagName="span" /> {model}
        </h4>
      </div>
    </div>
    );
  const renderCarInfo = () => {
    const mpgCityValue = !isNil(mpgCity) && !isNaN(Number(mpgCity)) ? Number(mpgCity) : 0;
    const mpgHighwayValue = !isNil(mpgHighway) && !isNaN(Number(mpgHighway)) ? Number(mpgHighway) : 0;
    const mpgCount = toInteger(!!mpgCityValue) + toInteger(!!mpgHighwayValue);
    const mpgTotal = mpgCityValue + mpgHighwayValue;
    const mpg = (mpgCount !== 0) ? (mpgTotal / mpgCount) : 0;

    return (
      <div className="can-info-div">
        <h2 className="car-title-info">
          <TranslatedMessage messages={messagesCarPage} messageId={make} tagName="span" /> {model}
        </h2>
        <span className="car-detail-info"><Icon type="clock-circle-o" className="icon" />{year}</span>
        {!!occupancy && <span className="car-detail-info"><Icon type="user" className="icon" />{occupancy}</span>}
        {!!size && <span className="car-detail-info"><Icon type="car" className="icon" />{startCase(size)}</span>}
        {!!mpg && <span className="car-detail-info"><Icon type="filter" className="icon" />{mpg} mpg</span>}
        <p className="car-detail-info"></p>
        <a role="button" className="link-detail-text" onClick={gotoDetailPage} >
          <TranslatedMessage messages={messages} messageId="viewAllDetails" />
        </a>
        {isNeedPreOrder && !meetBookingDateRequirement && !meetTermRequirement &&
          <p className="note-text">
            <TranslatedMessage messages={messages} messageId="leasingRequiredStartDate" />
          </p>}
        {isNeedPreOrder && !meetBookingDateRequirement && !meetTermRequirement &&
          <p className="note-text">
            <TranslatedMessage messages={messages} messageId="leasingRequiredTermHead" />
            {Number(currentAreaConfig.preOrderMinimumTerms)}
            <TranslatedMessage messages={messages} messageId="leasingRequiredTermFoot" />
          </p>}
        {isNeedPreOrder && !meetBookingDateRequirement && meetTermRequirement &&
          <p className="note-text">
            <TranslatedMessage messages={messages} messageId="leasingRequiredStartDate" />
          </p>}
        {isNeedPreOrder && meetBookingDateRequirement && !meetTermRequirement &&
          <p className="note-text">
            <TranslatedMessage messages={messages} messageId="leasingRequiredTermHead" />
            {Number(currentAreaConfig.preOrderMinimumTerms)}
            <TranslatedMessage messages={messages} messageId="leasingRequiredTermFoot" />
          </p>}
      </div>
    );
  };
  const renderCarBaseInfo = () => (
    <div className="left-car-base-info">
      <CarImage height="240" width="320" isLazyLoad={isLazyLoad} url={images[0]} className="car-image img-responsive" />
      { renderCarInfo() }
    </div>
  );

  const renderLeaseTerm = () => {
    const leaseTermStyle = isMobileOnly ? { marginBottom: '0px', fontSize: '14px' } : {};
    return (
      <h4 className="car-lease-info" style={leaseTermStyle}>
        {term}
          &nbsp;
        <span className="monthLease">
          <TranslatedMessage messages={messages} messageId="monthLease" tagName="span" />
        </span>
      </h4>
    );
  };
  const renderPriceLine = () => {
    let unitPriceCmp;
    let totalPriceCmp;
    if (plan) {
      let rate;
      let totalDueWithoutTaxs;
      let messageId = 'unit';

      if (plan.unit === 'month') {
        rate = Math.round(plan.dailyRent * 30);
        messageId = 'monthlyPayment';
        totalDueWithoutTaxs = Math.round(rate * term);
      } else if (plan.unit === 'day') {
        rate = Math.round(plan.dailyRent);
        messageId = 'dailyPayment';
        const days = getDaysByStartDate(date, term);
        totalDueWithoutTaxs = Math.round(rate * days);
      }
      // const taxs = parseFloat(totalDueWithoutTaxs * 0.09).toFixed(2);
      // const totalDue = (Number(totalDueWithoutTaxs) + Number(taxs)).toFixed(2);
      const totalDue = totalDueWithoutTaxs;

      const unitPriceStyle = isMobileOnly ? { marginBottom: '0px', fontSize: '10px' } : {};

      totalPriceCmp = (
        <p className="font-bold price-text">
          {/* <TranslatedMessage messages={messages} messageId="totalReservation" tagName="span" />*/}
          {upperCase(formatMessage(intl, messages, 'totalReservation'))}
            :&nbsp;<span className="priceTag">{!isAskForPrice ? '$' : ''}{!isAskForPrice ? totalDue : 'Ask For Price'}</span>
        </p>);

      unitPriceCmp = (
        <p className="font-bold price-text" style={unitPriceStyle}>
          {/* <TranslatedMessage messages={messages} messageId={messageId} tagName="span" />*/}
          {upperCase(formatMessage(intl, messages, messageId))}
            :&nbsp;<span className="priceTag">{!isAskForPrice ? '$' : ''}{!isAskForPrice ? rate : 'Ask For Price'}</span>
          {/* </span> */}
        </p>);
    }

    const btnStyle = isMobileOnly ? { width: '100px' } : { width: '80%' };
    const pStyle = isMobileOnly ? { marginBottom: '3px', fontSize: '8px' } : {};

    const selectButtonName = isAvailable ? 'select' : 'leased';
    const classname = isAvailable ? 'btn-primary' : 'btn-default';

    return (
      <div className="price-line">
        {isMobileOnly &&
          <h6 className="car-info-class">
            {carClass &&
              <div className="carClass-font-mobile">
                <TranslatedMessage messages={messages} messageId={upperCase(carClass)} tagName="span" />  &nbsp;
                <TranslatedMessage messages={messages} messageId={upperCase('class')} tagName="span" />
              </div>
            }
          </h6>
        }
        {renderLeaseTerm()}
        {!isMobileOnly && totalPriceCmp}
        {unitPriceCmp}
        <p className="detail-taxAndFee" style={pStyle}></p>

        <Button className={classname} onClick={gotoDetailPage} style={btnStyle} disabled={!isAvailable}>
          <TranslatedMessage messages={messages} messageId={selectButtonName} tagName="span" />
        </Button>
        { !isMobileOnly && <ul className="car-detail-disclaimer">
          <li style={{ maxWidth: 250 }}><TranslatedMessage messages={messages} messageId="feature" tagName="span" /></li>
        </ul>}
      </div>
    );
  };

  const renderMobileWarning = () => {
    if (!isNeedPreOrder || (meetBookingDateRequirement && meetTermRequirement)) return null;

    if (!meetBookingDateRequirement && !meetTermRequirement) {
      return (<div>
        <p className="note-text-mobile">
          <TranslatedMessage messages={messages} messageId="leasingRequiredStartDate" />
        </p>
        <p className="note-text-mobile">
          <TranslatedMessage messages={messages} messageId="leasingRequiredTermHead" />
          {Number(currentAreaConfig.preOrderMinimumTerms)}
          <TranslatedMessage messages={messages} messageId="leasingRequiredTermFoot" />
        </p>
      </div>);
    }

    if (!meetBookingDateRequirement && meetTermRequirement) {
      return (<span className="note-text-mobile">
        <TranslatedMessage messages={messages} messageId="leasingRequiredStartDate" />
      </span>);
    }

    return (
      <span className="note-text-mobile">
        <TranslatedMessage messages={messages} messageId="leasingRequiredTermHead" />
        {Number(currentAreaConfig.preOrderMinimumTerms)}
        <TranslatedMessage messages={messages} messageId="leasingRequiredTermFoot" />
      </span>
    );
  };

  return (
    <div className="inventory-list-frame col-xs-12 col-md-12">
      <div className="inventory-list">
        {/* { renderLeaseLabel() } */}
        { !isMobileOnly && renderCarClassLabel() }
        { isMobileOnly ? renderCarBaseInfoMobile() : renderCarBaseInfo() }
        { renderPriceLine() }
      </div>
      {isMobileOnly && renderMobileWarning()}
    </div>
  );
}

ListItem.propTypes = {
  intl: PropTypes.object,
  id: PropTypes.string,
  make: PropTypes.string,
  model: PropTypes.string,
  // color: PropTypes.string,
  size: PropTypes.string,
  // feature: PropTypes.string,
  // featureZH: PropTypes.string,
  // plans: PropTypes.array,
  plan: PropTypes.object,
  occupancy: PropTypes.string,
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // locale: PropTypes.string,
  images: PropTypes.array,
  linkTo: PropTypes.func,
  availability: PropTypes.string,
  carClass: PropTypes.string,
  calculator: PropTypes.object,
  index: PropTypes.number,
  mpgCity: PropTypes.any,
  mpgHighway: PropTypes.any,
  needPreOrder: PropTypes.bool,
  currentAreaConfig: PropTypes.object,
  leasePrice: PropTypes.string,
  leaseDeposit: PropTypes.string,
  askForPrice: PropTypes.string,
};

export default ListItem;
