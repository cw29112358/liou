
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
        paddingHorizontal: 0,
      },
      buttonCircle: {
        marginTop: 24,
        width: isPad ? 150 : 100,
      },
    }),
};
