/*
 * AlertModal Messages
 *
 * This contains all the text for the AlertModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.AlertModal.header',
    defaultMessage: 'Error',
  },
  "Firebase.update failed: First argument contains undefined in property 'dealer.customers.oDoMlMKvFIaIYvhiWIcIrDaVArp1.dl123sk1j4.addressStreet'": {
    id: 'app.components.AlertModal.firebaseUpdateFailed',
    defaultMessage: 'Failed to submit',
  },
  'This vehicle is not available': {
    id: 'app.components.AlertModal.thisVehicleIsNotAvailable',
    defaultMessage: 'This vehicle is not available',
  },
});
