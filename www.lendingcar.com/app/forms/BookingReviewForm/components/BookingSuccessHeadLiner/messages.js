/*
 * BookingSuccessHeadLiner Messages
 *
 * This contains all the text for the BookingSuccessHeadLiner component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.BookingSuccessHeadLiner.header',
    defaultMessage: 'This is the BookingSuccessHeadLiner component !',
  },
  congratulations: {
    id: 'app.forms.BookingReviewForm.congratulations',
    defaultMessage: 'Congratulations!',
  },
  reservationSuccess: {
    id: 'app.forms.BookingReviewForm.reservationSuccess',
    defaultMessage: 'You have completed your booking.',
  },
  reservationSuccessTitle: {
    id: 'app.forms.BookingReviewForm.reservationSuccessTitle',
    defaultMessage: 'Thanks for choosing LendingCar!',
  },
  reservationSuccessDescription: {
    id: 'app.forms.BookingReviewForm.reservationSuccessDescription',
    defaultMessage: 'Thanks for choosing LendingCar! We are preparing your order and will keep you updated with its progress. You will receive an email confirmation shortly.',
  },
});
