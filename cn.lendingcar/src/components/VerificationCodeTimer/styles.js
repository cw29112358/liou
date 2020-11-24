import { getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  button: {
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    width: getPadSize(106),
    height: isPad ? 60 : 44,
    borderRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  disableButton: {
    backgroundColor: commonColor.greyer,
  },
  buttonText: {
    fontSize: getPadSize(13),
    color: commonColor.white,
  },
};
