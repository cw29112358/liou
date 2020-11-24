import variables from 'platform';

const {
  deviceWidth,
  isPad,
  isIOS,
  smallScreen,
} = variables;

const partDivider = smallScreen ? 30 : 74.5;

const sedanPadLeft = isPad ? deviceWidth / 3 + 50 : 50;
const vanPadLeft = isPad ? deviceWidth / 2 + 50 : 60;
const truckPadLeft = isPad ? deviceWidth - 150 : 80;
const allPadLeft = isPad ? deviceWidth : 80;

export default {
  deviceWidth,
  isPad,
  isIOS,
  itemOffset: isIOS ? (Math.floor(deviceWidth * 4 / 5) - (isPad ? 15 : 5)) : Math.floor(deviceWidth - 30),
  containerView: {
    flexDirection: 'row',
    paddingTop: isPad ? 94.5 : partDivider,
  },

  imagesView: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 50,
  },
  typeImages: {
    suv: {
      marginLeft: isPad ? 120 : 30,
      marginRight: 50,
      top: 40,
    },
    sedan: {
      marginLeft: isIOS ? sedanPadLeft : 110,
      marginRight: 50,
      marginTop: 50,
    },
    van: {
      marginLeft: isIOS ? vanPadLeft : 180,
      marginRight: 50,
      marginTop: 30,
    },
    truck: {
      marginLeft: isIOS ? truckPadLeft : 250,
      marginRight: 50,
      marginTop: 20,
    },
    all: {
      marginLeft: isIOS ? allPadLeft : 300,
      marginRight: 50,
    },
  },
  image: {
    width: deviceWidth * 3 / 4,
  },
  nextImage: {
    marginLeft: isPad ? 200 : 0,
  },
  prevImage: {
    marginLeft: isPad ? -200 : -50,
  },
};
