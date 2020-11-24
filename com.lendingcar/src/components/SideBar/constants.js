import { Actions } from 'react-native-router-flux';
import variables from 'platform';

import RefIdModal from 'containers/AgentScene/components/RefIdModal';

import tripImage from './assets/tripImage.png';
import driverImage from './assets/driverImage.png';
import FavouriteImage from './assets/favouriteImage.png';
import settingImage from './assets/settingImage.png';
import AgentImage from './assets/agentImage.png';
import refIdImage from './assets/refIdImage.png';
import cardPackageImage from './assets/cardPackageImage.png';

const { isPad } = variables;

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
    textStyle: {
      fontSize: isPad ? 24 : 17,
    },
    iconName: tripImage,
  },
  {
    label: 'driver',
    action: () => Actions.push('driver'),
    imageStyle: {
      width: isPad ? 28 : 20,
      height: isPad ? 28 : 20,
      marginRight: 12,
    },
    textStyle: {
      fontSize: isPad ? 24 : 17,
    },
    iconName: driverImage,
  },
  {
    label: 'favourite',
    action: () => Actions.push('favouriteCar'),
    imageStyle: {
      width: isPad ? 28 : 20,
      height: isPad ? 28 : 20,
      marginRight: 12,
    },
    textStyle: {
      fontSize: isPad ? 24 : 17,
    },
    iconName: FavouriteImage,
  },
  {
    label: 'card',
    action: () => Actions.push('cardPackage'),
    imageStyle: {
      width: isPad ? 28 : 20,
      height: isPad ? 24 : 16,
      marginRight: 12,
    },
    textStyle: {
      fontSize: isPad ? 24 : 17,
    },
    iconName: cardPackageImage,
  },
  //  SIDE_LINK.splice(4, 1) 保证agent是数组的第四个元素
  {
    label: 'agent',
    action: () => Actions.push('agent'),
    imageStyle: {
      width: isPad ? 28 : 20,
      height: isPad ? 28 : 20,
      marginRight: 12,
    },
    textStyle: {
      fontSize: isPad ? 24 : 17,
    },
    iconName: AgentImage,
  },
  {
    label: 'setting',
    action: () => Actions.push('setting'),
    imageStyle: {
      width: isPad ? 28 : 20,
      height: isPad ? 28 : 20,
      marginRight: 12,
    },
    textStyle: {
      fontSize: isPad ? 24 : 17,
    },
    iconName: settingImage,
  },
];
export const REFID_LINK = {
  label: 'refId',
  action: () => Actions.modal({
    component: RefIdModal,
  }),
  itemStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    marginLeft: 0,
    width: '100%',
  },
  imageStyle: {
    width: isPad ? 28 : 20,
    height: isPad ? 28 : 20,
    marginBottom: 8,
  },
  textStyle: {
    fontSize: isPad ? 24 : 16,
  },
  iconName: refIdImage,
};
