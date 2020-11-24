import { objectMerge } from 'utils/helpers';
import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  isIOS,
} = variables;

const commonFormStyles = {
  form: {
    paddingHorizontal: isPad ? 24 : 16,
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
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
};

export const formStyles = {
  ...objectMerge(commonFormStyles,
    {
      radioChildren: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingRight: 20,
      },
      // button
      buttonCircle: {
        marginTop: 43.5,
        height: isPad ? 60 : 44,
        width: isPad ? 60 : 44,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 44,
        justifyContent: 'space-evenly',
      },
      // item
      itemstyle: {
        marginBottom: 24,
        borderLeftWidth: isIOS ? 0.4 : 0.5,
        borderRightWidth: isIOS ? 0.4 : 0.5,
        borderTopWidth: isIOS ? 0.4 : 0.5,
        borderBottomWidth: isIOS ? 0.4 : 0.5,
        paddingLeft: 8,
        paddingRight: 18,
        height: isPad ? 60 : 44,
        backgroundColor: commonColor.white,
        shadowColor: commonColor.shadowColorBlack,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2.5,
        elevation: 1,
      },
      inputStyle: {
        height: isPad ? 60 : 44,
      },
      horizontalItem: {
        itemstyle: {
          marginLeft: 0,
        },
        labelStyle: {
          fontSize: 13,
          lineHeight: 18.5,
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
      title: {
        paddingTop: 27,
        marginBottom: 44,
        fontSize: 28,
        lineHeight: 39,
      },
      text: {
        fontSize: 15,
        lineHeight: 18,
      },
      darkGreyText: {
        fontSize: 13,
        lineHeight: 18.5,
        color: commonColor.darkGrey,
      },
      greyText: {
        fontSize: 13,
        lineHeight: 18.5,
        color: commonColor.grey650,
      },
      brand: {
        color: commonColor.brand,
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
        fontSize: 26,
        fontWeight: 100,
      },
    }),
};

export const formWithLabel = {
  ...objectMerge(commonFormStyles,
    {
      form: {
        paddingTop: 20,
        paddingBottom: 68,
      },
      rowWrap: {
        flexWrap: 'wrap',
      },
      // item
      item100: {
        width: '100%',
      },
      item48: {
        width: '48%',
      },
      inputStyle: {
        fontSize: isPad ? 24 : 16,
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
