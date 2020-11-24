import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

const buttonTop = 15;
const buttonBaseHeight = 40;

export default {
  buttonHeight: buttonTop + buttonBaseHeight,

  buttonGroup: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: buttonTop,
  },
  button: {
    width: 155,
    height: buttonBaseHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColor.transparent,
    borderRadius: getPadSize(22),
  },
  linear: {
    borderRadius: getPadSize(22),
  },
};
