import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';

export default {
  ...objectMerge(formWithLabel,
    {
      rightButton: {
        backgroundColor: 'transparent',
      },
      rightText: {
        color: commonColor.brand,
      },
      avatarStyle: {
        width: 130,
        height: 130,
      },
      compositeLayoutStyle: {
        flexDirection: 'row',
        marginBottom: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        shadowOpacity: 0,
      },
    }),
};
