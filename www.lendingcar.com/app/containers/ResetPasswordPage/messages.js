/*
 * ResetPasswordPage Messages
 *
 * This contains all the text for the ResetPasswordPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.ResetPasswordPage.header',
    defaultMessage: 'This is ResetPasswordPage container !',
  },
  resetPasswordPage: {
    id: 'app.forms.resetPassword',
    defaultMessage: 'Reset Password',
  },
  resetPasswordLinkError: {
    id: 'app.containers.ResetPasswordPage.resetPasswordLinkError',
    defaultMessage: 'Reset password url link is error, please receive new email!',
  },
  error: {
    id: 'app.notification.error',
    defaultMessage: 'Error',
  },
  success: {
    id: 'app.notification.success',
    defaultMessage: 'Success',
  },
});
