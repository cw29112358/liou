import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceHeight,
  deviceWidth,
  isPad,
  isIOS,
  bottomDistance,
  isIphoneX,
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
    height: '100%',
  },
  containerWhiteView: {
    backgroundColor: commonColor.white,
  },
  containerYellowView: {
    backgroundColor: commonColor.membeYellow,
  },
  contentView: {
    flexDirection: 'row',
    height: isPad ? 369 : cardHeight,
  },
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
  ribbonImage: {
    position: 'absolute',
    zIndex: -100,
    top: isPad ? 100 : -45,
    left: isPad ? deviceWidth - 600 : deviceWidth - 300,
    width: isPad ? 600 : 300,
  },
  buttonPrivilege: {
    position: 'absolute',
    bottom: isIphoneX ? 50 : bottomDistance,
    alignSelf: 'center',
    width: isPad ? 275 : 235,
    height: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: commonColor.grey750,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonText: {
    width: '100%',
    fontSize: isPad ? 18 : 15,
    lineHeight: isPad ? 54 : 45,
    color: commonColor.membeYellow,
    textAlign: 'center',
  },
};
