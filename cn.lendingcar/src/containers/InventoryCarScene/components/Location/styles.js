import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  content: {
    paddingHorizontal: getPadSize(16),
  },
  titleLine: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  horizontalLine: {
    width: getPadSize(3, 1.2),
    backgroundColor: commonColor.brand,
    height: getPadSize(18, 1.2),
    marginRight: 8,
  },
  title: {
    fontSize: getPadSize(16, 1.2),
    color: commonColor.black,
    fontWeight: '600',
  },

  text: {
    fontSize: getPadSize(13, 1.2),
    color: commonColor.grey650,
    fontWeight: '600',
  },
  linkText: {
    color: commonColor.blue,
  },
};
