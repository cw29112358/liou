import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  content: {
    marginTop: 20,
    paddingHorizontal: getPadSize(16),
  },
  carInfoTitle: {
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
    fontWeight: '600',
  },
  text: {
    marginLeft: 4,
    marginRight: 20,
    fontSize: getPadSize(12, 1.2),
    color: commonColor.grey650,
  },
  icon: {
    width: getPadSize(12, 1.2),
    height: getPadSize(12, 1.2),
  },
  iconCar: {
    width: getPadSize(15, 1.2),
    height: getPadSize(15, 1.2),
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

  priceStyle: {
    priceText: {
      marginTop: 12,
      fontSize: getPadSize(24, 1.2),
      color: commonColor.brand,
    },
    dollarUnit: {
      fontSize: getPadSize(16, 1.2),
      color: commonColor.brand,
    },
  },
};
