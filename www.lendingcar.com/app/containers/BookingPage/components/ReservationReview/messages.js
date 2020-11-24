/*
 * ReservationReview Messages
 *
 * This contains all the text for the ReservationReview component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.BookingPage.components.ReservationReview.header',
    defaultMessage: 'This is the ReservationReview component !',
  },
  reservationReview: {
    id: 'app.containers.BookingPage.components.ReservationReview.reservationReview',
    defaultMessage: 'ReservationReview',
  },
  leasingTime: {
    id: 'app.forms.BookingForm.leasingTime',
    defaultMessage: 'Leasing Time',
  },
  driverInformation: {
    id: 'app.forms.BookingForm.driverInformation',
    defaultMessage: 'Driver Information',
  },
  insurance: {
    id: 'app.containers.BookingPage.components.ReservationPrice.insurance',
    defaultMessage: 'Insurance',
  },
  Yes: {
    id: 'app.containers.BookingPage.components.ReservationReview.yes',
    defaultMessage: 'Yes',
  },
  No: {
    id: 'app.containers.BookingPage.components.ReservationReview.no',
    defaultMessage: 'No',
  },
  '/Month': {
    id: 'app.forms.BookingForm.valueUnit',
    defineMessages: '/Month',
  },
  offlinePayment: {
    id: 'app.containers.BookingPage.components.ReservationReview.offlinePayment',
    defineMessages: 'What You Pay At Counter',
  },
  payMentTips: {
    id: 'app.forms.BookingPaymentForm.payMentTips',
    defaultMessage: '*By clicking on *Book Now* button, you confirm that you understand and accept our',
  },
  privacyPolicy: {
    id: 'app.forms.BookingPaymentForm.privacyPolicy',
    defaultMessage: '[Privacy Policy]',
  },
  months: {
    id: 'app.containers.HomePage.components.UserCalculator.months',
    defaultMessage: 'Months',
  },
});
