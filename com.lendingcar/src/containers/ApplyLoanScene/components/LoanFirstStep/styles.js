import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  firstStep: {
    paddingHorizontal: getScaleSize(16),
    marginTop: 40,
  },
  firstStepLabel: {
    fontSize: getScaleSize(16),
    color: commonColor.black,
  },
  firstStepNote: {
    marginTop: getScaleSize(4),
    fontSize: getScaleSize(13),
    color: commonColor.darkGrey,
  },
  formTitle: {
    fontSize: getScaleSize(16),
    color: commonColor.black,
    marginTop: 40,
  },
};
