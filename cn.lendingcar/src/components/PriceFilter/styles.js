import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingLeft: getPadSize(16, 1.2),
    paddingBottom: 8,
  },
  leftLabel: {
    fontWeight: '600',
    fontSize: getPadSize(24, 1.2),
    color: commonColor.brand,
  },
  rightLabel: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.pureBlack,
  },
};
