import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  deviceWidth,
  deviceHeight,
} = variables;

export default {
  loanSuccessContent: {
    height: deviceHeight * 2 / 3,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkout: {
    width: getScaleSize(90),
    height: getScaleSize(90),
    marginBottom: 20,
  },
  buttonView: {
    position: 'absolute',
    width: deviceWidth,
    bottom: 0,
  },
  button: {
    width: deviceWidth - 80,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: getScaleSize(16),
  },
  loanSuccessMessageText: {
    textAlign: 'center',
    fontSize: getScaleSize(16),
    lineHeight: getScaleSize(20),
    color: commonColor.black,
  },
};
