/**
*
* ReservationReview
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OTHER_LINK } from 'utils/constants';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';

const ReviewTitle = styled.div`
  height: 55px;
  margin-bottom: 15px;
  background-color: #2bd89d;
  color: #fff;
  font-size: 20px;
  line-height: 55px;
  text-align: center;
`;
const ReviewContent = styled.div`
  border: 1px solid rgba(197,197,197,0.8);
`;
const H4 = styled.h4`
  color: #979797;
`;

class ReservationReview extends React.PureComponent {// eslint-disable-line react/prefer-stateless-function
  render() {
    const { values, totalDue } = this.props;

    const leasingInfo = {
      startDate: values.pickupDate,
      startTime: values.pickupTime,
      term: values.term,
    };

    const driverInfo = {
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      dob: values.birthday,
      dl: values.driverLicenseNum,
      type: values.driverLicenseType,
      state: values.driverLicenseState,
      country: values.driverLicenseCountry,
    };

    const insurance = {
      status: values.insurance !== '0' && values.insurance !== 0 ? 'Yes' : 'No',
      price: values.insurance,
    };

    return (
      <div className="col-xs-12 col-sm-12 col-lg-3 review-container">
        <ReviewTitle><TranslatedMessage messageId="reservationReview" tagName="span" messages={messages} /></ReviewTitle>
        <ReviewContent>
          <div style={{ padding: '20px 0 20px 20px', borderBottom: '1px solid rgba(197,197,197,0.8)' }}>
            <div style={{ marginBottom: '35px' }}>
              <h4><TranslatedMessage messageId="leasingTime" tagName="span" messages={messages} /></h4>
              <p>{leasingInfo.startDate}</p>
              <p>{leasingInfo.startTime}</p>
              <p>{leasingInfo.term} <TranslatedMessage messageId="months" tagName="span" messages={messages} /></p>
            </div>
            <div style={{ marginBottom: '35px' }}>
              <h4><TranslatedMessage messageId="driverInformation" tagName="span" messages={messages} /></h4>
              <p>{driverInfo.firstName} {driverInfo.lastName}</p>
              <p>{driverInfo.dob}</p>
              <p>{driverInfo.dl}</p>
              {driverInfo.type === 'United States' && driverInfo.state && <p>{driverInfo.state}, US</p>}
              {driverInfo.type !== 'United States' && driverInfo.country && <p>{driverInfo.country}</p>}
            </div>
            <div>
              <h4><TranslatedMessage messageId="insurance" tagName="span" messages={messages} /></h4>
              <p><TranslatedMessage messageId={insurance.status} tagName="span" messages={messages} /></p>
              <p>${insurance.price}<TranslatedMessage messageId="/Month" tagName="span" messages={messages} /></p>
            </div>
          </div>
          <div style={{ padding: '15px 30px 25px 25px' }}>
            <H4><TranslatedMessage messageId="offlinePayment" tagName="span" messages={messages} /></H4>
            <h3 style={{ marginBottom: '25px' }} >${totalDue}<TranslatedMessage messageId="/Month" tagName="span" messages={messages} /></h3>
            <p><TranslatedMessage messageId="payMentTips" tagName="span" messages={messages} />
              <a href={OTHER_LINK.privacyPolicy} target="_blank"><TranslatedMessage messageId="privacyPolicy" tagName="span" messages={messages} /></a>.
            </p>
          </div>
        </ReviewContent>
      </div>
    );
  }
}

ReservationReview.propTypes = {
  values: PropTypes.object,
  totalDue: PropTypes.string,
};

export default ReservationReview;
