import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
  scenePaddingWidth,
} = variables;

export default {
  isIOS,
  content: {
    paddingHorizontal: scenePaddingWidth,
  },
  titleStyle: {
    paddingTop: 20,
    marginBottom: 12,
    fontSize: getPadSize(24, 1.2),
    lineHeight: getPadSize(33.5, 1.2),
  },
  textStyle: {
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(21, 1.2),
    color: commonColor.grey650,
  },
};
