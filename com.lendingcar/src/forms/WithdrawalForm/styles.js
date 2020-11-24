import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';

import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  deviceWidth,
  headerHeight,
} = variables;

export default {
  ...objectMerge(formStyles,
    {
      formView: {
        paddingTop: 20,
        backgroundColor: commonColor.lightGrey,
        height: deviceHeight - headerHeight - statusbarHeight,
      },
      form: {
        paddingBottom: 36.5,
        backgroundColor: commonColor.white,
      },
      greyText: {
        marginTop: 12,
      },
      buttonCircle: {
        position: 'absolute',
        bottom: 63,
        alignSelf: 'center',
        justifyContent: 'center',
        width: deviceWidth * 2 / 3,
        height: 44,
        backgroundColor: commonColor.normalBlue,
        shadowColor: commonColor.shadowColorBlue,
      },
      horizontalItem: {
        itemstyle: {
          height: 50,
        },
        labelStyle: {
          width: 110,
        },
      },
    }),
};
