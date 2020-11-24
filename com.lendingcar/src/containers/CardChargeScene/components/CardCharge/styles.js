import variables from 'platform';

const {
  deviceHeight,
  deviceWidth,
  isPad,
  isIOS,
} = variables;

const cardWidth = deviceWidth * 2 / 3 + 46;
const firstCardWidth = deviceWidth * 2 / 3 + 75;
const lastCardWidth = isIOS ? deviceWidth * 2 / 3 + 25 : deviceWidth * 2 / 3 + 46;

const iPadLeft = isPad ? 98 : 8;
const firstiPadLeft = isPad ? 145 : 50;
const lastiPadLeft = isPad ? 86 : 16;

const cardHeight = isIOS ? 170 : 180;

export default {
  deviceWidth,
  deviceHeight,
  isPad,
  isIOS,
  itemOffset: isIOS ? (Math.floor(deviceWidth * 4 / 5) - 15) : Math.floor(deviceWidth * 4 / 5) - 5,
  cardHeight: isPad ? 369 : cardHeight,
  containerView: {
    paddingTop: isPad ? 15 : 10,
  },
  contentView: {
    flexDirection: 'row',
    height: isPad ? 369 : cardHeight,
  },
  // cardView
  cardView: {
    width: isPad ? deviceWidth * 6 / 7 - 60 : cardWidth,
    height: isPad ? 400 : cardHeight + 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: isIOS ? 'center' : 'flex-end',
  },
  firstCard: {
    width: isPad ? deviceWidth * 6 / 7 - 25 : firstCardWidth,
  },
  lastCard: {
    width: isPad ? deviceWidth * 6 / 7 - 65 : lastCardWidth,
  },
  // item
  carDetail: {
    marginTop: isIOS ? 0 : 5,
    marginBottom: isIOS ? 0 : 5,
    marginLeft: isIOS ? iPadLeft : 0,
    justifyContent: 'center',
  },
  firstItem: {
    marginLeft: isIOS ? firstiPadLeft : 10,
  },
  lastItem: {
    marginLeft: isIOS ? lastiPadLeft : -40,
  },
};
