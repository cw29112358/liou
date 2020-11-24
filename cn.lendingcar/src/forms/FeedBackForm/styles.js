import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  ...objectMerge(formStyles,
    {
      form: {
        paddingVertical: 0,
        paddingHorizontal: 0,
      },
      buttonCircle: {
        marginTop: 0,
        width: isPad ? 150 : 100,
      },
      textAreaItem: {
        marginTop: 32,
        marginBottom: 32,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 6,
      },
      textArea: {
        flex: 1,
        height: 200,
      },
    }),
};
