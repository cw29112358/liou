import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import formStyles from 'forms/styles';

const {
  deviceWidth,
  minHeight,
} = variables;
const {
  brandShadow,
  submitPosition,
  linearProps,
  linearButton,
  linearButtonText,
} = formStyles;

export default {
  submitPosition: {
    ...submitPosition,
    left: (deviceWidth - 275) / 2,
    bottom: 60,
  },
  linearProps,
  linearButton: {
    ...linearButton,
    width: 275,
  },
  linearButtonText,
  brandShadow: {
    ...brandShadow,
    backgroundColor: commonColor.black,
    shadowColor: commonColor.shadowColorBlack,
  },

  backgroundImage: {
    flex: 1,
  },
  container: {
    backgroundColor: commonColor.transparent,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 54,
    height: minHeight,
  },

  titleText: {
    marginTop: 10,
    fontSize: getPadSize(32),
  },

  enjoyCircleView: {
    flexDirection: 'row',
    marginTop: 28,
    marginBottom: 12,
  },
  enjoyCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    width: 31,
    height: 31,
    borderRadius: 31,
    backgroundColor: commonColor.black,
  },
  enjoyText: {
    fontSize: getPadSize(16),
    color: commonColor.brownGlod,
  },

  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 223,
    height: 97.5,
    borderRadius: 6,
    backgroundColor: commonColor.black,
  },
  lineGlod: {
    marginVertical: 13,
    width: 166.5,
    height: 0.5,
    backgroundColor: commonColor.brownGlod,
  },
  lineBlack: {
    marginTop: 35.5,
    marginBottom: 23,
    width: 35,
    height: 2,
    backgroundColor: commonColor.black,
  },

  tipText: {
    marginVertical: 5,
    fontSize: getPadSize(14),
  },
};
