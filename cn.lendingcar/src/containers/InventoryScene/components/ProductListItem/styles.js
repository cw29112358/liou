import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  item: {
    flexDirection: 'row',
    justifyContent: isPad ? 'center' : 'space-between',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 16,
    paddingLeft: 0,
    paddingTop: 0,
    height: isPad ? 228.5 : 165.5,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  image: {
    transform: [{
      translateY: isPad ? 0 : -10,
    }],
    marginRight: isPad ? 73 : 0,
    width: isPad ? 252 : 140,
    height: isPad ? 189 : 105,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  // item row1
  blackText: {
    fontWeight: '600',
    fontSize: getPadSize(16, 19, true),
    lineHeight: getPadSize(22.5, 26.5, true),
    color: commonColor.black,
  },
  // item row2
  greyText: {
    fontSize: getPadSize(12, 16, true),
    lineHeight: getPadSize(16.5, 22.5, true),
    color: commonColor.darkGrey,
  },
  // item row3
  priceRow: {
    alignItems: 'flex-end',
  },
  priceStyle: {
    priceText: {
      fontSize: getPadSize(32, 38.4, true),
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: getPadSize(24, 29, true),
      color: commonColor.brand,
    },
  },
  startPay: {
    marginLeft: 8,
    marginBottom: getPadSize(6.5),
    fontSize: getPadSize(13, 16, true),
    color: commonColor.grey650,
  },
  // item row4
  brandBgView: {
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 6.5,
    paddingVertical: 2,
  },
  brandBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: commonColor.brand,
    opacity: 0.1,
    borderRadius: 3,
  },
  brandBgText: {
    fontSize: getPadSize(12, 14, true),
    lineHeight: getPadSize(16),
    color: commonColor.brand,
  },
};
