import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';

export default {
  ...objectMerge(formWithLabel,
    {
      form: {
        paddingTop: 0,
      },
    }),
};
