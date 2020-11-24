import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  isIOS,
  deviceWidth,
} = variables;

export default {
  isIOS,
  contentContainer: {
    justifyContent: 'center',
  },
  content: {
    backgroundColor: commonColor.white,
  },

  // renderWarningView
  warningView: {
    paddingHorizontal: 16,
    paddingVertical: isPad ? 18 : 9,
    backgroundColor: commonColor.lightYellow,
  },
  warningText: {
    fontSize: isPad ? 16 : 12,
    textAlign: 'center',
    color: commonColor.errorRed,
  },

  // renderStepView
  stepView: {
    flexDirection: 'row',
    backgroundColor: commonColor.white,
  },
  item: {
  },
  itemImage: {
    width: deviceWidth / 4 + 10,
    height: (deviceWidth / 4 + 10) * (90 / 204),
    marginLeft: -8,
  },
  firstImage: {
    marginLeft: 0,
  },
  lastImage: {
    width: deviceWidth / 4 + 10,
    height: (deviceWidth / 4 + 10) * (90 / 184) - (isPad ? 10 : 5),
    marginLeft: -13,
  },
  labelView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingHorizontal: isPad ? 20 : 0,
    backgroundColor: commonColor.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastLabelView: {
    marginLeft: -5,
  },
  itemText: {
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.white,
    textAlign: 'center',
  },

  // renderFirstStep
  stepContent: {
    paddingHorizontal: isPad ? 24 : 16,
    marginTop: 40,
  },

  // renderPayMentCard
  payMentCard: {
    width: isPad ? '70%' : '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
    elevation: 1,
  },
  // renderPayMentCardItem
  cardItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardItemLabel: {
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.black,
    marginBottom: 8,
  },
  priceStyle: {
    dollarUnit: {
      fontSize: isPad ? 36 : 24,
      color: commonColor.black,
    },
    priceText: {
      fontSize: isPad ? 36 : 24,
      color: commonColor.black,
    },
  },
  cardItemNote: {
    marginTop: 8,
    fontSize: isPad ? 19.5 : 13,
    color: commonColor.darkGrey,
  },
};
