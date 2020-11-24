import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;
export default {
  content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 11,
    paddingBottom: 11,
    width: isPad ? 580 : 275,
    height: isPad ? 369 : 175,
    backgroundColor: commonColor.white,
    borderRadius: 12,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 0.5,
    borderColor: commonColor.grey350,
  },
  contentPermium: {
    backgroundColor: commonColor.silvery,
  },
  contenDeluxe: {
    borderColor: commonColor.membeYellow,
    borderWidth: 1,
    backgroundColor: commonColor.black,
  },
  discountImage: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: isPad ? 45 : 30,
    height: isPad ? 79.5 : 53,
  },
  discountText: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: isPad ? 14 : 9,
    lineHeight: 14,
  },
  // title
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: 8,
    height: 8,
  },
  title: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: isPad ? 24 : 16,
    color: commonColor.grey600,
  },
  deluxeText: {
    color: commonColor.membeYellow,
  },
  // price
  originalPriceText: {
    paddingLeft: 9,
    paddingBottom: 5,
    textDecorationLine: 'line-through',
  },
  originalPrice: {
    dollarUnit: {
      fontSize: isPad ? 16 : 11,
      color: commonColor.grey400,
    },
    priceText: {
      fontSize: isPad ? 18 : 12,
      color: commonColor.grey400,
    },
  },
  originalPriceDeluxe: {
    dollarUnit: {
      fontSize: isPad ? 16 : 11,
      color: commonColor.membeYellow,
    },
    priceText: {
      fontSize: isPad ? 18 : 12,
      color: commonColor.membeYellow,
    },
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 24,
    marginBottom: 33.5,
    marginLeft: -4,
  },
  priceStyle: {
    dollarUnit: {
      fontSize: isPad ? 36 : 24,
      color: commonColor.pureBlack,
    },
    priceText: {
      fontSize: isPad ? 48 : 32,
      color: commonColor.pureBlack,
    },
  },
  deluxePriceStyle: {
    dollarUnit: {
      fontSize: isPad ? 36 : 24,
      color: commonColor.membeYellow,
    },
    priceText: {
      fontSize: isPad ? 48 : 32,
      color: commonColor.membeYellow,
    },
  },
  decorateImage: {
    marginBottom: 9,
    width: 134,
    height: 9,
  },
  memberText: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.grey600,
  },
};
