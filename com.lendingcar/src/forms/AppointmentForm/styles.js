import * as commonColor from 'commonColor';
import { objectMerge, getScaleSize } from 'utils/helpers';
import formStyles from 'forms/styles';

export default {
  ...objectMerge(formStyles,
    {
      form: {
        marginTop: 15,
        backgroundColor: commonColor.white,
      },
      disableInput: {
        fontSize: 14,
        color: commonColor.darkGrey,
      },
      horizontalItem: {
        itemstyle: {
          height: 54.5,
        },
        labelStyle: {
          width: 110,
          color: commonColor.grey650,
        },
      },
      viewWrap: {
        width: 110,
      },
      labelStyle: {
        fontSize: 13,
        color: commonColor.grey650,
      },
      icon: {
        paddingTop: 4,
      },
      darkGreyText: {
        marginTop: 8,
        fontSize: 12,
      },
      // button
      linearGradient: {
        marginTop: 43,
        marginBottom: 33,
      },

      title: {
        fontSize: getScaleSize(20),
        color: commonColor.black,
        marginBottom: 8,
        paddingTop: 0,
      },
      text: {
        fontSize: getScaleSize(14),
        color: commonColor.grey650,
      },
    }),
};
