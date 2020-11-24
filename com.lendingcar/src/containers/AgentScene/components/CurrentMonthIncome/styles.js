import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  greyBg: {
    paddingVertical: 12,
    backgroundColor: commonColor.lightGrey,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: getScaleSize(16),
    minHeight: 100,
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
    marginTop: 12,
    fontSize: 12,
    color: commonColor.darkGrey,
  },
  originalPrice: {
    dollarUnit: {
      fontWeight: '600',
      fontSize: 20,
    },
    priceText: {
      fontWeight: '600',
      fontSize: 20,
    },
  },
  text: {
    marginLeft: 8,
    fontSize: 13,
    height: 25,
    lineHeight: 25,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 12.5,
    paddingRight: 12.5,
    width: 100,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: commonColor.normalBlue,
  },
  buttonText: {
    fontSize: 14,
  },
};
