// import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  specificRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specificText: {
    fontSize: getScaleSize(14),
    marginLeft: 6,
  },
  specificImage: {
    width: getScaleSize(17),
    height: getScaleSize(15),
    marginTop: 3,
  },
};
