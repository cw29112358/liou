import CreditsIcon from './assets/credits.png';
import alipayIcon from './assets/alipay.png';
import weChatPayIcon from './assets/weChatPay.png';
import styles from './styles';

export const MEMBERSHIP_PRICE_LOAD = 'src/MemberPaymentScene/MEMBERSHIP_PRICE_LOAD';
export const MEMBERSHIP_PRICE_LOAD_SUCCESS = 'src/MemberPaymentScene/MEMBERSHIP_PRICE_LOAD_SUCCESS';
export const MEMBERSHIP_PRICE_LOAD_FAIL = 'src/MemberPaymentScene/MEMBERSHIP_PRICE_LOAD_FAIL';

export const PAYMENT_METHODS = [
  {
    icon: CreditsIcon,
    describe: 'creditsText',
    isSupport: true,
    style: styles.creditsImage,
  },
  {
    icon: alipayIcon,
    describe: 'alipayText',
    isSupport: false,
    style: styles.thirdPartyImage,
  },
  {
    icon: weChatPayIcon,
    describe: 'weChatPayText',
    isSupport: false,
    style: styles.thirdPartyImage,
  },
];
