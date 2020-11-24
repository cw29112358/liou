import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';
import variables from 'platform';

import FAQStyles from 'containers/FaqScene/styles';


const {
  deviceWidth,
} = variables;

export default {
  ...objectMerge(FAQStyles,
    {
      title: {
        marginBottom: 12,
      },
      titleDescribe: {
        marginBottom: 40,
      },
      subTitle: {
        fontSize: getPadSize(16, 1.2),
        color: commonColor.black,
        marginBottom: 12,
        fontWeight: '600',
      },
      image: {
        width: deviceWidth - 32,
        height: 130,
        marginBottom: 32,
      },
      thirdTitle: {
        color: commonColor.grey650,
      },
    }),
};
