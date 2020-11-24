import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';
import * as commonColor from 'commonColor';

export default {
  ...objectMerge(formWithLabel,
    {
      form: {
        paddingTop: 0,
      },
      // button
      buttonView: {
        justifyContent: 'center',
        width: '100%',
      },
      button: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
        width: 235,
        backgroundColor: commonColor.brown,
        shadowColor: commonColor.brown,
        elevation: 3,
      },
      buttonText: {
        fontSize: 15,
        color: commonColor.brownGlod,
      },
    }),
};
