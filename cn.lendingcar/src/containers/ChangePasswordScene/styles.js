import { objectMerge, getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';
import loginStyles from 'forms/LoginForm/styles';

const {
  isPad,
  isIphoneX,
} = variables;

export default {
  ...objectMerge(loginStyles,
    {
      successImageView: {
        alignItems: 'center',
      },
      successImage: {
        marginTop: isPad ? 100 : 0,
        width: getPadSize(90),
        height: getPadSize(90),
      },
      changeSuccess: {
        marginTop: 16,
        fontWeight: '700',
        fontSize: getPadSize(20),
        color: commonColor.white,
      },

      changePasswordTip: {
        position: 'absolute',
        bottom: 191 + (isIphoneX ? 90 : 0) + (isPad ? 120 : 0),
        width: '100%',
        textAlign: 'center',
      },
    }),
};
