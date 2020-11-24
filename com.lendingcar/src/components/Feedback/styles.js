import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';

export default {
  ...objectMerge(formStyles,
    {
      title: {
        marginBottom: 39,
      },
      text: {
        lineHeight: 22,
      },
      brandShadow: {
        paddingLeft: 27.5,
        paddingRight: 27.5,
        paddingTop: 11.5,
        paddingBottom: 11.5,
        marginTop: 122,
      },
      buttonText: {
        fontSize: 15,
        lineHeight: 21,
      },
    }),
};
