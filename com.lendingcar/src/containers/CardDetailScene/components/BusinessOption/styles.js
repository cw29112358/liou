import * as commonColor from 'commonColor';
import { getScaleSize } from 'utils/helpers';

export default {
  buttonView: {
    marginVertical: 20,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 0,
    borderWidth: 0,
    borderRightWidth: 0.5,
    borderRightColor: commonColor.greyLight,
    height: 60,
  },
  labelText: {
    fontWeight: '600',
    fontSize: getScaleSize(12),
    color: commonColor.black,
  },
  valueText: {
    fontSize: getScaleSize(16),
    color: commonColor.greenA700,
  },
};
