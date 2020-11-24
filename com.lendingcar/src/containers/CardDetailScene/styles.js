import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  topView: {
    paddingTop: 20,
    paddingHorizontal: 25,
  },

  chargeButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 15,
    width: 200,
    height: 40,
    backgroundColor: commonColor.greenA700,
  },
  chargeButtonText: {
    fontSize: getScaleSize(14),
    color: commonColor.white,
  },

  description: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: getScaleSize(16),
    color: commonColor.grey650,
  },
};
