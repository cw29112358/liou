import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  deviceWidth,
  isPad,
  isIOS,
  smallScreen,
  softMenuBarHeight,
} = variables;

const cardWidth = isIOS ? deviceWidth * 2 / 3 + 46 : deviceWidth - 30;
const firstCardWidth = isIOS ? deviceWidth * 2 / 3 + 62 : deviceWidth - 10;
const lastCardWidth = isIOS ? deviceWidth * 2 / 3 + 25 : deviceWidth - 15;

const iPadLeft = isPad ? 115 : 46;
const firstiPadLeft = isPad ? 145 : 62;
const lastiPadLeft = isPad ? 120 : 62;
const smallCardHeight = smallScreen ? 320 - softMenuBarHeight : 320;
const cardHeight = isIOS ? 310 : smallCardHeight;

export default {
  isPad,
  isIOS,

  cardView: {
    width: isPad ? deviceWidth * 6 / 7 - 60 : cardWidth,
    height: isPad ? 555 : cardHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: commonColor.white,
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  firstItem: {
    marginLeft: isIOS ? firstiPadLeft : 10,
  },
  lastItem: {
    marginLeft: isIOS ? lastiPadLeft : -40,
  },

  backgroundImage: {
    width: isPad ? deviceWidth * 3 / 4 - 100 : deviceWidth * 2 / 3,
    height: isPad ? 555 : cardHeight,
  },
  introduction: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  typeText: {
    marginBottom: 8,
    fontSize: getScaleSize(24),
    fontWeight: '700',
    color: commonColor.black,
  },
  sizeText: {
    fontSize: getScaleSize(16),
    fontWeight: '600',
    color: commonColor.black,
  },
  unit: {
    fontSize: getScaleSize(16),
    color: commonColor.black2A,
  },
};
