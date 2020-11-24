import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import { LINEAR_PROPS } from 'utils/constants';
import variables from 'platform';

const {
  isPad,
  scenePaddingWidth,
  isIphoneX,
} = variables;

export default {
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },

  logoImage: {
    width: getPadSize(70),
    height: getPadSize(70),
    marginTop: isIphoneX ? 211 : 105.5,
  },
  logoText: {
    marginTop: 20,
    fontSize: getPadSize(16),
    color: commonColor.white,
  },

  buttonParentView: {
    position: 'absolute',
    bottom: 75,
  },
  buttonView: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: scenePaddingWidth,
  },
  linearProps: {
    ...LINEAR_PROPS,
    linearStyle: {
      borderRadius: 50,
      width: '100%',
    },
  },
  button: {
    borderWidth: 0,
    borderRadius: 50,
    width: '100%',
    height: isPad ? 60 : 40,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: getPadSize(16),
    fontWeight: '600',
    color: commonColor.white,
  },
  logInButton: {

  },
  signButton: {
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: commonColor.brand,
  },
};
