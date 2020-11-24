import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  // modal
  headTitle: {
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
  },
  contentText: {
    marginTop: getPadSize(15, 1.2),
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(21, 1.2),
    color: commonColor.grey650,
  },
};
