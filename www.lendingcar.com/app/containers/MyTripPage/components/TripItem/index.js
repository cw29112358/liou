/**
*
* TripItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import moment from 'moment';
import { Row } from 'antd';

import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
import CarImage from 'components/CarImage';
import TranslatedMessage from 'components/TranslatedMessage';
import arrow from './arrow.png';
import './style.scss';

const getDateByTimestamp = (timeStamp) => {
  const date = moment(timeStamp);
  if (!date.isValid()) return '';

  return date.format('YYYY-MM-DD');
};

const makeGetWeekDayByDateString = (intl, messages) => (dateString) => {
  const date = moment(dateString);
  if (!date.isValid()) return '';

  let weekday = date.days();
  weekday = 'weekday'.concat(weekday);
  return intl.formatMessage(messages[weekday]);
};

function TripItem(props) {
  const { intl, trip, messages, onShow } = props;
  trip.feature = trip.vehicleFeature;
  const bookingState = messages[trip.bookingState];
  const getWeekDayByDateString = makeGetWeekDayByDateString(intl, messages);
  const className = [
    'booking-state',
    `booking-state-${trip.bookingState}`,
  ].join(' ');

  return (
    <li className="trip-info-box" onClick={() => onShow(trip)} >
      <dl>
        <dt className="booking-time">
          <span>{intl.formatMessage(messages.bookingTime)}</span>
          <span>{getDateByTimestamp(trip.createdTime)}&nbsp;&nbsp;</span>
          <span style={{ display: bookingState ? 'inline-block' : 'none' }} className={className} >
            {bookingState && intl.formatMessage(bookingState)}
          </span>
        </dt>
        <dd className="trip-detail">
          <div className="img">
            <CarImage isLazyLoad={false} url={trip.vehicleImage} />
          </div>
          <div className="detail">
            <p className="brand">
              <TranslatedMessage messages={messagesCarPage} messageId={trip.vehicleMake} tagName="span" />
              &nbsp;{trip.vehicleModel}
            </p>
            <p className="year">{trip.vehicleYear}</p>
          </div>
          <Row type="flex" justify="space-between" >
            <div className="trip-time trip-time-start">
              <p className="title">{intl.formatMessage(messages.tripStart)}</p>
              <p className="time">
                {trip.pickupDate}
                &nbsp;
                {getWeekDayByDateString(trip.pickupDate)}
              </p>
            </div>
            <div className="trip-arrow-right">
              <img src={arrow} alt="arrow" />
            </div>
            <div className="trip-time trip-time-end">
              <p className="title">{intl.formatMessage(messages.tripEnd)}</p>
              <p className="time">
                {trip.returnDate}
                &nbsp;
                {getWeekDayByDateString(trip.returnDate)}
              </p>
            </div>
          </Row>
        </dd>
      </dl>
    </li>
  );
}

TripItem.propTypes = {
  intl: intlShape.isRequired,
  messages: PropTypes.object,
  trip: PropTypes.shape({
    bookingTime: PropTypes.string,
    imgSrc: PropTypes.string,
    brand: PropTypes.string,
    year: PropTypes.number,
    tripStart: PropTypes.string,
    tripEnd: PropTypes.string,
    leaseAgain: PropTypes.bool,
  }),
  onShow: PropTypes.func,
};

export default TripItem;
