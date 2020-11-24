/*
 *
 * SettingScene constants
 *
 */
import DeviceInfo from 'react-native-device-info';

const readableVersion = DeviceInfo.getReadableVersion();

export const SETTING_LIST = [
  {
    key: 'changeLanguage',
    value: 'changeLanguage',
    hasRightIcon: true,
    linkUrl: 'changeLanguage',
  },
  {
    key: 'update',
    value: 'updatePassword',
    hasRightIcon: true,
    linkUrl: 'changePassword',
  },
  {
    key: 'feedBack',
    value: 'feedBack',
    hasRightIcon: true,
    linkUrl: 'feedBack',
  },
  // {
  //   key: 'faq',
  //   value: 'faq',
  //   hasRightIcon: true,
  //   linkUrl: 'faq',
  // },
  {
    key: 'permissions',
    value: 'permissions',
    hasRightIcon: true,
    openSettings: true,
  },
  {
    key: 'version',
    value: 'version',
    hasRightIcon: true,
    hasRightText: true,
    linkUrl: 'version',
    rightText: `V${readableVersion}`,
  },
];
