import * as commonColor from 'commonColor';
import variables from 'platform';

import { objectMerge } from 'utils/helpers';
import settingStyles from 'containers/SettingScene/styles';

const {
  isIOS,
} = variables;

export default {
  ...objectMerge(settingStyles,
    {
      titleStyle: {
        paddingTop: 20,
        marginBottom: 12,
        fontSize: 24,
        lineHeight: 33.5,
      },
      headerContainer: {
        borderBottomWidth: isIOS ? 0 : 0.5,
      },
      textStyle: {
        fontSize: 14,
        lineHeight: 21,
        color: commonColor.grey650,
      },
    }),
};
