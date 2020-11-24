/*
 *
 * BookingPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  // formValueSelector,
  getFormValues } from 'redux-form/immutable';
import { push } from 'react-router-redux';
import { injectIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
// import { createStructuredSelector } from 'reselect';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Modal } from 'antd';
// import { Map } from 'immutable';
// import moment from 'moment';
import TranslatedMessage, { formatMessage } from 'components/TranslatedMessage';
// import PathBar from 'components/PathBar';
import Loader from 'components/Loader';
import BookingDetails from 'components/BookingDetails';
import BookingReview from 'components/BookingReview';
import BookingConfirmation from 'components/BookingConfirmation';
import BookingSteps from 'components/BookingSteps';
import CarImage from 'components/CarImage';
import BookingForm from 'forms/BookingForm';
import BookingPaymentForm from 'forms/BookingPaymentForm';
// import BookingFormMessages from 'forms/BookingForm/messages';
// import StepsForm from 'forms/StepsForm';
import { selectCalculatedCar } from 'containers/CarPage/selectors';
import messagesCarPage from 'containers/CarPage/components/CarDetail/messages';
import { selectTerm } from 'containers/App/selectors';
import { selectLocale } from 'containers/LanguageProvider/selectors';
// import CarDetail from './components/CarDetail';
// import ReservationDetail from './components/ReservationDetail';
// import ReservationReview from './components/ReservationReview';
// import ReservationPrice from '../../forms/BookingForm/components/ReservationPrice';
import { saveFormAction, sendEmailAction, makeBookingAction } from './actions';
import messages from './messages';
import {
  selectMergedBookingForm, selectCurrentBookingForm,
  selectIsSubmitSuccess, selectBookingDone, selectBookingError,
  // selectTotalDue,
} from './selectors';
import './style.scss';

export class BookingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      policyChecked: false,
      // show: false,
      // IsInsuranceModalShow: false,
      // insurance: this.props.initialValues.insurance,
    };
    this.props.initialValues.driverLicenseType = props.initialValues.driverLicenseType || 'United States';
  }

  componentWillMount() {
    if (!this.props.carInfo.id) {
      this.props.linkTo('/inventory');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { intl, loadingError, isLoaded, isSubmitSuccess } = nextProps;

    // if (Number(nextProps.selectedInsurance) === 0 && nextProps.selectedInsurance !== this.props.selectedInsurance)
    //   this.setState({ IsInsuranceModalShow: true, insurance: '0' });
    if (isLoaded && isLoaded !== this.props.isLoaded && isSubmitSuccess) {
      // if (nextProps.loadingError && nextProps.loadingError !== '') {
      //   this.showModal();
      // } else
      this.nextPage();
    }
    if (!!loadingError && isLoaded && !isSubmitSuccess && this.state.page >= 3) {
      const title = intl.formatMessage(messages.error);
      window.alert(title, loadingError, 'error', 8);
      setTimeout(() => this.setState({ page: 2 }), 3000);
    }
  }

  onClickPolicyChecked = () => {
    this.setState({ policyChecked: !this.state.policyChecked });
  }

    // {isLoaded && loadingError && <AlertModal  onHide={this.hideModal} message={loadingError} />}

  onDriverSubmit = (formData) => {
    const formObject = formData.toJS();
    this.props.saveBooking(formObject);
    this.nextPage();
  }

  onPaymentSubmit = (formData) => {
    const formObject = formData.toJS();
    formObject.paymentCardNum = formObject.paymentCardNum.replace(/ /g, '');
    formObject.paymentExp = formObject.paymentExp.replace(/ /g, '');
    this.props.saveBooking(formObject);
    this.nextPage();
  }

  onBookingSubmit = (bookingData) => {
    this.props.makeBooking(bookingData);
    // this.nextPage(); // Note: componentWillReceiveProps will handle makeBooking success and goto nextPage
  }

  onEmailSubmit = (formData) => {
    const formObject = formData.toJS();
    formObject.bookingId = this.props.initialValues.bookingId;
    this.props.sendEmail(formObject);
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  hideInsuranceModal = () => {
    this.setState({ IsInsuranceModalShow: false });
  }

  changeInsurance = () => {
    this.setState({ insurance: '200' });
    this.hideInsuranceModal();
  }

  unSelectInsurance = () => {
    this.setState({
      insurance: '0',
      IsInsuranceModalShow: true,
    });
  }

  selectInsurance = () => {
    this.setState({
      insurance: '200',
      IsInsuranceModalShow: false,
    });
  }

  nextPage = () => {
    if (this.state.page <= 3) {
      this.setState({ page: this.state.page + 1 });
    } else {
      this.props.linkTo('/inventory');
    }
  }

  previousPage = () => {
    if (this.state.page >= 2) {
      this.setState({ page: this.state.page - 1 });
    } else {
      this.props.linkTo(`/c/${this.props.carInfo.id}`);
    }
  }

  goToInventoryPage = () => {
    this.props.linkTo('/inventory');
  }

  goToLoginPage = () => {
    this.props.linkTo('/login');
  }

  goToFirstPage = () => {
    this.setState({ page: 1 });
  }

  renderReservationPrice() {
    const { initialValues } = this.props;
    // const insurance = parseFloat(this.state.insurance).toFixed(2);
    // const newInitialValues = Object.assign({}, this.props.initialValues, {insurance: this.state.insurance});
    return (
      <div className="reservation-price">
        {
          <div className="col margin-b-40">
            <CarImage isLazyLoad={false} url={initialValues.vehicleImage} />
            <h3 className="car-title font-bold">
              <TranslatedMessage messages={messagesCarPage} messageId={initialValues.vehicleMake} tagName="span" />
              &nbsp; {initialValues.vehicleModel} {initialValues.vehicleYear}
            </h3>
          </div>
        }
        <BookingDetails
          bookingData={initialValues}
        />
      </div>
    );
  }

  renderInsuranceModal() {
    const insurancePolicy = this.props.intl.formatMessage(messages.insurancePolicy);
    return (
      <Modal
        title={
          <TranslatedMessage messages={messages} messageId="insurancePolicyTitle" tagName="span" />
        }
        visible={this.state.IsInsuranceModalShow}
        onOk={this.changeInsurance}
        onCancel={this.hideInsuranceModal}
        okText={
          <TranslatedMessage messages={messages} messageId="insurancePolicyOKButton" tagName="span" />
        }
        cancelText={
          <TranslatedMessage messages={messages} messageId="insurancePolicyCancelButton" tagName="span" />
        }
      >
        {/* <TranslatedMessage messages={messages} messageId="insurancePolicy">
          {(txt) => (
            <div>
              {txt.split('\r\n').map((line, i) => <div key={i} className="policy-line">{line}</div>)}
            </div>
          )}
        </TranslatedMessage>*/}
        {insurancePolicy.split('\r\n').map((line, i) => <div key={i} className="policy-line">{line}</div>)}
      </Modal>
    );
  }
  render() {
    const { isLoaded, ...otherProps } = this.props;
    const page = this.state.page;

    // const page1Display = page === 1 ? 'block' : 'none';
    // const page2Display = page === 2 ? 'block' : 'none';
    // const page3Display = (page === 3 && isLoaded) ? 'block' : 'none';
    const formValues = this.props.formValues || this.props.initialValues;
    const translatedTitle = formatMessage(this.props.intl, messages, this.props.route.name);
    return (
      <div className="booking-background">
        <Helmet
          title={translatedTitle}
          meta={[{ name: 'description', content: 'Booking' }]}
        />

        {/* {!isMobile && <PathBar {...this.props} hasBackgroundColor />} */}
        {/* <CarDetail values={this.props.initialValues} isMobile={isMobile} carInfo={this.props.carInfo} hasReview={false} locale={locale} /> */}
        {/* <ReservationPrice values={this.props.initialValues} selectedInsurance={this.props.selectedInsurance} selectedTotalDue={this.props.selectedTotalDue} /> */}

        <div className="container page-container booking-container">
          {page <= 3 && <BookingSteps page={this.state.page} />}
          {!isLoaded && <Loader message="Loading" /> }
          {/* <StepsForm {...otherProps} initialValues={this.props.initialValues} onPrevious={this.previousPage} onNext={this.nextPage} onSubmit={this.onDriverSubmit} isMobile={isMobile} /> */}

          {page <= 2 &&
            <div className="form-container">
              {page === 1 &&
                <div className="operation-form">
                  {/* <ReservationDetail values={this.props.initialValues} isMobile={isMobile} /> */}
                  <BookingForm
                    {...otherProps} initialValues={this.props.initialValues}
                    onPrevious={this.previousPage} onNext={this.nextPage}
                    onSubmit={this.onDriverSubmit} isMobile={isMobile}
                  />
                </div>
              }

              {page === 2 &&
                <div className="operation-form">
                  {/* {!isMobile && <ReservationDetail values={this.props.initialValues} />} */}
                  <BookingPaymentForm
                    {...otherProps} initialValues={formValues}
                    onPrevious={this.previousPage}
                    onSubmit={this.onPaymentSubmit} isMobile={isMobile}
                  />
                </div>
              }
              {/* {page === 2 && isMobile &&
                <div>
                  <p className="m-note-info">*&nbsp;
                    <TranslatedMessage messageId="subscriptionInfoAhead" messages={BookingFormMessages} />&nbsp;
                    <span className="m-subscription-price">${parseFloat(this.props.totalDue).toFixed(2)}</span>
                    <TranslatedMessage messageId="subscriptionInfoHinder" messages={BookingFormMessages} />
                  </p>
                </div>
              } */}
              { this.renderReservationPrice()}
            </div>
          }

          {page === 3 &&
            <div style={{ marginTop: '45px' }} className="row">
              <BookingReview bookingData={this.props.bookingValues} onFinish={this.onBookingSubmit} onEdit={this.goToInventoryPage} checked={this.state.policyChecked} changeChecked={this.onClickPolicyChecked} intl={this.props.intl} />
            </div>
          }
          {page === 4 && <BookingConfirmation bookingData={this.props.bookingValues} goToLoginPage={this.goToLoginPage} />}

        </div>
        {/* { this.renderInsuranceModal() } */}
      </div>
    );
  }
}

BookingPage.propTypes = {
  intl: PropTypes.object,
  route: PropTypes.object,
  initialValues: PropTypes.object,
  formValues: PropTypes.object,
  bookingValues: PropTypes.object,
  // totalDue: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]),
  // selectedTotalDue: PropTypes.string,
  // selectedInsurance: PropTypes.string,
  carInfo: PropTypes.object,
  term: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  linkTo: PropTypes.func,
  sendEmail: PropTypes.func,
  saveBooking: PropTypes.func,
  makeBooking: PropTypes.func,
  isChargeSuccess: PropTypes.bool,
  isSubmitSuccess: PropTypes.bool,
  isLoaded: PropTypes.bool,
  loadingError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  locale: PropTypes.string,
};

const mapStateToProps = createPropsSelector({
  initialValues: selectMergedBookingForm,
  bookingValues: selectCurrentBookingForm,
  // totalDue: selectTotalDue,
  carInfo: selectCalculatedCar,
  term: selectTerm,
  isLoaded: selectBookingDone,
  isSubmitSuccess: selectIsSubmitSuccess,
  loadingError: selectBookingError,
  locale: selectLocale,
});

function mapDispatchToProps(dispatch) {
  return {
    linkTo: (url) => dispatch(push(url)),
    makeBooking: (formObject) => dispatch(makeBookingAction(formObject)),
    saveBooking: (formObject) => dispatch(saveFormAction(formObject)),
    sendEmail: (formObject) => dispatch(sendEmailAction(formObject)),
  };
}

// const selector = formValueSelector('BookingForm');
// const selectorRentalDateForm = formValueSelector('RentalDateForm');

export default connect((state) => {
  // const selectedInsurance = selectorRentalDateForm(state, 'insurance') || selector(state, 'insurance');
  // const selectedRate = selector(state, 'rate') || '0';
  // const selectedTotalDue = parseFloat(Number(selectedInsurance) + Number(selectedRate)).toFixed(2);
  const formValues = getFormValues('BookingForm')(state);
  return {
    formValues,
    // selectedInsurance,
  };
})(injectIntl(connect(mapStateToProps, mapDispatchToProps)(BookingPage)));
