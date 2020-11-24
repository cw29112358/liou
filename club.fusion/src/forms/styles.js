import { objectMerge, getPadSize } from 'utils/helpers';
import { LINEAR_PROPS } from 'utils/constants';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  deviceWidth,
  scenePaddingWidth,
} = variables;

// 1. common
const linearButtonView = {
  justifyContent: 'center',
  alignSelf: 'center',
  borderRadius: 50,
};
const blackShadow = {
  backgroundColor: commonColor.white,
  shadowColor: commonColor.shadowColorBlack,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1,
  shadowRadius: 6,
  elevation: 3,
};
const commonFormStyles = {
  form: {
    paddingHorizontal: scenePaddingWidth,
  },
  rowLR: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowR: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  brandShadow: {
    ...blackShadow,
    shadowColor: commonColor.shadowColorBrand,
    backgroundColor: commonColor.brand,
  },
  blackShadow,
  absoluteForm: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
  },
  linearButtonView,
  linearProps: {
    ...LINEAR_PROPS,
    linearStyle: linearButtonView,
  },
  linearButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    width: 120,
    height: 40,
    backgroundColor: 'transparent',
  },
  linearButtonText: {
    fontWeight: '600',
    fontSize: getPadSize(15),
    color: commonColor.white,
  },
};

// 2. LoginForm/PasswordForm ...
export const formStyles = {
  ...objectMerge(commonFormStyles,
    {
      logo: {
        alignSelf: 'center',
        marginTop: 13,
        marginBottom: 47,
        width: 70,
        height: 70,
      },
      // success
      successImage: {
        alignSelf: 'center',
        width: 67.5,
        height: 67.5,
        marginTop: 70,
        marginBottom: 20,
      },
      successText: {
        alignSelf: 'center',
        fontSize: 20,
        color: commonColor.black,
      },
      // submit
      submitPosition: {
        position: 'absolute',
        left: (deviceWidth - 300) / 2,
        bottom: 100,
        borderRadius: 50,
      },
      linearButton: {
        width: 300,
      },
      // item
      itemstyle: {
        marginTop: 10,
        marginBottom: 16,
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0.5,
        paddingLeft: 12,
        paddingRight: 16,
        height: isPad ? 60 : 44,
      },
      inputStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        height: isPad ? 60 : 44,
      },
      horizontalItem: {
        itemstyle: {
          marginLeft: 0,
        },
        labelStyle: {
          fontSize: getPadSize(14),
          lineHeight: 18.5,
          color: commonColor.black,
        },
        inputStyle: {
          fontSize: getPadSize(14),
          height: 50,
        },
        placeholderStyle: {
          color: commonColor.grey98,
        },
      },
      // text
      title: {
        paddingTop: 27,
        marginBottom: 44,
        fontSize: getPadSize(28),
        lineHeight: 39,
      },
      darkGreyText: {
        fontSize: getPadSize(13),
        lineHeight: 18.5,
        color: commonColor.darkGrey,
      },
      greyText: {
        fontSize: getPadSize(13),
        lineHeight: 18.5,
        color: commonColor.grey650,
      },
      // icon
      iconPasswordStyle: {
        width: 19,
        height: 22,
      },
      iconPhoneStyle: {
        width: 15,
        height: 22,
      },
      iconNext: {
        paddingLeft: 5,
        fontSize: getPadSize(26),
        fontWeight: 100,
      },
    }),
};

// 3. ProfileForm ...
const labelItemstyle = {
  justifyContent: 'space-between',
  paddingTop: 8,
  marginLeft: scenePaddingWidth,
  marginRight: scenePaddingWidth,
};
const labelInputStyle = {
  height: 44,
  paddingRight: 0,
  fontSize: getPadSize(14),
  textAlign: 'right',
};
export const formWithLabel = {
  ...objectMerge(commonFormStyles,
    {
      form: {
        paddingBottom: 40,
        paddingHorizontal: 0,
      },
      rowWrap: {
        flexWrap: 'wrap',
      },
      // field View
      showTitle: {
        fontSize: getPadSize(13),
        color: commonColor.textGrey,
      },
      showView: {
        height: 35,
        paddingHorizontal: scenePaddingWidth,
        backgroundColor: commonColor.grey2,
      },
      // item
      item100: {
        width: '100%',
      },
      item48: {
        width: '48%',
      },
      horizontalItem: {
        itemstyle: labelItemstyle,
        labelStyle: {
          paddingRight: 0,
          fontSize: getPadSize(14),
          color: commonColor.grey3,
        },
        inputStyle: labelInputStyle,
        placeholderStyle: {
          fontSize: 14,
        },
      },
      noBorderItemStyle: {
        ...labelItemstyle,
        borderBottomWidth: 0,
        paddingBottom: 18,
      },
      firstItemStyle: {
        ...labelItemstyle,
        paddingTop: 18,
      },
      noEditableInputStyle: {
        ...labelInputStyle,
        color: commonColor.darkGrey,
      },
    }),
};

export default formStyles;
