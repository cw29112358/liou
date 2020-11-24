/**
*
* ReservationPrice
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import TranslatedMessage from 'components/TranslatedMessage';
import messages from './messages';

class MobileReservationPrice extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showPriceDetail = this.showPriceDetail.bind(this);
  }
  showPriceDetail() {
    const { show } = this.state;
    this.setState({ show: !show });
  }
  render() {
    const { values, selectedInsurance, selectedTotalDue } = this.props;
    const { show } = this.state;
    const rate = parseFloat(values.rate).toFixed(2);
    const insurance = parseFloat(selectedInsurance).toFixed(2);
    const totalDue = parseFloat(selectedTotalDue).toFixed(2);
    const deposit = parseFloat(values.deposit).toFixed(2);
    const term = values.term;

    return (
      <div className="col-xs-9">
        <h3 style={{ margin: '0', paddingTop: '8px', fontSize: '22px' }} onClick={this.showPriceDetail}>
          ${totalDue}/<TranslatedMessage messages={messages} messageId="month" tagName="span" /><i className="caret" style={{ fontSize: '10px', marginLeft: '3px' }}></i>
          <p style={{ fontSize: '10px', color: '#ddd', paddingLeft: '5px' }}><TranslatedMessage messages={messages} messageId="youPayAtTheCounter" tagName="span" /></p>
        </h3>
        {show &&
          <div>
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
        }
      </div>
    );
  }
}

MobileReservationPrice.propTypes = {
  values: PropTypes.object,
  selectedInsurance: PropTypes.string,
  selectedTotalDue: PropTypes.string,
};

export default MobileReservationPrice;
