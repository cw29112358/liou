import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  content: {
    height: 68.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: getPadSize(12, 1.2),
    color: commonColor.darkGrey,
    marginHorizontal: getPadSize(16, 1.2),
  },
  seperator: {
    width: 32,
    height: 0.5,
    backgroundColor: commonColor.darkGrey,
  },
};
