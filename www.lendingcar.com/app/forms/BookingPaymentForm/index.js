/**
*
* BookingPaymentForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';
import { Button } from 'react-bootstrap';
import { isRequired, isValidCardNum, isValidCardExp, isValidNumber, isValidName, isValidZipCodeLen, isValidNameLen } from 'utils/validators';
import _ from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import * as FormField from 'components/Form/BootstrapFormField';
import TranslatedMessage from 'components/TranslatedMessage';
import { COUNTRY_OPTIONS } from 'utils/constants';
import messages from './messages';
import './style.scss';

class BookingPaymentForm extends React.Component {// eslint-disable-line react/prefer-stateless-function
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   show: false,
  //   // };
  //   // this.showPriceDetail = this.showPriceDetail.bind(this);
  // }

  componentDidMount() {
    scrollTo(0, 0);
    // console.log(this.props.initialValues.toJS().vehicleId);
  }
  // showPriceDetail() {
  //   const { show } = this.state;
  //   this.setState({ show: !show });
  // }
  render() {
    const { handleSubmit, submitting, intl, ...otherProps } = this.props;
    // const { show } = this.state;
    const formFieldsObject = {
      bookingFee: {
        type: 'radioInput',
        validate: [isRequired],
        hasLabel: false,
        customOptions: [{
          display: 'Click to accept the reservation deposit',
          value: '200',
          description: '*LendingCar offers free cancellation and full refund within 48 hours after reservation.After 48 hours, the reservation deposit cannot be refunded',
          checked: true,
          valueUnit: ' ',
        }],
        className: 'col-sm-12',
        displayedOption: 'display',
      },
      paymentCardNum: {
        type: 'number',
        validate: [isRequired, isValidCardNum],
        className: !isMobile ? 'col-sm-6' : 'col-xs-12',
        placeholder: '#### #### #### ####',
        numberFormat: {
          format: '#### #### #### ####',
          mask: '_',
        },
      },
      paymentExp: {
        type: 'number',
        validate: [isRequired, isValidCardExp],
        className: !isMobile ? 'col-sm-3' : 'col-xs-6',
        placeholder: 'MM / YY',
        numberFormat: {
          format: '## / ##',
          mask: ['M', 'M', 'Y', 'Y'],
          valueType: 'formattedValue', // default: value. supported types: floatValue, value, formattedValue
        },
      },
      paymentCvv: {
        type: 'number',
        validate: [isRequired, isValidNumber],
        className: !isMobile ? 'col-sm-3' : 'col-xs-6',
        numberFormat: {
          format: '####',
        },
      },
      paymentName: {
        type: 'text',
        validate: [isRequired, isValidNameLen, isValidName],
        className: !isMobile ? 'col-sm-6' : 'col-xs-12',
      },
      promoCode: {
        type: 'text',
        // validate: [isRequired, isValidNumber, isValidCardNum],
        className: !isMobile ? 'col-sm-6' : 'col-xs-12',
      },
      paymentCountry: {
        // type: 'text',
        // hasLabel: !isMobile,
        type: 'selectInput',
        validate: [isRequired],
        customOptions: COUNTRY_OPTIONS,
        // defaultOption: 'choose a country',
        className: !isMobile ? 'col-sm-6' : 'col-xs-6',
      },
      paymentZip: {
        type: 'number',
        // hasLabel: !isMobile,
        validate: [isRequired, isValidZipCodeLen, isValidNumber],
        className: !isMobile ? 'col-sm-6' : 'col-xs-6',
        placeholder: '#####',
        numberFormat: {
          format: '#####',
        },
      },
    };
    // const groupsTop = _.pick(formFieldsObject, 'bookingFee');
    const groupsMiddle = [
      _.pick(formFieldsObject, 'paymentName'),
      _.pick(formFieldsObject, 'paymentCardNum', 'paymentExp', 'paymentCvv'),
      // _.pick(formFieldsObject, 'paymentAddress1', 'paymentAddress2'),
      _.pick(formFieldsObject, 'paymentZip', 'paymentCountry'),
      _.pick(formFieldsObject, 'promoCode'),
    ];
    const mobileGroupsMiddle = [
      _.pick(formFieldsObject, 'paymentName'),
      _.pick(formFieldsObject, 'paymentCardNum'),
      _.pick(formFieldsObject, 'paymentExp', 'paymentCvv'),
      // _.pick(formFieldsObject, 'paymentAddress1', 'paymentAddress2'),
      _.pick(formFieldsObject, 'paymentZip', 'paymentCountry'),
      _.pick(formFieldsObject, 'promoCode'),
    ];
    const { initialValues = Immutable.Map() } = this.props;
    const bookingFee = parseFloat(initialValues.get('bookingFee', 0)).toFixed(2);
    return (
      <div className="form-div-height">
        {isMobile ?
          <form onSubmit={handleSubmit}>
            {/* <div className="mobile-title-div"><TranslatedMessage messageId="paymentInfo" messages={messages} /></div> */}
            <h3 className="form-title"><TranslatedMessage messageId="paymentInformation" tagName="span" messages={messages} /></h3>
            <div style={{ margin: '15px 15px' }}>
              {mobileGroupsMiddle.map((group, i) =>
                <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} key={i} />
            )}
            </div>
            {/* <div className="mobile-title-div"><TranslatedMessage messageId="reservationDeposit" messages={messages} /></div>
          <div style={{ margin: '0 15px' }}>
            <FormField.Group fieldsObject={groupsTop} {...otherProps} intl={intl} messages={messages} />
          </div> */}

            <div className="m-booking-form-footer">
              <span className="font-medium m-total fontRed">
                <TranslatedMessage messageId="dueNow" tagName="span" messages={messages} />
                  :&nbsp;${bookingFee}
                {/* <i className="caret" style={{ fontSize: '10px', marginLeft: '3px' }}></i> */}
                {/* <p style={{ fontSize: '10px', color: '#ddd', paddingLeft: '5px' }}><TranslatedMessage messageId="youPayAtTheCounter" messages={messages} /></p> */}
              </span>
              {/* {show &&
              <div>
                <p className="clearfix">
                  <span className="pull-left text-left"><TranslatedMessage messageId="reservationDeposit" messages={messages} /></span>
                  <span className="pull-right text-right">${bookingFee}</span>
                </p>
              </div>
              } */}

              <Button type="submit" className="btn-brand-selected col-xs-3 m-button" disabled={submitting}>
                <TranslatedMessage messages={messages} messageId="next" tagName="span" />
              </Button>
            </div>
          </form>
        :
          <form onSubmit={handleSubmit} className="form-div-height web-booking-payment-form">
            <div className="form-div-height">
              {/* <div style={{ marginBottom: '35px' }}>
              <H3><TranslatedMessage messageId="reservationDeposit" tagName="span" messages={messages} /></H3>
              <FormDiv style={{ padding: '20px 28px 28px' }}>
                <FormField.Group fieldsObject={groupsTop} {...otherProps} intl={intl} messages={messages} />
              </FormDiv>
            </div> */}

              <h3 className="form-title"><TranslatedMessage messageId="paymentInformation" tagName="span" messages={messages} /></h3>
              <div style={{ padding: '25px 30px' }}>
                {groupsMiddle.map((group, i) =>
                  <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} key={i} />
              )}
              </div>
              <div className="button-group">
                {/* <Button type="button" className="" onClick={onPrevious} style={{ backgroundColor: '#e0e0e0', color: '#878387', borderRadius: '3px' }}>
                <TranslatedMessage messageId="goBack" messages={messages} />
              </Button> */}
                {/* <span className="note-button">
                <TranslatedMessage messageId="bookInfo" messages={messages} />:&nbsp;
              </span>
              <Button type="submit" className="button" disabled={submitting}>
                $200
              </Button>*/}
                <Button bsSize="large" type="submit" className="nextButton" disabled={submitting} >
                  <TranslatedMessage messages={messages} messageId="next" tagName="span" />
                </Button>
              </div>
              <div>
                <p className="note-info">*&nbsp;
                <TranslatedMessage messageId="subscriptionInfo" messages={messages} />&nbsp;
                </p>
              </div>
              {/* <div>
              <p className="note-info">*&nbsp;&nbsp;&nbsp;&nbsp;
                <TranslatedMessage messageId="subscriptionInfoAhead" messages={messages} />&nbsp;
                <span className="subscription-price">$200</span>
                <TranslatedMessage messageId="subscriptionInfoHinder" messages={messages} />
              </p>
            </div>*/}

              {/* <div style={{ marginBottom: '60px' }}>
              <DueTitle className="clearfix">
                <h3 className="pull-left" style={{ color: '#fff' }}><TranslatedMessage messageId="dueToday" messages={messages} /></h3>
                <h3 className="pull-right">${bookingFee}</h3>
              </DueTitle>
              <FormDiv className="clearfix" style={{ padding: '20px', marginBottom: '45px', borderTopStyle: 'none' }}>
                <div className="pull-right">
                  <p className="clearfix"><span className="pull-left text-left" style={{ marginRight: '10px' }}><TranslatedMessage messageId="reservationDeposit" messages={messages} /></span>
                    <span className="pull-right text-right">${bookingFee}</span>
                  </p>
                </div>
              </FormDiv>
            </div> */}

              {/* <div style={{ marginBottom: '45px' }}><TranslatedMessage messageId="payMentTips" messages={messages} /> <a href="https://help.lendingcar.com/faq/privacy-policy"> <TranslatedMessage messageId="privacyPolicy" messages={messages} /></a>.</div> */}

              {/* <div className="col-md-12">
              <div style={{ width: '90%', margin: '0 auto' }}>
                <Button type="button" className="btn-brand-selected col-md-5 pull-left" onClick={onPrevious} style={{ backgroundColor: '#e0e0e0', color: '#878387', borderRadius: '3px' }}>
                  <TranslatedMessage messageId="goBack" messages={messages} />
                </Button>
                <Button type="submit" className="btn-brand-selected col-md-5 pull-right" disabled={submitting} style={{ backgroundColor: '#2bd89d', color: '#fff', borderRadius: '3px' }}>
                  <TranslatedMessage messageId="bookNow" messages={messages} />
                </Button>
              </div>
            </div> */}
            </div>
          </form>}
      </div>
    );
  }
}

BookingPaymentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  intl: intlShape.isRequired,
  initialValues: PropTypes.object,
  onPrevious: PropTypes.func,
};
export default injectIntl(reduxForm({
  form: 'BookingForm',
  destroyOnUnmount: false,
  // enableReinitialize: false,
})(BookingPaymentForm));
