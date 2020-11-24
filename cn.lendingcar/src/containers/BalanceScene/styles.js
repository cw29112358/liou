import * as commonColor from 'commonColor';
// import variables from 'platform';
import { getPadSize } from 'utils/helpers';

export default {
  contentContainer: {
    height: '100%',
    backgroundColor: commonColor.white,
  },
  viewPadding: {
    paddingTop: 24,
    paddingHorizontal: getPadSize(16),
  },

  // renderBalanceDetails
  balanceView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceStyle: {
    priceText: {
      fontSize: getPadSize(40, 1.2),
      fontWeight: '500',
      color: commonColor.black,
    },
    dollarUnit: {
      fontSize: getPadSize(24, 1.2),
    },
  },
  balanceUnit: {
    marginTop: 8,
    fontSize: getPadSize(13, 1.2),
    lineHeight: getPadSize(18.5, 1.2),
    color: commonColor.black,
  },
  balanceMoney: {
    fontSize: getPadSize(13, 1.2),
    lineHeight: getPadSize(18.5, 1.2),
    color: commonColor.normalBlue,
  },
  questionIcon: {
    fontSize: getPadSize(14, 1.2),
    color: commonColor.grey650,
  },
  buttonPosition: {
    width: getPadSize(100, 1.2),
    marginTop: 40,
    marginBottom: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: commonColor.normalBlue,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  disabledStyle: {
    backgroundColor: commonColor.greyLight,
    shadowOpacity: 0,
  },
  disabledText: {

    color: commonColor.white,
  },
  timesText: {
    fontSize: getPadSize(12, 1.2),
    color: commonColor.normalBlue,
  },
  timesExplainText: {
    fontSize: getPadSize(12, 1.2),
    color: commonColor.grey650,
  },

  // renderRecodeDetailList
  recodeView: {
    marginTop: 45,
  },
  recodeTitle: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLeft: {
    elevation: 0,
    marginRight: -16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonColor.transparent,
  },
  titleText: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.black,
    fontWeight: '700',
  },
  noteText: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.normalBlue,
  },
  arrowIcon: {
    color: commonColor.normalBlue,
    fontSize: getPadSize(16, 1.2),
  },
};
