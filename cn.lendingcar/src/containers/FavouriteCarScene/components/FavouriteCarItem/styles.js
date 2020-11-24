import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';
const {
  isIOS,
  isPad,
} = variables;

export default {
  listItem: {
    marginTop: getPadSize(12, 1.5),
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  touchableHighlightStyle: {
    backgroundColor: commonColor.grey200,
  },
  listItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkBox: {
    marginRight: 26,
  },
  unCheckBox: {
    borderColor: commonColor.greyLight,
  },
  listItemContent: {
    flexDirection: 'row',
    paddingTop: getPadSize(20, 1.2),
    paddingBottom: getPadSize(20, 1.5),
    width: '100%',
    borderRadius: 6,
    backgroundColor: commonColor.white,
  },
  image: {
    marginRight: isPad ? 10 : 0,
    width: getPadSize(120, 1.2),
    height: getPadSize(90, 1.2),
  },
  carTitle: {
    marginBottom: getPadSize(8, 1.2),
    fontSize: getPadSize(16, 1.2),
    lineHeight: getPadSize(22.5, 1.2),
    color: commonColor.black,
  },
  mileage: {
    flexDirection: 'row',
  },
  greyText: {
    marginBottom: getPadSize(8, 1.2),
    fontSize: getPadSize(12, 1.2),
    lineHeight: getPadSize(16.5, 1.2),
    color: commonColor.darkGrey,
  },
  priceStyle: {
    fontSize: getPadSize(13, 1.2),
    lineHeight: isIOS ? getPadSize(18.5, 1.2) : getPadSize(20, 1.2),
    color: commonColor.grey650,
  },
  dollarStyle: {
    priceText: {
      fontSize: getPadSize(20, 1.2),
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: getPadSize(14, 1.2),
      color: commonColor.brand,
    },
  },
};
