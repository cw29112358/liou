/**
*
* BookingSuccessHeadLiner
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TranslatedMessage from 'components/TranslatedMessage';

import success from './success.png';
import messages from './messages';
import './style.scss';

function BookingSuccessHeadLiner() {
  return (
    <div className="head-liner">
      <img src={success} alt="" />
      <p className="congratulation font-bold">
        <TranslatedMessage messages={messages} messageId="congratulations" tagName="span" />&nbsp;&nbsp;
        <TranslatedMessage messages={messages} messageId="reservationSuccess" tagName="span" />
      </p>
      <br />
      <div className="row margin-b">
        <p className="reservation-success">
          <TranslatedMessage messages={messages} messageId="reservationSuccessTitle" tagName="span" />
        </p>
        <p className="reservation-success">
          <TranslatedMessage messages={messages} messageId="reservationSuccessDescription" tagName="span" />
        </p>
      </div>
      <br></br>
    </div>
  );
}

BookingSuccessHeadLiner.propTypes = {

};

export default BookingSuccessHeadLiner;
