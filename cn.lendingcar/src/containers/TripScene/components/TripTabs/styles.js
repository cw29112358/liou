import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';

export default {
  tabContainer: {
    height: getPadSize(45),
  },
  button: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: getPadSize(14),
    color: commonColor.grey650,
  },
  activeText: {
    fontSize: getPadSize(16),
    color: commonColor.black,
  },
};
