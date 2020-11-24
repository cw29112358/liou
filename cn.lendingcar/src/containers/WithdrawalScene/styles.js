import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  scenePaddingWidth,
} = variables;

export default {
  contentContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  questionIcon: {
    marginRight: scenePaddingWidth,
    fontSize: getPadSize(14),
    lineHeight: getPadSize(14),
    color: commonColor.grey650,
  },

  ruleTitle: {
    fontWeight: '600',
    fontSize: getPadSize(20, 1.2),
    lineHeight: getPadSize(28, 1.2),
    color: commonColor.black,
  },
  ruleText: {
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(21, 1.2),
    color: commonColor.grey650,
  },
  tel: {
    color: commonColor.normalBlue,
  },
};
