/*
 * PaymentDetailForm Messages
 *
 * This contains all the text for the PaymentDetailForm form component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.forms.PaymentDetailForm.header',
    defaultMessage: 'This is the PaymentDetailForm form component !',
  },
  cancel: {
    id: 'app.ProfileForm.cancel',
    defaultMessage: 'Cancel',
  },
  next: {
    id: 'app.containers.LeaseForm.next',
    defaultMessage: 'Next',
  },
  back: {
    id: 'app.containers.LeaseForm.previous',
    defaultMessage: 'Previous',
  },
  congratulations: {
    id: 'app.forms.BookingReviewForm.congratulations',
    defaultMessage: 'Congratulations!',
  },
  reservationSuccess: {
    id: 'app.forms.BookingReviewForm.reservationSuccess',
    defaultMessage: 'You have completed your booking.',
  },
  reservationSuccessDescription: {
    id: 'app.forms.BookingReviewForm.reservationSuccessDescription',
    defaultMessage: 'Thanks for choosing LendingCar! We are preparing your order and will keep you updated with its progress. You will receive an email confirmation shortly.',
  },
  bookingNumber: {
    id: 'app.forms.BookingReviewForm.bookingNumber',
    defaultMessage: 'Booking Number',
  },
  vehicleInformation: {
    id: 'app.forms.BookingReviewForm.vehicleInformation',
    defaultMessage: 'Vehicle Information',
  },
  driverInformation: {
    id: 'app.forms.BookingForm.driverInformation',
    defaultMessage: 'Driver Information',
  },
  paymentInformation: {
    id: 'app.forms.BookingPaymentForm.paymentInformation',
    defaultMessage: 'Payment Information',
  },
  leasingTime: {
    id: 'app.forms.BookingForm.leasingTime',
    defaultMessage: 'Leasing Time',
  },
  months: {
    id: 'app.containers.HomePage.components.UserCalculator.months',
    defaultMessage: 'Months',
  },
  insurance: {
    id: 'app.containers.BookingPage.components.ReservationPrice.insurance',
    defaultMessage: 'Insurance',
  },
  '/Month': {
    id: 'app.forms.BookingForm.valueUnit',
    defineMessages: '/Month',
  },
  pickupLocation: {
    id: 'app.containers.BookingPage.components.ReservationDetail.pickupLocation',
    defaultMessage: 'Pick up location',
  },
  returnLocation: {
    id: 'app.containers.BookingPage.components.ReservationDetail.returnLocation',
    defaultMessage: 'Return location',
  },
  sendEmail: {
    id: 'app.forms.BookingReviewForm.sendEmail',
    defaultMessage: 'Email your confirmation',
  },
  goBackInventory: {
    id: 'app.forms.BookingReviewForm.goBackInventory',
    defaultMessage: 'Go back to inventory',
  },
  getReceipt: {
    id: 'app.forms.BookingReviewForm.getReceipt',
    defaultMessage: 'If you want to get a receipt, please contact us at',
  },
  payAndFinish: {
    id: 'app.forms.BookingReviewForm.payAndFinish',
    defaultMessage: 'Pay & Finish',
  },
});
