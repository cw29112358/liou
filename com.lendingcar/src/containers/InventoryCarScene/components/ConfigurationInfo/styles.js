import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  content: {
    marginTop: 20,
    paddingHorizontal: isPad ? 24 : 16,
  },
  carInfoTitle: {
    fontSize: isPad ? 30 : 20,
    color: commonColor.black,
    fontWeight: '600',
  },
  text: {
    marginLeft: 4,
    marginRight: 20,
    fontSize: isPad ? 18 : 12,
    color: commonColor.grey650,
  },
  icon: {
    width: isPad ? 18 : 12,
    height: isPad ? 18 : 12,
  },
  iconCar: {
    width: isPad ? 22.5 : 15,
    height: isPad ? 22.5 : 15,
  },
  configurationView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  detailContent: {
    paddingLeft: isPad ? 24 : 16,
    paddingRight: isPad ? 24 : 16,
  },
  membershipsNote: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.brownGlod,
  },

  // renderPriceLine
  priceLine: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  valuation: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.grey650,
  },
  priceStyle: {
    priceText: {
      fontSize: isPad ? 22.5 : 15,
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: isPad ? 18 : 12,
      color: commonColor.brand,
    },
  },
  marketPrice: {
    marginLeft: 16,
    fontSize: isPad ? 18 : 12,
    color: commonColor.darkGrey,
  },

  specificRow: {
    paddingTop: 12,
    marginBottom: -4,
  },
};
