/*
 *
 * InventoryScene constants
 *
 */
import variables from 'platform';

import suvImage from './components/SizeList/assets/suv.png';
import carImage from './components/SizeList/assets/car.png'; // standard
import vanImage from './components/SizeList/assets/van.png';
import truckImage from './components/SizeList/assets/truck.png';
import othersImage from './components/SizeList/assets/others.png';

import color1OtherImage from './components/ColorFilterPart/assets/color1Other.png';
import color2CopperImage from './components/ColorFilterPart/assets/color2Copper.png';
import color3OrangeImage from './components/ColorFilterPart/assets/color3Orange.png';
import color4GoldImage from './components/ColorFilterPart/assets/color4Gold.png';
import color5YellowImage from './components/ColorFilterPart/assets/color5Yellow.png';
import color6BlackImage from './components/ColorFilterPart/assets/color6Black.png';
import color7GrayImage from './components/ColorFilterPart/assets/color7Gray.png';
import color8SilverImage from './components/ColorFilterPart/assets/color8Silver.png';
import color9BeigeImage from './components/ColorFilterPart/assets/color9Beige.png';
import color10WhiteImage from './components/ColorFilterPart/assets/color10White.png';
import color11RedImage from './components/ColorFilterPart/assets/color11Red.png';
import color12BlueImage from './components/ColorFilterPart/assets/color12Blue.png';
import color13GreenImage from './components/ColorFilterPart/assets/color13Green.png';

import allHomeImage from './assets/all.png';
import sedanHomeImage from './assets/sedan.png';
import suvHomeImage from './assets/suv.png';
import truckHomeImage from './assets/truck.png';
import vanHomeImage from './assets/van.png';

const {
  isPad,
} = variables;

// action constants
export const INVENTORY_LOAD = 'src/InventoryScene/INVENTORY_LOAD';
export const INVENTORY_LOAD_SUCCESS = 'src/InventoryScene/INVENTORY_LOAD_SUCCESS';
export const INVENTORY_LOAD_FAIL = 'src/InventoryScene/INVENTORY_LOAD_FAIL';

export const CHANGE_SEARCH = 'src/InventoryScene/CHANGE_SEARCH';
export const CHANGE_SORT = 'src/InventoryScene/CHANGE_SORT';
export const CHANGE_FILTER = 'src/InventoryScene/CHANGE_FILTER';
export const CHANGE_CLEAR = 'src/InventoryScene/CHANGE_CLEAR';

export const HOME_IMAGES = {
  all: allHomeImage,
  sedan: sedanHomeImage,
  suv: suvHomeImage,
  truck: truckHomeImage,
  van: vanHomeImage,
};

// other
export const FILTER_OPTIONS = [
  {
    label: 'price',
    iconName: 'md-arrow-dropdown',
  },
  {
    label: 'type',
    iconName: 'md-arrow-dropdown',
  },
  {
    label: 'year',
    iconName: 'md-arrow-dropdown',
  },
  {
    label: 'more',
    iconName: 'md-arrow-dropdown',
  },
];
export const FILTER_CAR_TYPE_LIST = [
  {
    url: suvImage,
    label: 'suv',
    imageStyle: {
      width: isPad ? 122.5 : 85.5,
      height: isPad ? 48 : 33.5,
    },
  },
  {
    url: carImage,
    label: 'sedan',
    imageStyle: {
      width: isPad ? 121.5 : 85,
      height: isPad ? 41 : 28.5,
    },
  },
  {
    url: vanImage,
    label: 'van',
    imageStyle: {
      width: isPad ? 124.5 : 87,
      height: isPad ? 45 : 31.5,
    },
  },
  {
    url: truckImage,
    label: 'truck',
    imageStyle: {
      width: isPad ? 121.5 : 85,
      height: isPad ? 41.5 : 29,
    },
  },
  {
    url: othersImage,
    label: 'others',
    imageStyle: {
      width: isPad ? 120 : 84,
      height: isPad ? 39.5 : 27.5,
    },
  },
];
export const SORT_FILTER = [
  {
    title: 'price',
    options: [
      {
        label: 'lowToHigh',
        iconName: 'md-arrow-dropup',
      },
      {
        label: 'highToLow',
        iconName: 'md-arrow-dropdown',
      },
    ],
  },
  {
    title: 'year',
    options: [
      {
        label: 'lowToHigh',
        iconName: 'md-arrow-dropup',
      },
      {
        label: 'highToLow',
        iconName: 'md-arrow-dropup',
      },
    ],
  },
];
export const COLOR_ORDER = {
  other: {
    label: 'other',
    value: 'other',
    url: color1OtherImage,
    order: 1,
  },
  black: {
    value: 'black',
    url: color6BlackImage,
    order: 2,
  },
  white: {
    value: 'white',
    url: color10WhiteImage,
    order: 3,
  },
  gray: {
    value: 'gray',
    url: color7GrayImage,
    order: 4,
  },
  silver: {
    value: 'silver',
    url: color8SilverImage,
    order: 5,
  },
  blue: {
    value: 'blue',
    url: color12BlueImage,
    order: 6,
  },
  red: {
    value: 'red',
    url: color11RedImage,
    order: 7,
  },
  beige: {
    value: 'beige',
    url: color9BeigeImage,
    order: 8,
  },
  copper: {
    value: 'copper',
    url: color2CopperImage,
    order: 9,
  },
  orange: {
    value: 'orange',
    url: color3OrangeImage,
    order: 10,
  },
  gold: {
    value: 'gold',
    url: color4GoldImage,
    order: 11,
  },
  yellow: {
    value: 'yellow',
    url: color5YellowImage,
    order: 12,
  },
  green: {
    value: 'green',
    url: color13GreenImage,
    order: 13,
  },
};

export const CAR_TYPE_LIST = ['suv', 'sedan', 'van', 'truck', 'others'];
