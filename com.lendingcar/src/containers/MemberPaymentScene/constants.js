
import CreditsIcon from 'assets/credits.png';
import BitcoinsIcon from 'assets/bitcoins.png';
import ethereumIcon from 'assets/ethereum.png';
import styles from './styles';

export const PAYMENT_METHODS = [
  {
    icon: CreditsIcon,
    describe: 'creditsText',
    style: styles.creditsImage,
  },
  {
    icon: BitcoinsIcon,
    describe: 'bitcoinsText',
    style: styles.bitcoinsImage,
  },
  {
    icon: ethereumIcon,
    describe: 'ethereumText',
    style: styles.ethereumImage,
  },
];
