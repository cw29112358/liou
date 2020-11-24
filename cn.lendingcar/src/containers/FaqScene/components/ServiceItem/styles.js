import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';

import FAQStyles from 'containers/FaqScene/styles';

export default {
  ...objectMerge(FAQStyles,
    {
      subTitle: {
        fontSize: getPadSize(16, 1.2),
        color: commonColor.black,
        marginBottom: 12,
      },
      divider: {
        fontSize: getPadSize(14, 1.2),
        color: commonColor.grey650,
        marginBottom: 32,
      },
      noteText: {
        fontSize: getPadSize(14, 1.2),
        color: commonColor.grey650,
        marginBottom: 12,
      },
      linkText: {
        fontSize: getPadSize(14, 1.2),
        color: commonColor.brand,
        textDecorationLine: 'underline',
      },
    }),
};
