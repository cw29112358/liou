/*
 * RentalDateForm Messages
 *
 * This contains all the text for the RentalDateForm form component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.forms.RentalDateForm.header',
    defaultMessage: 'This is the RentalDateForm form component !',
  },
  next: {
    id: 'app.forms.RentalDateForm.next',
    defaultMessage: 'Next',
  },
  term: {
    id: 'app.containers.HomePage.components.UserCalculator.term',
    defaultMessage: 'Months',
  },
  days: {
    id: 'app.containers.HomePage.components.UserCalculator.days',
    defaultMessage: 'Days',
  },
  rate: {
    id: 'app.containers.CarPage.components.Description.rate1',
    defaultMessage: 'Rate',
  },
  day: {
    id: 'app.containers.CarPage.components.Description.day',
    defaultMessage: 'Day',
  },
  month: {
    id: 'app.containers.CarPage.components.Description.month',
    defaultMessage: 'Month',
  },
  oneMonth: {
    id: 'app.components.BookingContract.months',
    defaultMessage: 'Month',
  },
  months: {
    id: 'app.components.BookingContract.months',
    defaultMessage: 'Months',
  },
  taxs: {
    id: 'app.containers.BookingPage.components.ReservationPrice.taxs',
    defaultMessage: 'Taxs',
  },
  insurance: {
    id: 'app.containers.BookingPage.components.ReservationPrice.insurance',
    defaultMessage: 'Insurance',
  },
  deposit: {
    id: 'app.containers.CarPage.components.Description.deposit1',
    defaultMessage: 'Deposit',
  },
  total: {
    id: 'app.containers.InventoryPage.components.ListItem.total',
    defaultMessage: 'Total',
  },
  pickupDate: {
    id: 'app.forms.BookingForm.pickupDate',
    defaultMessage: 'Pickup Date',
  },
  returnDate: {
    id: 'app.forms.BookingForm.returnDate',
    defaultMessage: 'Return Date',
  },
  pickUp: {
    id: 'app.forms.BookingForm.pickUp',
    defaultMessage: 'Pickup Location',
  },
  return: {
    id: 'app.forms.BookingForm.return',
    defaultMessage: 'Return Location',
  },

  depositInfoAhead: {
    id: 'app.forms.RentalDateForm.depositInfoAhead',
    defaultMessage: '取车时我们将收取',
  },
  depositInfoHinder: {
    id: 'app.forms.RentalDateForm.depositInfoHinder',
    defaultMessage: '押金，在您还车时，我们会查看您租车期间的违章缴纳情况，使用押金帮您缴纳未支付的罚款，多退少补，多余的押金我们将在您还车30天后返还给您',
  },
});
