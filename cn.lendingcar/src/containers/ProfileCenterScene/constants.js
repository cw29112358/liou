import { Actions } from 'react-native-router-flux';
import variables from 'platform';

import RefIdModal from 'containers/AgentScene/components/RefIdModal';

import agentCodeImage from './assets/agentCode.png';
import favouritesImage from './assets/favourites.png';
import leaseTypeImage from './assets/leasetype.png';
import settingsImage from './assets/settings.png';
import agentImage from './assets/agent.png';
import driverImage from './assets/driver.png';
import orderImage from './assets/order.png';

import styles from './styles';

const { isPad } = variables;

export const MAIN_TAGS = [
  {
    label: 'agent',
    action: () => Actions.push('agent'),
    imageStyle: styles.tagImage,
    textStyle: styles.tagText,
    iconName: agentImage,
  },
  {
    label: 'favourite',
    action: () => Actions.push('favouriteCar'),
    imageStyle: styles.tagImage,
    textStyle: styles.tagText,
    iconName: favouritesImage,
  },
];

export const SIDE_LINKS = [
  {
    label: 'trip',
    action: () => Actions.push('trip'),
    imageStyle: {
      width: isPad ? 21 : 15,
      height: isPad ? 29.4 : 21,
      marginRight: 12,
      marginLeft: isPad ? 4 : 2,
    },
    textStyle: styles.itemText,
    iconName: orderImage,
  },
  {
    label: 'driver',
    action: () => Actions.push('driver'),
    imageStyle: styles.itemImage,
    textStyle: styles.itemText,
    iconName: driverImage,
  },
  {
    label: 'refId',
    action: () => Actions.modal({ component: RefIdModal }),
    imageStyle: styles.itemImage,
    textStyle: styles.itemText,
    iconName: agentCodeImage,
  },
  {
    label: 'setting',
    action: () => Actions.push('setting'),
    imageStyle: styles.itemImage,
    textStyle: styles.itemText,
    iconName: settingsImage,
  },
  {
    label: 'changeLeaseType',
    action: () => Actions.push('leaseType'),
    imageStyle: styles.itemImage,
    textStyle: styles.itemText,
    iconName: leaseTypeImage,
  },
];
