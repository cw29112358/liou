import variables from 'platform';
import * as commonColor from 'commonColor';

const {
  deviceHeight,
  deviceWidth,
  isPad,
  isIOS,
} = variables;

const cardWidth = deviceWidth * 2 / 3 + 25;
const cardHeight = isIOS ? 310 : 320;

export default {
  deviceWidth,
  deviceHeight,
  isPad,
  isIOS,
  itemOffset: isIOS ? (Math.floor(deviceWidth * 4 / 5) - 5) : Math.floor(deviceWidth * 4 / 5) - 5,
  cardHeight: isPad ? 369 : cardHeight,
  containerView: {
    paddingTop: isPad ? 15 : 10,
  },
  contentView: {
    flexDirection: 'row',
  },
  // cardView
  cardView: {
    marginLeft: 20,
    width: isPad ? deviceWidth * 6 / 7 - 60 : cardWidth,
    height: isPad ? 400 : cardHeight,
    backgroundColor: commonColor.white,
    borderRadius: 12,
  },
  firstCard: {
    marginLeft: 50,
  },
  lastCard: {
  },
  itemStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 24,
    paddingBottom: 18.5,
    width: '100%',
    height: '100%',
  },
  carTitle: {
    fontSize: 20,
    lineHeight: 28,
  },

  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    paddingLeft: 12.5,
    paddingRight: 12.5,
    width: 180,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: commonColor.normalBlue,
  },

  dotWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 48,
  },
  dot: {
    marginRight: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: commonColor.greyEB,
  },
  dotActiveStyle: {
    width: 25,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: commonColor.normalBlue,
  },

  image: {
    marginTop: 15,
    width: 250,
    height: 165,
  },

  noteView: {
    position: 'absolute',
    width: deviceWidth,
    alignItems: 'center',
    bottom: 24,
  },
  noteText: {
    fontSize: 14,
    color: commonColor.white,
  },
};
