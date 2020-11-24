
import { objectMerge, getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import formStyles from 'forms/styles';
import variables from 'platform';

const {
  isPad,
  minHeight,
} = variables;

export default {
  ...objectMerge(formStyles,
    {
      form: {
        paddingTop: 132 + (isPad ? 100 : 0),
        paddingHorizontal: 0,
        marginHorizontal: 42.5 + (isPad ? 100 : 0),
        height: minHeight,
      },
      takeLook: {
        position: 'absolute',
        top: (isPad ? 40 : 0),
        right: -22.5 + (isPad ? -60 : 0),
        fontSize: getPadSize(14),
        lineHeight: getPadSize(21),
        color: commonColor.white,
      },
      composite: {
        borderWidth: 0,
      },
    }),
};
