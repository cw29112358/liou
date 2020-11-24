/**
*
* ReservationDetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';

const DetailDiv = styled.div`
  borderBottom: 1px solid #c5c5c5;
  width: 100%;
  paddingTop: 20px;
  paddingLeft:10%;
`;
class ReservationDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { values } = this.props;

    const pickupLocation = {
      addr: values.pickupAddress1,
      city: values.pickupCity,
      state: values.pickupState,
      zip: values.pickupZip,
      hour: values.pickupHour,
    };

    const returnLocation = {
      addr: values.returnAddress1,
      city: values.returnCity,
      state: values.returnState,
      zip: values.returnZip,
      hour: values.returnHour,
    };

    return (
      <div>
        {isMobile ? <div>
          <div className="mobile-title-div">
            <TranslatedMessage messages={messages} messageId="leasingInfo" tagName="span" />
          </div>
          <div style={{ margin: '0 15px' }}>
            <div>
              <h6 style={{ display: 'inline-block' }}><TranslatedMessage messages={messages} messageId="pickupLocation" tagName="span" /> :</h6>
              <p style={{ fontSize: '12px' }}>{pickupLocation.addr}{pickupLocation.city}, {pickupLocation.state}{pickupLocation.zip}</p>
            </div>
            <div>
              <h6 style={{ display: 'inline-block' }}><TranslatedMessage messages={messages} messageId="returnLocation" tagName="span" /> :</h6>
              <p style={{ fontSize: '12px' }}>{returnLocation.addr}{returnLocation.city}, {returnLocation.state}{returnLocation.zip}</p>
            </div>
          </div>
        </div> : <div className="col-xs-12 col-sm-12 col-lg-4" style={{ marginBottom: '35px' }}>
          <div style={{ border: '1px solid rgba(197,197,197,0.8)' }} className="clearfix">
            <DetailDiv className="pull-right">
              <div style={{ marginBottom: '30px' }}>
                <h4><TranslatedMessage messages={messages} messageId="pickupLocation" tagName="span" /></h4>
                <p>{pickupLocation.addr}</p>
                <p>{pickupLocation.city}, {pickupLocation.state}</p>
                <p>{pickupLocation.zip}</p>
              </div>
              <div>
                <h4><TranslatedMessage messages={messages} messageId="hourOperation" tagName="span" /></h4>
                <p>{pickupLocation.hour}</p>
              </div>
            </DetailDiv>
            <div style={{ width: '100%', paddingTop: '20px', paddingLeft: '10%' }} className="pull-right">
              <div style={{ marginBottom: '30px' }}>
                <h4><TranslatedMessage messages={messages} messageId="returnLocation" tagName="span" /></h4>
                <p>{returnLocation.addr}</p>
                <p>{returnLocation.city}, {returnLocation.state}</p>
                <p>{returnLocation.zip}</p>
              </div>
              <div>
                <h4><TranslatedMessage messages={messages} messageId="hourOperation" tagName="span" /></h4>
                <p>{returnLocation.hour}</p>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

ReservationDetail.propTypes = {
  values: PropTypes.object,
};

export default ReservationDetail;
