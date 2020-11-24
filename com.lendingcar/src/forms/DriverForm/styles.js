import { objectMerge } from 'utils/helpers';
import variables from 'platform';
import { formWithLabel } from 'forms/styles';
const {
  isPad,
} = variables;

export default {
  ...objectMerge(formWithLabel,
    {
      form: {
        paddingTop: 0,
      },
      compositeLayoutStyle: {
        flexDirection: 'row',
        height: isPad ? 58.5 : 47,
        paddingLeft: 0,
        marginBottom: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        shadowOpacity: 0,
      },
    }),
};
