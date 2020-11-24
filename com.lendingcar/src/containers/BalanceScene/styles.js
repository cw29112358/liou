import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  contentContainer: {
    height: '100%',
    backgroundColor: commonColor.white,
  },
  viewPadding: {
    paddingTop: 24,
    paddingHorizontal: isPad ? 24 : 16,
  },

  // renderBalanceDetails
  balanceView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceStyle: {
    priceText: {
      fontSize: 40,
      fontWeight: '500',
      color: commonColor.black,
    },
    dollarUnit: {
      fontSize: 24,
    },
  },
  balanceUnit: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18.5,
    color: commonColor.black,
  },
  balanceMoney: {
    fontSize: 13,
    lineHeight: 18.5,
    color: commonColor.normalBlue,
  },
  questionIcon: {
    fontSize: 14,
    color: commonColor.grey650,
  },
  buttonPosition: {
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
    backgroundColor: commonColor.grey,
    shadowColor: commonColor.grey,
  },
  disabledText: {
    color: commonColor.black,
  },
  timesText: {
    fontSize: 12,
    color: commonColor.normalBlue,
  },
  timesExplainText: {
    fontSize: 12,
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
    fontSize: 16,
    color: commonColor.black,
    fontWeight: '700',
  },
  noteText: {
    fontSize: 13,
    color: commonColor.normalBlue,
  },
  arrowIcon: {
    color: commonColor.normalBlue,
    fontSize: 16,
  },
};
