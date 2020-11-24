import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  ...objectMerge(formWithLabel,
    {
      form: {
        paddingHorizontal: 0,
        paddingTop: 0,
        justifyContent: 'center',
      },
      buttonView: {
        width: '100%',
      },
      button: {
        width: deviceWidth - 80,
        alignSelf: 'center',
      },
      radioIcon: {
        marginTop: 4,
      },
      item28: {
        width: '28%',
      },
      radioButton: {
        width: '100%',
        marginTop: 36,
      },
      optionText: {
        fontSize: 12,
        color: commonColor.grey650,
      },
    }),
};
