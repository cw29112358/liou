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
  Required: {
    id: 'app.validators.required',
    defaultMessage: 'Required',
  },
  'Invalid email address': {
    id: 'app.validators.invalideEmail',
    defaultMessage: 'Invalid email address',
  },
  'Maximum length(40) exceeded': {
    id: 'app.validators.invalidName',
    defaultMessage: 'Maximum length(40) exceeded',
  },
  'Maximum length(16) exceeded': {
    id: 'app.validators.invalidReferralCode',
    defaultMessage: 'Maximum length(16) exceeded',
  },
});
