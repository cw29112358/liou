import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  greyBg: {
    paddingVertical: getPadSize(12, 1.2),
    backgroundColor: commonColor.lightGrey,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: getPadSize(16, 1.5),
    minHeight: getPadSize(100, 1.2),
    backgroundColor: commonColor.white,
  },
  textContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textWrapper: {
    flexDirection: 'row',
  },
  monthIncomeText: {
    marginTop: getPadSize(12, 1.2),
    fontSize: getPadSize(12, 1.2),
    color: commonColor.darkGrey,
  },
  originalPrice: {
    dollarUnit: {
      fontWeight: '600',
      fontSize: getPadSize(20, 1.2),
    },
    priceText: {
      fontWeight: '600',
      fontSize: getPadSize(20, 1.2),
    },
  },
  text: {
    marginLeft: getPadSize(8, 1.2),
    fontSize: getPadSize(13, 1.2),
    height: getPadSize(25, 1.2),
    lineHeight: getPadSize(25, 1.2),
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: getPadSize(12.5, 1.2),
    paddingRight: getPadSize(12.5, 1.2),
    width: getPadSize(100, 1.2),
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: commonColor.normalBlue,
  },
  buttonText: {
    fontSize: getPadSize(14, 1.2),
  },
};
