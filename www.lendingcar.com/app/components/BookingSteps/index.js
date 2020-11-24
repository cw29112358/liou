/**
*
* BookingSteps
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TranslatedMessage from 'components/TranslatedMessage';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';

function BookingSteps({ page }) {
  return (
    <div className="booking-steps">
      {[1, 2, 3].map((index) => {
        let className = page === index ? 'step step-active' : 'step';
        className = page > index ? 'step step-sleep' : className;
        return (
          <div key={index} className={className}>
            <div className="tail"></div>
            <div className="head"></div>
            <div className="body">
              <TranslatedMessage messages={messages} messageId={`step${index}`} tagName="span" />
            </div>
          </div>
        );
      }
        )}
    </div>
  );
}

BookingSteps.propTypes = {
  page: PropTypes.number,
};

export default BookingSteps;
