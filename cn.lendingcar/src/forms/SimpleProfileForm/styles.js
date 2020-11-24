import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';

export default {
  ...objectMerge(formWithLabel,
    {
      avatarItem: {
        marginTop: 40,
        paddingBottom: 10,
        width: '100%',
        justifyContent: 'center',
      },
      avatarStyle: {
        width: 70,
        height: 70,
      },
      nameStyle: {
        fontWeight: '600',
        fontSize: getPadSize(16),
        color: commonColor.white,
      },

      item48: {
        marginTop: 24,
      },
      item100: {
        marginTop: 24,
      },
      inputStyle: {
        color: commonColor.white,
        textAlign: 'center',
      },

      // button
      buttonView: {
        marginTop: 50,
        justifyContent: 'center',
      },
      button: {
        justifyContent: 'center',
        width: 160,
        height: 44,
        borderRadius: 22,
      },
      buttonText: {
        fontSize: getPadSize(16),
        color: commonColor.white,
      },
    }),
};
