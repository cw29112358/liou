/*
 * BookingPaymentForm Messages
 *
 * This contains all the text for the BookingPaymentForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.BookingPaymentForm.header',
    defaultMessage: 'This is the BookingPaymentForm component !',
  },
  reservationDeposit: {
    id: 'app.forms.BookingPaymentForm.reservationDeposit',
    defaultMessage: 'Reservation deposit',
  },
  youPayAtTheCounter: {
    id: 'app.containers.BookingPage.components.ReservationPrice.youPayAtTheCounter',
    defaultMessage: 'You Pay at the Counter',
  },
  next: {
    id: 'app.forms.BookingForm.next',
    defaultMessage: 'NEXT',
  },
  paymentInformation: {
    id: 'app.forms.BookingPaymentForm.paymentInformation',
    defaultMessage: 'Payment Information',
  },
  paymentInfo: {
    id: 'app.forms.BookingPaymentForm.paymentInformation',
    defaultMessage: 'Payment Information',
  },
  dueToday: {
    id: 'app.forms.BookingPaymentForm.dueToday',
    defaultMessage: 'Due Today',
  },
  dueNow: {
    id: 'app.components.BookingDetails.mobileDueNow',
    defaultMessage: 'Deposit Now',
  },
  payMentTips: {
    id: 'app.forms.BookingPaymentForm.payMentTips',
    defaultMessage: '*By clicking on *Book Now* button, you confirm that you understand and accept our',
  },
  privacyPolicy: {
    id: 'app.forms.BookingPaymentForm.privacyPolicy',
    defaultMessage: '[Privacy Policy].',
  },
  goBack: {
    id: 'app.forms.BookingForm.goBack',
    defaultMessage: 'GO BACK',
  },
  bookNow: {
    id: 'app.forms.BookingPaymentForm.bookNow',
    defaultMessage: 'BOOK NOW',
  },
  paymentCardNum: {
    id: 'app.forms.BookingPaymentForm.paymentCardNum',
    defineMessages: 'Card Number',
  },
  paymentExp: {
    id: 'app.forms.BookingPaymentForm.paymentExp',
    defineMessages: 'Exp Date',
  },
  paymentCvv: {
    id: 'app.forms.BookingPaymentForm.paymentCvv',
    defineMessages: 'CVV',
  },
  paymentName: {
    id: 'app.forms.BookingPaymentForm.paymentName',
    defineMessages: 'Name on Card',
  },
  paymentAddress1: {
    id: 'app.forms.BookingPaymentForm.paymentAddress1',
    defineMessages: 'Billing Address',
  },
  paymentAddress2: {
    id: 'app.forms.BookingPaymentForm.paymentAddress2',
    defineMessages: 'Billing Address Line 2',
  },
  optional: {
    id: 'app.forms.BookingForm.optional',
    defaultMessage: 'Optional',
  },
  paymentCity: {
    id: 'app.forms.BookingPaymentForm.paymentCity',
    defineMessages: 'City',
  },
  paymentState: {
    id: 'app.forms.BookingPaymentForm.paymentState',
    defineMessages: 'State',
  },
  paymentZip: {
    id: 'app.forms.BookingPaymentForm.paymentZip',
    defineMessages: 'Zip',
  },
  paymentCountry: {
    id: 'app.forms.BookingPaymentForm.paymentCountry',
    defineMessages: 'Country',
  },
  promoCode: {
    id: 'app.forms.BookingPaymentForm.promoCode',
    defineMessages: 'Promo Code',
  },
  'Click to accept the reservation deposit': {
    id: 'app.forms.BookingPaymentForm.acceptDeposit',
    defineMessages: 'Click to accept the reservation deposit',
  },
  '*LendingCar offers free cancellation and full refund within 48 hours after reservation.After 48 hours, the reservation deposit cannot be refunded': {
    id: 'app.forms.BookingPaymentForm.acceptDepositDescription',
    defineMessages: '*LendingCar offers free cancellation and full refund within 48 hours after reservation.After 48 hours, the reservation deposit cannot be refunded',
  },
  Required: {
    id: 'app.validators.required',
    defaultMessage: 'Required',
  },
  'Invalid Exp. Date': {
    id: 'app.validators.invalidExpDate',
    defaultMessage: 'Invalid Exp Date',
  },
  'Invalid zip code': {
    id: 'app.validators.invalidZipCode',
    defaultMessage: 'Invalid zip code',
  },
  'Invalid number': {
    id: 'app.validators.invalidNumber',
    defaultMessage: 'Invalid number',
  },
  'Card number is too short': {
    id: 'app.validators.cardNumberIsTooShort',
    defaultMessage: 'Card number is too short',
  },
  'Invalid name': {
    id: 'app.validators.invalidInputName',
    defaultMessage: 'Invalid name',
  },
  'Maximum length(80) exceeded': {
    id: 'app.validators.isValidAddressLen',
    defaultMessage: 'Maximum length(80) exceeded',
  },
  'Maximum length(40) exceeded': {
    id: 'app.validators.invalidName',
    defaultMessage: 'Maximum length(40) exceeded',
  },
  'Invalid characters': {
    id: 'app.validators.invalidCharacters',
    defaultMessage: 'Invalid characters',
  },
  phoneNumberIsTooShort: {
    id: 'app.validators.isValidPhoneNumberLen',
    defaultMessage: 'Phone number is too short',
  },
  invalidEmailAddress: {
    id: 'app.validators.invalideEmail',
    defaultMessage: 'Invalid email address',
  },

  subscriptionInfoAhead: {
    id: 'app.forms.BookingPaymentForm.subscriptionInfoAhead',
    defaultMessage: '您只需在网上支付定金',
  },
  subscriptionInfoHinder: {
    id: 'app.forms.BookingPaymentForm.subscriptionInfoHinder',
    defaultMessage: '，我们收到您的定金后会在您预定的时间准备好您选定的汽车，请您携带好文件和剩余金额到店取车',
  },
  bookInfo: {
    id: 'app.forms.BookingPaymentForm.bookInfo',
    defaultMessage: 'Payment the reservation deposit',
  },
  subscriptionInfo: {
    id: 'app.forms.BookingPaymentForm.subscriptionInfo',
    defaultMessage: 'Your privacy and information is important to us and we do not store your credit card information. We process your payment through a leading payment processing company  who exceeds all security and data protection standards.',
  },
});
