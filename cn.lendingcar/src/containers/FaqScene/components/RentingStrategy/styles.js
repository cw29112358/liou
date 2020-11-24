import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';
import variables from 'platform';

import FAQStyles from 'containers/FaqScene/styles';

const {
  deviceWidth,
  deviceHeight,
} = variables;

export default {
  ...objectMerge(FAQStyles,
    {
      image: {
        width: deviceWidth - 32,
        height: 1.3 * deviceHeight,
        marginBottom: 32,
      },
      linkText: {
        fontSize: getPadSize(14, 1.2),
        color: commonColor.brand,
        textDecorationLine: 'underline',
      },
      subTitle: {
        fontSize: getPadSize(14, 1.2),
        color: commonColor.grey650,
        marginBottom: 12,
        lineHeight: 21,
        fontWeight: '600',
      },
    }),
};
