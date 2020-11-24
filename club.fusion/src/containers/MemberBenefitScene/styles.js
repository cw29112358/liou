import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import formStyles from 'forms/styles';

const {
  isIphoneX,
  deviceWidth,
} = variables;
const {
  brandShadow,
  submitPosition,
  linearProps,
  linearButton,
  linearButtonText,
} = formStyles;

export default {
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  subTitle: {
    marginVertical: isIphoneX ? 35 : 22,
    fontSize: getPadSize(13),
    color: commonColor.black,
  },
  subTitleGold: {
    fontSize: getPadSize(16),
    color: commonColor.brownGlod,
  },

  submitPosition: {
    ...submitPosition,
    left: (deviceWidth - 270) / 2,
    bottom: isIphoneX ? 100 : 60,
  },
  linearProps,
  linearButton: {
    ...linearButton,
    width: 270,
    borderRadius: 40,
  },
  linearButtonText,
  brandShadow,
};
