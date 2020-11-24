
import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';
import variables from 'platform';

const {
  minHeight,
} = variables;

export default {
  ...objectMerge(formStyles,
    {
      form: {
        height: minHeight,
      },
    }),
};
