/*
 *
 * LeaseTypeScene constants
 *
 */
import { Actions } from 'react-native-router-flux';
import auth from 'utils/auth';
import leaseImage from './assets/suvImage.png';
import rentImage from './assets/sedanImage.png';

export const TITLE_LEASETYPE = 'chooseLeaseType';
export const FOOTER_LEASETYPETIPS = 'leaseTypeTips';
export const LEASETYPECARDS = [
  {
    key: 'rent',
    desc: 'rentTips',
    imgname: rentImage,
    tips: 'tipsDescription',
    action: () => {
      auth.setLeaseType('rent');
      Actions.push('rent');
    },
  },
  {
    key: 'lease',
    desc: 'leaseTime',
    imgname: leaseImage,
    action: () => {
      auth.setLeaseType('lease');
      Actions.push('home');
    },
  },
];
export const DEFAULT_ACTION = 'src/LeaseTypeScene/DEFAULT_ACTION';
