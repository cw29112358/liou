import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

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
  contenDeluxe: {
    borderColor: commonColor.membeYellow,
    borderWidth: 1,
    backgroundColor: commonColor.black,
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
    fontSize: getPadSize(16),
    color: commonColor.grey600,
  },
  deluxeText: {
    color: commonColor.membeYellow,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 24,
    marginBottom: 33.5,
    marginLeft: -4,
  },
  deluxePriceStyle: {
    dollarUnit: {
      fontSize: getPadSize(24),
      color: commonColor.membeYellow,
    },
    priceText: {
      fontSize: getPadSize(32),
      color: commonColor.membeYellow,
    },
  },
  decorateImage: {
    marginBottom: 9,
    width: 134,
    height: 9,
  },
};
