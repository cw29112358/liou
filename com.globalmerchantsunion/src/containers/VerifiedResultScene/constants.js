import { Actions } from 'react-native-router-flux';
import { VERIFY_CONTACT_EMAIL } from 'utils/constants';
import failedImage from './assets/failed.png';
import pendingImage from './assets/pending.png';
import styles from './styles';

export const RESOURCE = {
  failed: {
    image: failedImage,
    title: 'verifiedFailed',
    content: [
      {
        label: 'verifiedFailedText',
      },
    ],
    buttonLabel: 'verifiedAgain',
    buttonOnPress: () => Actions.push('verified'),
  },
  pending: {
    image: pendingImage,
    title: 'verifiedPending',
    content: [
      {
        label: 'verifiedPendingText1',
      },
      {
        label: 'verifiedPendingText2',
      },
      {
        label: VERIFY_CONTACT_EMAIL,
        isTranslate: false,
        style: styles.emailText,
      },
    ],
    buttonLabel: 'home',
    buttonOnPress: () => Actions.reset('tabbar'),
  },
};
