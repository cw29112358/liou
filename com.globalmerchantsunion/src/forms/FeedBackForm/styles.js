import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';

export default {
  ...objectMerge(formStyles,
    {
      form: {
        paddingTop: 19.5,
      },
      textareaStyle: {
        marginTop: 12,
        marginBottom: 50,
        borderRadius: 6,
        height: 127.5,
      },
      linearButtonView: {
        width: 120,
        borderRadius: 50,
      },
      linearButton: {
        width: 120,
      },
    }),
};
