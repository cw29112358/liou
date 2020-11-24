// import moment from 'moment';
// import carInfo from './assets/carcarousel.png';
import carInfo1 from './assets/carcarousel-one.png';
import carInfo2 from './assets/carcarousel-two.png';
import carInfo3 from './assets/carcarousel-three.png';

export const LENDING_LOAD = 'app/LandingPage/LENDING_LOAD';
export const LENDING_LOAD_CARS = 'app/LandingPage/LENDING_LOAD_CARS';
export const LENDING_LOAD_FAIL = 'app/LandingPage/LENDING_LOAD_FAIL';

export const LOCATIONS = {
  label: 'Location',
  defaultValue: 'bayArea',
  options: [
    { label: 'SF Bay Area', value: 'bayArea' },
    { label: 'Los Angeles', value: 'losAngeles', unSelect: true },
    { label: 'New York', value: 'newYork', unSelect: true },
  ],
};

export const PASSENGERS = {
  label: 'Passengers',
  defaultValue: 1,
  options: [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 11, value: 11 },
    { label: 12, value: 12 },
  ],
};

export const DATE = {
  label: 'Date',
  defaultValue: [],
};

export const CAR_INFO = [
  {
    image: carInfo1,
    make: 'Toyota',
    model: 'Camry',
    year: '2016',
    leasePrice: '$26/day',
    id: 'rGCatvcPCxtacrt2Fku6iBi5fjU5CAtbuY',
  },
  {
    image: carInfo2,
    make: 'Land Rover',
    model: 'LR4',
    year: '2013',
    leasePrice: '$51/day',
    id: '13uWsWHvswixUdI7C8HjIxsnI0iQigUYIx',
  },
  {
    image: carInfo3,
    make: 'Mercedes',
    model: 'E Class',
    year: '2006',
    leasePrice: '$12/day',
    id: '9YheIvC8igtafRI3SDfeI9sVtlH5HaUycY',
  },
];

export const CARDS = [
  {
    title: 'leftCardTitle',
    message: 'leftCardDescribe',
  },
  {
    title: 'centerCardTitle',
    message: 'centerCardDescribe',
  },
  {
    title: 'rightCardTitle',
    message: 'rightCardDescribe',
  },
];


export const COMPARE_CONTENT = [
  {
    lendingCar: {
      title: 'downPaymentLendingTitle',
      feture: 'downPaymentLendingFeture',
    },
    general: {
      title: 'downPaymentGeneralTitle',
      feture: 'downPaymentGeneralFeture',
    },
  },
  {
    lendingCar: {
      title: 'flexibilityLendingTitle',
      feture: 'flexibilityLendingFeture',
    },
    general: {
      title: 'flexibilityGeneralTitle',
      feture: 'flexibilityGeneralFeture',
    },
  },
  {
    lendingCar: {
      title: 'feeLendingTitle',
      feture: 'feeLendingFeture',
    },
    general: {
      title: 'feeGeneralTitle',
      feture: 'feeGeneralFeture',
    },
  },
  {
    lendingCar: {
      title: 'depreciationLendingTitle',
      feture: 'depreciationLendingFeture',
    },
    general: {
      title: 'depreciationGeneralTitle',
      feture: 'depreciationGeneralFeture',
    },
  },
];
