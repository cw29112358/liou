import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  deviceHeight,
  headerHeight,
  deviceWidth,
  isPad,
} = variables;

export default {
  content: {
    minHeight: deviceHeight - headerHeight,
    justifyContent: 'flex-start',
  },
  containerWhiteView: {
    backgroundColor: commonColor.white,
  },
  containerYellowView: {
    backgroundColor: commonColor.membeYellow,
  },

  formContainer: {
    paddingHorizontal: getScaleSize(16),
    marginTop: 40,
  },

  resultText: {
    marginTop: 5,
    marginBottom: 44,
    width: deviceWidth / 2,
    fontSize: 14,
    textAlign: 'center',
    color: commonColor.black,
  },
  resultBottomLine: {
    paddingBottom: 32,
    marginBottom: isPad ? 172.5 : 82.5,
  },
};
