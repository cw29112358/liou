/**
*
* RentalDateForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';
import moment from 'moment';
// import pick from 'lodash/pick';
import { Icon, Tooltip, Switch } from 'antd';
// import * as FormField from 'components/Form/BootstrapFormField';
// import { isRequired } from 'utils/validators';

import TranslatedMessage from 'components/TranslatedMessage';
import CarImage from 'components/CarImage';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';

import messages from './messages';
import arrow from './arrow.png';
import './style.scss';

function RentalDateForm(props) {
  const { handleSubmit, carDetailInfo, insurance, initialValues, rate, selectInsurance, unSelectInsurance } = props;
  const vehicleInfo = {
    make: carDetailInfo.vehicleMake,
    model: carDetailInfo.vehicleModel,
    year: carDetailInfo.vehicleYear,
    color: carDetailInfo.vehicleColor,
    carType: carDetailInfo.vehicleType,
    mileage: carDetailInfo.vehicleMileage,
    mileageLimit: carDetailInfo.mileageLimit,
    feature: carDetailInfo.vehicleFeature,
    passengers: carDetailInfo.vehiclePassengers,
    doors: carDetailInfo.vehicleDoors,
    imageUrl: carDetailInfo.vehicleImage,
  };
  const formObject = initialValues.toJS();
  const deposit = parseFloat(carDetailInfo.deposit).toFixed(2);

  const days = moment(formObject.returnDate).diff(moment(formObject.pickupDate), 'days');
  const totalDueWithoutTaxs = parseFloat(Number(formObject.rate) * Number(days)).toFixed(2);
  const taxs = parseFloat(totalDueWithoutTaxs * 0.09).toFixed(2);
  const term = carDetailInfo.term;
  const totalInsurance = Number(insurance) * Number(term);
  const totalDue = parseFloat(Number(totalDueWithoutTaxs) + Number(taxs) + Number(totalInsurance)).toFixed(2);

  // const formFieldsObject = {
  //   pickupDate: {
  //     type: 'date',
  //     validate: [isRequired],
  //     placeholder: 'MM/DD/YYYY',
  //     // className: !isMobile ? 'col-sm-4' : 'hidden',
  //     className: !isMobile ? 'col-sm-6' : 'col-xs-6',
  //     // hasLabel: !isMobile,
  //   },
  //   returnDate: {
  //     type: 'date',
  //     validate: [isRequired],
  //     placeholder: 'MM/DD/YYYY',
  //     // className: !isMobile ? 'col-sm-4' : 'hidden',
  //     className: !isMobile ? 'col-sm-6' : 'col-xs-6',
  //     // hasLabel: !isMobile,
  //   },
  //   insurance: {
  //     type: 'switchInput',
  //     validate: [isRequired],
  //     className: 'col-sm-12 margin-b-25',
  //     checkedInsurance: !!Number(insurance),
  //     // hasLabel: false,
  //     customOptions: [{
  //       // label: 'insurance',
  //       value: '200',
  //     }, {
  //       // label: 'insurance',
  //       value: '0',
  //     }],
  //   },
  // };

  // const groupPickup = [
  //   pick(formFieldsObject, 'pickupDate', 'returnDate'),
  // ];
  // const groupInsurance = pick(formFieldsObject, 'insurance');

  const renderRentalDate = () =>
    <div className="pick-return-info">
      <div className="pick-return-area">
        <p className="area-pick-up">
          <TranslatedMessage messages={messages} messageId="pickUp" tagName="span" />:<br />
          {formObject.pickupAddress1}
          {formObject.pickupAddress2 ? `, ${formObject.pickupAddress2}` : ''}
          {formObject.pickupCity ? `, ${formObject.pickupCity}` : ''}
          {formObject.pickupState ? `, ${formObject.pickupState}` : ''}
          {formObject.pickupZip ? `, ${formObject.pickupZip}` : ''}
        </p>
        <p className="area-return">
          <TranslatedMessage messages={messages} messageId="return" tagName="span" />:<br />
          {formObject.returnAddress1}
          {formObject.returnAddress2 ? `, ${formObject.returnAddress2}` : ''}
          {formObject.returnCity ? `, ${formObject.returnCity}` : ''}
          {formObject.returnState ? `, ${formObject.returnState}` : ''}
          {formObject.returnZip ? `, ${formObject.returnZip}` : ''}
        </p>
      </div>
      <div className="pick-return-date">
        <Icon type="calendar" className="icon" />
        <div className="date-line font-regular">
          <span className="pull-left date-font">{formObject.pickupDate}</span>
          <img src={arrow} alt="arrow-right" className="arrow-right" />
          <span className="pull-right date-font">{formObject.returnDate}</span>
        </div>
      </div>
    </div>;

  const renderTooltip = () =>
    <p>
      <TranslatedMessage messages={messages} messageId="depositInfoAhead" tagName="span" />
      <span className="deposit-price">$1000</span>
      <TranslatedMessage messages={messages} messageId="depositInfoHinder" tagName="span" />
    </p>;

  return (
    <form onSubmit={handleSubmit} className="rental-Date-form">
      {!isMobile &&
        <div className="col margin-b-40">
          <CarImage url={vehicleInfo.imageUrl} isLazyLoad={false} />
          <h3 className="car-title font-bold"><TranslatedMessage messages={messagesCarPage} messageId={vehicleInfo.make} tagName="span" />&nbsp; {vehicleInfo.model} {vehicleInfo.year}</h3>
        </div>
      }
      {/* {groupPickup.map((group, index) =>
        <div key={index}>
          <FormField.Group fieldsObject={group} {...otherProps} intl={intl} messages={messages} />
        </div>
      )} */}
      {renderRentalDate()}
      <div className="info-div">
        <p className="info-line font-regular">
          <span className="pull-left"><TranslatedMessage messages={messages} messageId="term" tagName="span" /></span>
          <span className="pull-right">{term} <TranslatedMessage messages={messages} messageId={term > 1 ? 'months' : 'oneMonth'} tagName="span" /></span>
        </p>
        <p className="info-line font-regular">
          <span className="pull-left"><TranslatedMessage messages={messages} messageId="rate" tagName="span" /></span>
          <span className="pull-right">${rate}/<TranslatedMessage messages={messages} messageId="day" tagName="span" /></span>
        </p>
        <p className="info-line font-regular">
          <span className="pull-left"><TranslatedMessage messages={messages} messageId="taxs" tagName="span" /></span>
          <span className="pull-right">${taxs}</span>
        </p>
        <div className="info-line font-regular">
          <span className="pull-left switch-line">
            <TranslatedMessage messages={messages} messageId="insurance" tagName="span" />&nbsp;&nbsp;
            {/* <FormField.Group fieldsObject={groupInsurance} {...otherProps} intl={intl} messages={messages} /> */}
            <Switch checked={!!Number(insurance)} onChange={!Number(insurance) ? selectInsurance : unSelectInsurance} />
          </span>
          <span className="pull-right">{term}&nbsp;&nbsp;X&nbsp;&nbsp;${insurance}/<TranslatedMessage messages={messages} messageId="month" tagName="span" /></span>
        </div>
      </div>
      {!isMobile && <div className="total-line">
        <h3 className="font-medium total">
          <TranslatedMessage messages={messages} messageId="total" tagName="span" />:
          ${totalDue}
        </h3>
      </div>}
      <p className="deposit-line font-regular">
        <span className="pull-left">
          <TranslatedMessage messages={messages} messageId="deposit" tagName="span" />:&nbsp;
        </span>
        <span className="pull-right">${deposit}</span>
        <Tooltip
          placement="bottomRight"
          title={renderTooltip()}
          trigger="click"
        >
          <Icon type="question-circle-o" className="margin-l-10" />
        </Tooltip>
      </p>
    </form>
  );
}

RentalDateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  // intl: intlShape.isRequired,
  carDetailInfo: PropTypes.object,
  initialValues: PropTypes.object,
  insurance: PropTypes.string,
  unSelectInsurance: PropTypes.func,
  selectInsurance: PropTypes.func,
  // totalDue: PropTypes.string,
  rate: PropTypes.string,
};

export default injectIntl(reduxForm({
  form: 'RentalDateForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(RentalDateForm));
