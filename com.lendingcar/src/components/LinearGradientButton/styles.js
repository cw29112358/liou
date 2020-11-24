import * as commonColor from 'commonColor';
import variables from 'platform';

const { deviceWidth } = variables;

export default {
  gradientColors: [commonColor.normalBlue, commonColor.brand],
  linearGradient: {
    borderRadius: deviceWidth / 2,
    backgroundColor: commonColor.transparent,
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonCircle: {
    width: deviceWidth / 2,
    marginTop: 0,
    borderRadius: deviceWidth / 2,
    backgroundColor: commonColor.transparent,
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  disabledButton: {
    backgroundColor: commonColor.greyLight,
    shadowOpacity: 0,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 15,
    color: commonColor.white,
  },
  brandShadow: {
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
};
