// import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';
import variables from 'platform';

const {
  deviceWidth,
  isPad,
} = variables;

export default {
  ...objectMerge(formWithLabel,
    {
      item28: {
        width: '28%',
        marginTop: 10,
      },

      form: {
        paddingHorizontal: 0,
        paddingTop: 0,
      },
      buttonView: {
        width: '100%',
      },
      button: {
        width: deviceWidth - 80,
        // height: isPad ? '150%' : '100%',
        alignSelf: 'center',
      },
      buttonText: {
        fontSize: isPad ? 24 : 16,
      },
    }),
};
