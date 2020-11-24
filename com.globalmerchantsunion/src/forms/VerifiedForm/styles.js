import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';
import variables from 'platform';

const {
  deviceWidth,
  scenePaddingWidth,
} = variables;

export default {
  ...objectMerge(formWithLabel,
    {
      verifyView: {
        marginTop: 40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      showView: {
        height: 'auto',
        minHeight: 35,
      },
      showTitle: {
        paddingVertical: 8,
      },

      rowLR: {
        marginTop: 30,
        width: deviceWidth,
        paddingHorizontal: scenePaddingWidth,
      },
      fundUnitItem: {
        marginLeft: 12,
        borderBottomWidth: 0,
      },

      cardItem: {
        flexDirection: 'column-reverse',
        marginLeft: 0,
        borderBottomWidth: 0,
        width: 'auto',
      },
      cardImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 0.5,
        borderColor: commonColor.darkGrey,
        width: 163.5,
        height: 100,
        borderRadius: 6,
      },
      cardImage: {
        width: 132.5,
        height: 81,
        borderRadius: 6,
      },
      cardAddImage: {
        width: 42,
        height: 42,
      },
      numberInputStyle: {
        inputStyle: {
          fontSize: 14,
          width: deviceWidth / 2,
          height: 50,
          flex: 0,
          textAlign: 'right',
          paddingRight: 0,
        },
        labelStyle: {
          fontSize: 14,
          lineHeight: 18.5,
          color: commonColor.grey3,
        },
      },
    }),
};
