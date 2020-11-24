import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';

export default {
  title: {
    fontWeight: '600',
    fontSize: getPadSize(20, 1.2),
    color: commonColor.black,
    marginBottom: 7.5,
  },
  tip: {
    fontSize: getPadSize(14, 1.2),
    lineHeight: getPadSize(21, 1.2),
    color: commonColor.grey650,
    marginBottom: 40,
  },
};
