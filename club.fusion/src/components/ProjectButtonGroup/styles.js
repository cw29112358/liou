import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  buttonGroup: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 32,
  },
  button: {
    width: 155,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColor.transparent,
    borderRadius: getPadSize(22),
  },
  linear: {
    borderRadius: getPadSize(22),
  },
};
