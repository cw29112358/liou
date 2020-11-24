import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

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
    width: getScaleSize(30),
    height: getScaleSize(53),
  },
  discountText: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: getScaleSize(9),
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
    fontSize: getScaleSize(16),
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
      fontSize: getScaleSize(11),
      color: commonColor.grey500,
    },
    priceText: {
      fontSize: getScaleSize(12),
      color: commonColor.grey500,
    },
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 24,
    marginBottom: 33.5,
    marginLeft: -4,
  },
  activityPrice: {
    marginBottom: 15,
  },
  priceStyle: {
    dollarUnit: {
      fontSize: getScaleSize(24),
      color: commonColor.pureBlack,
    },
    priceText: {
      fontSize: getScaleSize(32),
      color: commonColor.pureBlack,
    },
  },
  deluxePriceStyle: {
    dollarUnit: {
      fontSize: getScaleSize(24),
      color: commonColor.membeYellow,
    },
    priceText: {
      fontSize: getScaleSize(32),
      color: commonColor.membeYellow,
    },
  },
  decorateImage: {
    marginBottom: 9,
    width: 134,
    height: 9,
  },
  memberText: {
    fontSize: getScaleSize(12),
    color: commonColor.grey600,
  },

  activityText: {
    fontSize: 10,
    color: commonColor.membeYellow,
    marginBottom: 4,
  },
  activityEnd: {
    fontSize: getScaleSize(12),
    color: commonColor.membeYellow,
  },
  activitySaveNote: {
    fontSize: getScaleSize(12),
    color: commonColor.grey750,
  },
  activitySaveNoteDelux: {
    color: commonColor.membeYellow,
  },
};
