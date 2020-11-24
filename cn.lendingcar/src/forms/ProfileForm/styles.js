import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';
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
        width: getPadSize(130),
        height: getPadSize(130),
      },
    }),
};
