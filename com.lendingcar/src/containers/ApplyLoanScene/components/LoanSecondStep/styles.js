import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  isPad,
  deviceWidth,
} = variables;

export default {
  stepView: {
    paddingHorizontal: getScaleSize(16),
    marginTop: 40,
  },
  stepTitle: {
    fontSize: getScaleSize(16),
    color: commonColor.black,
  },
  stepLabel: {
    fontSize: getScaleSize(16),
    color: commonColor.black,
  },
  stepNote: {
    marginTop: 4,
    fontSize: getScaleSize(13),
    color: commonColor.darkGrey,
  },
  ratesPart: {
    marginBottom: 40,
  },
  ratePercent: {
    fontSize: getScaleSize(32),
    color: commonColor.black,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  ratesNote: {
    fontSize: getScaleSize(13),
    color: commonColor.darkGrey,
    textAlign: 'center',
    marginBottom: 4,
  },
  nextButton: {
    width: deviceWidth - 80,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: isPad ? 76 : 38,
  },
  backButton: {
    width: deviceWidth - 80,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: getScaleSize(16),
  },
  backButtonText: {
    fontSize: getScaleSize(15),
    textAlign: 'center',
    color: commonColor.black,
  },
};
