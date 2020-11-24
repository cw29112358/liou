import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';
import variables from 'platform';

const {
  isPad,
} = variables;

export default {
  ...objectMerge(formStyles,
    {
      buttonCircle: {
        width: isPad ? 150 : 100,
      },
    }),
};
