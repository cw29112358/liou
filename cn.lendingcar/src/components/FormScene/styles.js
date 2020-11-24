import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
} = variables;

export default {
  isIOS,
  headerContainer: {
    borderBottomWidth: isIOS ? 0 : 0.5,
  },
  // button
  rightText: {
    fontSize: getPadSize(14, 1.2),
    color: commonColor.brand,
  },
};
