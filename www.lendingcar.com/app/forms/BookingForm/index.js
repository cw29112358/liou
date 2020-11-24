
/**
*
* BookingForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { reduxForm, formValueSelector, Field } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// import moment from 'moment';
// import { createPropsSelector } from 'reselect-immutable-helpers';
import pick from 'lodash/pick';
import { injectIntl, intlShape } from 'react-intl';
import { STATE_OPTIONS, COUNTRY_OPTIONS } from 'utils/constants';
import { isRequired, isValidNameLen, isValidName, isValidPhoneNumberLen, isValidEmail, isValidString, isValidPhoneNumber, isAdult } from 'utils/validators';
import styled from 'styled-components';
import * as FormField from 'components/Form/BootstrapFormField';
import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';
// import ReservationPrice from './components/ReservationPrice';
// import MobileReservationPrice from './components/MobileReservationPrice';
import messages from './messages';
import './style.scss';

const H3 = styled.h3`
  margin-bottom:20px;
  padding-left: 20px;
  margin-top: 25px;
  border-left: 4px solid #53cac4;
`;
const GroupDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 40px;
  margin-top: 53px;
`;
// const FormDiv = styled.div`
//     margin-top: 74px;
// `;
// const Recommend = styled.span`
//    display: inline-block;
//    padding: 0 10px;
//    background: #53cac4;
//    color: #fff;
//    fontSize: 12px;
//    borderRadius: 5px;
// `;

const formFieldsObject = {
  bookingId: {
    type: 'hidden',
    className: 'col-sm-4',
  },
  pickupDate: {
    type: 'date',
    validate: [isRequired],
    placeholder: 'MM/DD/YYYY',
    // className: !isMobile ? 'col-sm-4' : 'hidden',
    className: !isMobile ? 'col-sm-4' : 'col-xs-6',
    // hasLabel: !isMobile,
  },
  returnDate: {
    type: 'date',
    validate: [isRequired],
    placeholder: 'MM/DD/YYYY',
    // className: !isMobile ? 'col-sm-4' : 'hidden',
    className: !isMobile ? 'col-sm-4' : 'col-xs-6',
    // hasLabel: !isMobile,
  },
  pickupTime: {
    type: 'select',
    validate: [isRequired],
    // placeholder: '12:00 PM',
    customOptions: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
    className: !isMobile ? 'col-sm-4' : 'col-xs-6',
    // hasLabel: !isMobile,
  },
  term: {
    type: 'static',
    className: !isMobile ? 'col-sm-4' : 'col-xs-6 margin-t-10',
    suffix: 'Months',
    // hasLabel: !isMobile,
  },
  firstName: {
    type: 'text',
    validate: [isRequired, isValidNameLen, isValidName],
    className: !isMobile ? 'col-sm-5' : 'col-xs-12',
    // hasLabel: !isMobile,
  },
  // middleName: {
  //   type: 'text',
  //   validate: [isValidNameLen, isValidName],
  //   className: !isMobile ? 'col-sm-4' : 'col-xs-6',
  //   // placeholder: intl.formatMessage(messages.optional),
  //   // hasLabel: !isMobile,
  // },
  lastName: {
    type: 'text',
    validate: [isRequired, isValidNameLen, isValidName],
    className: !isMobile ? 'col-sm-5' : 'col-xs-12 margin-t-10',
    // hasLabel: !isMobile,
  },
  birthday: {
    type: 'date',
    validate: [isRequired, isAdult],
    placeholder: 'MM/DD/YYYY',
    className: !isMobile ? 'col-sm-5' : 'col-xs-12 margin-t-10',
    // hasLabel: !isMobile,
  },
  phoneNumber: {
    type: 'number',
    validate: [isRequired, isValidPhoneNumberLen, isValidPhoneNumber],
    placeholder: 'xxx-xxx-xxxx',
    className: !isMobile ? 'col-sm-5' : 'col-xs-12 margin-t-10',
    // hasLabel: !isMobile,
    numberFormat: {
      format: '+1 (###) ###-####',
      mask: '_',
    },
  },
  email: {
    type: 'text',
    validate: [isRequired, isValidEmail],
    placeholder: 'xxxx@email.com',
    className: 'col-sm-5',
    // hasLabel: !isMobile,
  },
  driverLicenseType: {
    type: 'select',
    validate: [isRequired],
    customOptions: ['International', 'Foreign', 'United States'],
    className: 'col-sm-12',
    // hasLabel: !isMobile,
  },
  driverLicenseNum: {
    type: 'text',
    validate: [isRequired, isValidString],
    className: !isMobile ? 'col-sm-6' : 'col-xs-6',
    // hasLabel: !isMobile,
  },
  driverLicenseState: {
    // type: 'text',
    // validate: [isRequired, isValidLetter],
    // placeholder: 'XX',
    type: 'selectInput',
    validate: [isRequired],
    customOptions: STATE_OPTIONS,
    // defaultOption: 'choose a state',
    className: !isMobile ? 'col-sm-6' : 'col-xs-6',
    // hasLabel: !isMobile,
  },
  driverLicenseCountry: {
    // type: 'text',
    // validate: [isRequired, isValidLetter],
    type: 'selectInput',
    validate: [isRequired],
    customOptions: COUNTRY_OPTIONS,
    // defaultOption: 'choose a country',
    className: !isMobile ? 'col-sm-5' : 'col-xs-6',
    // hasLabel: !isMobile,
  },
  insurance: {
    type: 'radioInput',
    validate: [isRequired],
    className: 'col-sm-12',
    hasLabel: false,
    customOptions: [{
      display: 'Yes, I need collision protection',
      description: '*Covers car damage from collision, theft or vandalism',
      value: '200',
      valueUnit: '/Month',
    }, {
      display: 'No, I will use my own insurance',
      description: '*Please bring your insurance for the leasing vehicle when you pick up at counter',
      value: '0',
    }],
    displayedOption: 'display',
  },
};

class BookingForm extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      needInsurance: false,
    };
  }

  renderNeedInsurance({ input, meta: { touched, error, warning } }) {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    const option = {
      border: '1px solid #999999',
      borderRadius: '50%',
      WebkitAppearance: 'checkbox',
      backgroundColor: '#000',
    };
    const iponeInputStyle = isMobile && isiOS ? option : {};
    return (<div style={{ fontWeight: '900', fontSize: '18px' }}>*<TranslatedMessage messages={messages} messageId="needInsuranceTitle" tagName="span" />
      <div style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '5px' }} className="input-wrapper">
        <div><input {...input} type="radio" name="needInsurance" value={false} checked={input.value === 'false'} style={iponeInputStyle} /></div>
        &nbsp;<TranslatedMessage messages={messages} messageId="noNeedInsurance" tagName="span" />
      </div>
      <div style={{ fontWeight: 'normal', fontSize: '14px' }} className="input-wrapper">
        <div><input {...input} type="radio" name="needInsurance" value checked={input.value === 'true'} style={iponeInputStyle} /></div>
        &nbsp;<TranslatedMessage messages={messages} messageId="needInsurance" tagName="span" />
      </div>
      {touched && ((error && <span className="fontRed" style={{ fontSize: '12px' }}>{error}</span>) || (warning && <span className="fontRed">{warning}</span>))}
    </div>);
  }

  renderMobileForm = (groupPickup, groupsDriver, groupDLType, groupDLUS, groupDLNonUS) => {
    const { handleSubmit, submitting, intl, initialValues, ...otherProps } = this.props;
    const bookingFee = parseFloat(initialValues.get('bookingFee', 0)).toFixed(2);
    // const deposit = parseFloat(carDetailInfo.deposit).toFixed(2);
    const required = (value) => value ? undefined : formatMessage(intl, messages, 'requiredSelect');

    return (
      <form onSubmit={handleSubmit}>
        <H3><TranslatedMessage messages={messages} messageId="driverInformation" tagName="span" /></H3>
        <div style={{ margin: '15px 15px' }}>
          {groupsDriver.map((group, i) =>
            <div key={i}>
              <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} />
            </div>
          )}
          <div className="booking-form-driver-type">
            <FormField.Group fieldsObject={groupDLType} onChange={this.selectDLType} {...otherProps} intl={intl} messages={messages} />
            {this.props.selectedDLType !== 'United States' &&
            <FormField.Group fieldsObject={groupDLNonUS} {...otherProps} intl={intl} messages={messages} />}
            {this.props.selectedDLType === 'United States' &&
            <FormField.Group fieldsObject={groupDLUS} {...otherProps} intl={intl} messages={messages} />}
          </div>
          <Field name="needInsurance" component={this.renderNeedInsurance} validate={[required]} />
        </div>

        <div className="m-booking-form-footer">
          <span className="font-medium m-total fontRed">
            <TranslatedMessage messageId="dueNow" tagName="span" messages={messages} />
            :&nbsp;${bookingFee}
          </span>
          <Button type="submit" className="btn-brand-selected col-xs-3 m-button" disabled={submitting}>
            <TranslatedMessage messages={messages} messageId="next" tagName="span" />
          </Button>
        </div>
      </form>
    );
  }

  renderWebForm = (groupPickup, groupsDriver, groupDLType, groupDLUS, groupDLNonUS) => {
    const { handleSubmit, submitting, intl, ...otherProps } = this.props;
    const required = (value) => value ? undefined : formatMessage(intl, messages, 'requiredSelect');

    return (
      <form onSubmit={handleSubmit}>
        {/* <div>
        <div>
          <H3><TranslatedMessage messages={messages} messageId="leasingTime" tagName="span" /></H3>
          <FormDiv style={{ padding: '20px 28px 28px', marginBottom: '35px' }}>
            {groupPickup.map((group, index) =>
              <div key={index}>
                <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} />
              </div>
            )}
          </FormDiv>
        </div>
      </div> */}

        <div>
          <H3><TranslatedMessage messages={messages} messageId="driverInformation" tagName="span" /></H3>
          <div style={{ padding: '20px 20px' }}>
            {groupsDriver.map((group, i) =>
              <FormField.Group fieldsObject={group} key={i} {...otherProps} intl={intl} messages={messages} />
          )}
            <div className="booking-form-driver-type">
              <FormField.Group fieldsObject={groupDLType} onChange={this.selectDLType} {...otherProps} intl={intl} messages={messages} />
              {this.props.selectedDLType !== 'United States' &&
              <FormField.Group fieldsObject={groupDLNonUS} {...otherProps} intl={intl} messages={messages} />}
              {this.props.selectedDLType === 'United States' &&
              <FormField.Group fieldsObject={groupDLUS} {...otherProps} intl={intl} messages={messages} />}
            </div>
            <Field name="needInsurance" component={this.renderNeedInsurance} validate={[required]} />
          </div>

          <GroupDiv>
            {/* <Button type="button" className="" onClick={onPrevious} style={{ backgroundColor: '#e0e0e0', color: '#878387', borderRadius: '3px' }}>
            <TranslatedMessage messages={messages} messageId="goBack" tagName="span" />
          </Button> */}
            <Button bsSize="large" type="submit" className="nextButton" disabled={submitting} >
              <TranslatedMessage messages={messages} messageId="next" tagName="span" />
            </Button>
          </GroupDiv>
        </div>

        {/* <div>
        <div className="clearfix row">
          <div className="col-xs-6 col-md-6">
            <H3 className="pull-left"><TranslatedMessage messages={messages} messageId="insurance" tagName="span" />
              <small style={{ display: 'block', marginTop: '15px' }}>*<TranslatedMessage messages={messages} messageId="selectOption" tagName="span" /></small>
            </H3>
          </div>
          <div className="col-xs-6 col-md-6 pull-right">
            <div className="pull-right">
              <p ><TranslatedMessage messages={messages} messageId="recommended" tagName="span" /></p>
            </div>
          </div>
        </div>
        <div style={{ padding: '30px', marginBottom: '20px' }}>
          <FormField.Group fieldsObject={groupInsurance} {...otherProps} intl={intl} messages={messages} />
        </div>
      </div>

      <div className="row">
        <ReservationPrice values={this.props.initialValues.toJS()} selectedInsurance={this.props.selectedInsurance} selectedTotalDue={this.props.selectedTotalDue} />
      </div> */}

        {/* <div>
        <div style={{ width: '90%', margin: '0 auto', position: '' }}>
          <Button type="button" className="btn-brand-selected col-md-5 pull-left" onClick={onPrevious} style={{ backgroundColor: '#e0e0e0', color: '#878387', borderRadius: '3px' }}>
            <TranslatedMessage messages={messages} messageId="goBack" tagName="span" />
          </Button>
          <Button type="submit" className="btn-brand-selected col-md-5 pull-right" disabled={submitting} style={{ backgroundColor: '#2bd89d', color: '#fff', borderRadius: '3px' }}>
            <TranslatedMessage messages={messages} messageId="next" tagName="span" />
          </Button>
        </div>
      </div> */}
      </form>);
  }

  render() {
    // console.log('bookingForm',this.props.formValues.toJS());

    // if (isMobile) {
    //   formFieldsObject.insurance = {
    //     type: 'switchInput',
    //     validate: [isRequired],
    //     customOptions: [{
    //       label:
    //         <div style={{ float: 'left' }}>
    //           <div>I need collision protection.</div>
    //           <div style={{ color: 'rgb(40, 216, 157)' }}>$200 /Month</div>
    //         </div>,
    //       value: '200',
    //     }, {
    //       label:
    //         <div style={{ float: 'left' }}>
    //           <div>I will use my own insurance.</div>
    //           <div style={{ color: 'grey' }}>$0 /Month</div>
    //         </div>,
    //       value: '0',
    //     }],
    //     className: 'col-sm-12',
    //     style: { color: '#28d89d', float: 'right' },
    //   };
    // }

    const groupPickup = [
      pick(formFieldsObject, 'pickupDate', 'returnDate'),
    ];
    const groupsDriver = [
      pick(formFieldsObject, 'firstName', 'lastName'),
      pick(formFieldsObject, 'birthday', 'phoneNumber'),
      pick(formFieldsObject, 'email'),
    ];
    const groupDLType = pick(formFieldsObject, 'driverLicenseType');
    const groupDLUS = pick(formFieldsObject, 'driverLicenseNum', 'driverLicenseState');
    const groupDLNonUS = pick(formFieldsObject, 'driverLicenseNum', 'driverLicenseCountry');
    const groupInsurance = pick(formFieldsObject, 'insurance');

    return (
      <div className="form-div-height">
        { isMobile ?
          // <form onSubmit={handleSubmit}>
          //   <div style={{ margin: '0 15px' }}>
          //     {groupPickup.map((group, index) =>
          //       <div key={index}>
          //         <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} />
          //       </div>
          //     )}
          //   </div>
          //   <div className="mobile-title-div"><TranslatedMessage messages={messages} messageId="driverInfo" tagName="span" /></div>
          //   <div style={{ margin: '0 15px' }}>
          //     {groupsDriver.map((group, i) =>
          //       <div key={i}>
          //         <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} />
          //       </div>
          //     )}
          //     <div className="booking-form-driver-type">
          //       <FormField.Group fieldsObject={groupDLType} onChange={this.selectDLType} {...otherProps} intl={intl} messages={messages} />
          //       {this.props.selectedDLType !== 'United States' &&
          //       <FormField.Group fieldsObject={groupDLNonUS} {...otherProps} intl={intl} messages={messages} />}
          //       {this.props.selectedDLType === 'United States' &&
          //       <FormField.Group fieldsObject={groupDLUS} {...otherProps} intl={intl} messages={messages} />}
          //     </div>
          //   </div>
          //   <div className="mobile-title-div" style={{ marginBottom: '0' }}><TranslatedMessage messages={messages} messageId="insurance" tagName="span" /></div>
          //   <div>
          //     <div style={{ backgroundColor: 'rgb(245,245,245)', padding: '0 15px' }}>
          //       <FormField.Group fieldsObject={groupInsurance} {...otherProps} intl={intl} messages={messages} />
          //     </div>
          //     <div style={{ backgroundColor: 'rgb(251,251,251)', padding: '0 15px', marginTop: '-25px' }}>
          //       *<TranslatedMessage messages={messages} messageId="insuranceCovers" tagName="span" /><br></br>
          //     *<TranslatedMessage messages={messages} messageId="bringInsurance" tagName="span" />
          //     </div>
          //   </div>
          //   <div className="m-booking-form-footer">
          //     <MobileReservationPrice values={this.props.initialValues.toJS()} selectedInsurance={this.props.selectedInsurance} selectedTotalDue={this.props.selectedTotalDue} />
          //     <Button type="submit" className="btn-brand-selected col-xs-3" disabled={submitting} style={{ backgroundColor: '#2bd89d', color: '#fff', borderRadius: '3px', marginTop: '10px' }}>
          //       <TranslatedMessage messages={messages} messageId="next" tagName="span" />
          //     </Button>
          //   </div>
          // </form>
          this.renderMobileForm(groupPickup, groupsDriver, groupDLType, groupDLUS, groupDLNonUS, groupInsurance)
          :
          this.renderWebForm(groupPickup, groupsDriver, groupDLType, groupDLUS, groupDLNonUS, groupInsurance)
        }
      </div>
    );
  }
}

BookingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  intl: intlShape.isRequired,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  saveBooking: PropTypes.func,
  initialValues: PropTypes.object,
  selectedInsurance: PropTypes.string,
  selectedDLType: PropTypes.string,
  selectedTotalDue: PropTypes.string,
  input: PropTypes.object,
};

const selector = formValueSelector('BookingForm');

export default connect((state) => {
  const selectedDLType = selector(state, 'driverLicenseType');
  return {
    selectedDLType,
  };
})(injectIntl(reduxForm({
  form: 'BookingForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(BookingForm)));
