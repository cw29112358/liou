import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';

export default {
  button: {
    borderWidth: 0,
    width: '50%',
    height: 49,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: getPadSize(15),
    color: commonColor.white,
  },

  splitLine: {
    position: 'absolute',
    right: 0,
    width: 0.5,
    height: 26,
    backgroundColor: commonColor.white,
  },
  image: {
    marginRight: 6,
    width: 15,
    height: 15,
  },
};
