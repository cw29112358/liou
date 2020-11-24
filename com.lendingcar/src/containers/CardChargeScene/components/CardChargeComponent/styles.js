import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  isPad,
} = variables;
export default {
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
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

  // renderImageBackground
  discountImage: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: getScaleSize(31),
    height: getScaleSize(53),
  },
  discountText: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: getScaleSize(9),
    lineHeight: 14,
  },

  priceView: {
    marginTop: 30,
    marginBottom: 24,
  },
  amountText: {
    textAlign: 'center',
  },
  chargeText: {
    fontSize: getScaleSize(16),
  },

  decorateImage: {
    marginBottom: 9,
    width: 134,
    height: 9,
  },

  priceStyle: {
    priceText: {
      fontSize: getScaleSize(30),
      fontWeight: '500',
      textAlign: 'center',
      color: commonColor.black,
      marginBottom: 5,
    },
    dollarUnit: {
      textAlign: 'center',
      fontSize: getScaleSize(24),
    },
  },
};
