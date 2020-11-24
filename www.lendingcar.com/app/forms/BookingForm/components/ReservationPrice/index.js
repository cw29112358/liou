/**
*
* ReservationPrice
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';

const DueTitle = styled.div`
      padding: 8px 20px;
      margin-bottom: -5px;
      background: #28d89d;
      border-radius: 3px;
   `;
const FormDiv = styled.div`
     border: 1px solid rgba(197,197,197,0.8);
   `;

class ReservationPrice extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { values, selectedInsurance, selectedTotalDue } = this.props;

    const rate = parseFloat(values.rate).toFixed(2);
    const insurance = parseFloat(selectedInsurance).toFixed(2);
    const totalDue = parseFloat(selectedTotalDue).toFixed(2);
    const deposit = parseFloat(values.deposit).toFixed(2);
    const term = values.term;

    return (
      <div className="col-lg-12">
        <DueTitle className="clearfix">
          <h3 className="pull-left" style={{ color: '#fff' }}><TranslatedMessage messages={messages} messageId="dueCounter" tagName="span" /></h3>
          <h3 className="pull-right">${totalDue}/<TranslatedMessage messages={messages} messageId="month" tagName="span" /></h3>
        </DueTitle>
        <FormDiv className="clearfix" style={{ padding: '20px', marginBottom: '100px', borderTopStyle: 'none' }}>
          <div className="pull-right">
            <p className="clearfix"><span className="pull-left text-left" style={{ marginRight: '10px' }}><TranslatedMessage messages={messages} messageId="term" tagName="span" /></span>
              <span className="pull-right text-right">{term} <TranslatedMessage messages={messages} messageId="months" tagName="span" /></span>
            </p>
            <p className="clearfix"><span className="pull-left text-left" style={{ marginRight: '10px' }}><TranslatedMessage messages={messages} messageId="rate" tagName="span" /></span>
              <span className="pull-right text-right">${rate}/<TranslatedMessage messages={messages} messageId="month" tagName="span" /></span>
            </p>
            <p className="clearfix"><span className="pull-left text-left" style={{ marginRight: '10px' }}><TranslatedMessage messages={messages} messageId="insurance" tagName="span" /></span>
              <span className="pull-right text-right">${insurance}/<TranslatedMessage messages={messages} messageId="month" tagName="span" /></span>
            </p>
            <p className="clearfix"><span className="pull-left text-left" style={{ marginRight: '10px' }}><TranslatedMessage messages={messages} messageId="deposit" tagName="span" /></span>
              <span className="pull-right text-right">${deposit}</span>
            </p>
          </div>
        </FormDiv>
      </div>
    );
  }
}

ReservationPrice.propTypes = {
  values: PropTypes.object,
  selectedInsurance: PropTypes.string,
  selectedTotalDue: PropTypes.string,
};

export default ReservationPrice;
