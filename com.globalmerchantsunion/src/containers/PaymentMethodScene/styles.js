import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';

const {
  statusbarHeight,
  deviceWidth,
  deviceHeight,
  headerHeight,
  isPad,
} = variables;

export default {
  contentContainer: {
    alignItems: 'center',
  },
  content: {
    backgroundColor: commonColor.white,
    height: deviceHeight - headerHeight - statusbarHeight,
  },
  // paymentResult
  resultText: {
    marginTop: 5,
    marginBottom: 44,
    width: deviceWidth * 2 / 3 + 10,
    fontSize: 14,
    textAlign: 'center',
    color: commonColor.black,
  },
  resultBottomLine: {
    paddingBottom: 32,
    marginBottom: isPad ? 172.5 : 82.5,
  },

  formStyle: {
    paddingHorizontal: getPadSize(16),
  },
};
