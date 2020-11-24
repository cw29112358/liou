import { objectMerge, getPadSize } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';
import loginBgImage from 'assets/loginBg.png';

const {
  isIphoneX,
  isPad,
  scenePaddingWidth,
  deviceHeight,
  deviceWidth,
} = variables;

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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowLR: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowR: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  blackShadow,
  brandShadow: {
    ...blackShadow,
    shadowColor: commonColor.shadowColorBrand,
    backgroundColor: commonColor.brand,
  },
};

export const formStyles = {
  ...objectMerge(commonFormStyles,
    {
      // button
      buttonCircle: {
        marginTop: 43.5,
        height: isPad ? 50 : 44,
        width: isPad ? 50 : 44,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 44,
        justifyContent: 'space-evenly',
      },
      buttonText: {
        fontSize: getPadSize(15, 1.2),
        lineHeight: getPadSize(21, 1.2),
      },
      bgImageProps: {
        source: loginBgImage,
        style: {
          width: deviceWidth,
          height: deviceHeight + 50,
        },
      },
      accountTipView: {
        position: 'absolute',
        bottom: 40 + (isIphoneX ? 20 : 0) + (isPad ? 20 : 0),
        width: '100%',
      },
      accountTipRow1: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: commonColor.white,
        paddingTop: 20,
      },
      loginButton: {
        position: 'absolute',
        left: '50%',
        bottom: 223.5 + (isIphoneX ? 90 : 0) + (isPad ? 130 : 0),
        marginLeft: -getPadSize(80),
        justifyContent: 'center',
        marginTop: 60,
        width: getPadSize(160),
        height: isPad ? 50 : 44,
        borderRadius: getPadSize(22),
        backgroundColor: commonColor.brand,
      },
      loginText: {
        fontSize: getPadSize(16),
        color: commonColor.white,
      },
      // item
      itemStyle: {
        marginBottom: 24,
        borderBottomWidth: 0,
        paddingLeft: getPadSize(14),
        height: isPad ? 60 : 44,
        borderRadius: getPadSize(6),
        backgroundColor: commonColor.white,
      },
      inputStyle: {
        height: isPad ? 60 : 44,
      },
      horizontalItem: {
        itemStyle: {
          marginLeft: 0,
          height: isPad ? 70 : 50,
        },
        labelStyle: {
          width: isPad ? 120 : 84.5,
          fontWeight: '600',
          fontSize: getPadSize(13, 1.4),
          color: commonColor.black,
        },
        inputStyle: {
          height: 50,
        },
        placeholderStyle: {
          color: commonColor.grey98,
        },
      },
      // text
      greyText: {
        fontSize: getPadSize(13),
        lineHeight: getPadSize(18.5),
        color: commonColor.grey650,
      },
      brand: {
        color: commonColor.brand,
      },
      tipText: {
        fontSize: getPadSize(13),
        lineHeight: getPadSize(18.5),
        color: commonColor.white,
      },
      passwordTip: {
        fontSize: getPadSize(12),
      },
      // icon
      iconPasswordStyle: {
        marginRight: 14,
        width: getPadSize(19),
        height: getPadSize(22),
      },
      iconPhoneStyle: {
        marginRight: 14,
        width: getPadSize(15),
        height: getPadSize(22),
      },
    }),
};

export const formWithLabel = {
  ...objectMerge(commonFormStyles,
    {
      form: {
        paddingTop: getPadSize(20),
        paddingBottom: 68,
      },
      rowWrap: {
        flexWrap: 'wrap',
      },
      boldInput: {
        fontWeight: '600',
        fontSize: getPadSize(16),
      },
      questionIcon: {
        fontSize: getPadSize(13),
        color: commonColor.grey650,
      },
      // item
      item100: {
        width: '100%',
      },
      item48: {
        width: '48%',
      },
      // button
      buttonView: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      },
    }),
};

export default formStyles;
