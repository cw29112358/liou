import * as commonColor from 'commonColor';
import { objectMerge, getPadSize } from 'utils/helpers';
import formStyles from 'forms/styles';

import variables from 'platform';

const {
  deviceWidth,
  minHeight,
} = variables;

export default {
  ...objectMerge(formStyles,
    {
      formView: {
        paddingTop: 20,
        backgroundColor: commonColor.lightGrey,
        height: minHeight,
      },
      form: {
        paddingTop: 20.5,
        paddingBottom: 36.5,
        backgroundColor: commonColor.white,
      },
      greyText: {
        marginTop: getPadSize(12, 1.3),
        fontSize: getPadSize(13, 1.3),
      },

      buttonCircle: {
        position: 'absolute',
        bottom: 63,
        alignSelf: 'center',
        justifyContent: 'center',
        width: deviceWidth * 2 / 3,
        backgroundColor: commonColor.normalBlue,
        shadowColor: commonColor.shadowColorBlue,
      },
    }),
};
