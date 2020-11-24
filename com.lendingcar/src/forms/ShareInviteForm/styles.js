import * as commonColor from 'commonColor';
import { objectMerge, getScaleSize } from 'utils/helpers';
import formStyles from 'forms/styles';

export default {
  ...objectMerge(formStyles,
    {
      form: {
        paddingHorizontal: 0,
        paddingBottom: 12,
        backgroundColor: commonColor.lightGrey,
      },
      item100: {
        width: 200,
      },
      wrapper: {
        paddingHorizontal: getScaleSize(16),
        backgroundColor: commonColor.white,
      },

      shareInviteCode: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
      },
      shareInviteCodeText: {
        fontSize: 13,
        lineHeight: 18.5,
      },
      questionIcon: {
        paddingLeft: 6,
        paddingRight: 12,
        fontSize: 14,
        color: commonColor.grey650,
      },

      copyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 16,
        paddingBottom: 20,
      },
      recommendationCode: {
        fontSize: 20,
        lineHeight: 28,
      },
      copyButton: {
        alignSelf: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 28,
      },
      copyButtonText: {
        fontSize: 14,
        lineHeight: 28,
        color: commonColor.normalBlue,
      },
    }),
};
