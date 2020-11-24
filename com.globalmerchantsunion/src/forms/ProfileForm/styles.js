import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';

export default {
  ...objectMerge(formWithLabel,
    {
      avatarItem: {
        paddingTop: 30,
        paddingBottom: 12,
      },

      showButton: {
        borderWidth: 0,
        width: 'auto',
        height: 35,
        backgroundColor: commonColor.transparent,
      },
      showButtonText: {
        fontSize: getPadSize(13),
        color: commonColor.brand,
      },
      editImage: {
        marginRight: 7.5,
        width: 20,
        height: 19,
      },

      verifyView: {
        marginTop: 60,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      linearShadow: {
        borderRadius: 50,
      },
    }),
};
