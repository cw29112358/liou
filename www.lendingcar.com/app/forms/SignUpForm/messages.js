/*
 * SignUpForm Messages
 *
 * This contains all the text for the SignUpForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.SignUpForm.header',
    defaultMessage: 'This is the SignUpForm component !',
  },
  email: {
    id: 'app.components.SubscribeModal.email',
    defaultMessage: 'Email',
  },
  password: {
    id: 'app.components.SubscribeModal.password',
    defaultMessage: 'Password',
  },
  name: {
    id: 'app.components.SubscribeModal.name',
    defaultMessage: 'Name',
  },
  referralCode: {
    id: 'app.components.SubscribeModal.referralCode',
    defaultMessage: 'Referral Code',
  },
  button: {
    id: 'app.components.SubscribeModal.button',
    defaultMessage: 'Next',
  },
  placeholderReferralCode: {
    id: 'app.components.ModalField.placeholderReferralCode',
    defaultMessage: 'Referral Code (Optional)',
  },
  placeholderEmail: {
    id: 'app.components.ModalField.placeholderEmail',
    defaultMessage: 'Email',
  },
  placeholderPassword: {
    id: 'app.components.ModalField.placeholderPassword',
    defaultMessage: 'Password',
  },
  placeholderName: {
    id: 'app.components.ModalField.placeholderName',
    defaultMessage: 'Name',
  },
});
