import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  deviceWidth,
  scenePaddingWidth,
} = variables;
export default {
  slideLength: deviceWidth - scenePaddingWidth,
  content: {
  },
  detailContent: {
    paddingHorizontal: scenePaddingWidth,
  },

  titleLine: {
    marginBottom: 20,
    paddingHorizontal: scenePaddingWidth,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    height: 22.5,
  },
  horizontalLine: {
    width: 3,
    backgroundColor: commonColor.brand,
    height: 18,
    marginRight: 8,
  },
  title: {
    fontSize: isPad ? 24 : 16,
    color: commonColor.black,
    fontWeight: '600',
  },
  titleNote: {
    marginLeft: 11,
    fontSize: 12,
    color: commonColor.brownGlod,
  },

  membershipsNote: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.brownGlod,
  },

  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    marginBottom: 8,
    borderTopWidth: 0.5,
    borderTopColor: commonColor.greyer,
    paddingTop: 20,
    paddingBottom: 16,
  },
  downPayment: {
    flexDirection: 'column',
    alignItems: 'center',
    width: isPad ? 150 : 100,
  },
  priceStyle: {
    priceText: {
      marginTop: 8,
      fontSize: isPad ? 36 : 24,
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: isPad ? 24 : 16,
      color: commonColor.brand,
    },
  },
  paymentLabel: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.darkGrey,
  },
  currentPercentage: {
    marginTop: 8,
    fontSize: isPad ? 18 : 12,
    color: commonColor.grey650,
  },

  depositView: {
    marginTop: 17,
  },
  depositNote: {
    marginTop: 3,
    fontSize: isPad ? 18 : 12,
    color: commonColor.darkGrey,
  },
  depositPrice: {
    priceText: {
      fontSize: isPad ? 18 : 12,
      color: commonColor.pureBlack,
    },
  },
};
