import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import formStyles from 'forms/styles';
import variables from 'platform';
import { LINEAR_PROPS } from 'utils/constants';


const {
  scenePaddingWidth,
  isIOS,
} = variables;
export default {
  ...objectMerge(formStyles,
    {
      form: {
        paddingHorizontal: 0,
      },
      formWrapper: {
        paddingHorizontal: scenePaddingWidth,
      },
      horizontalItem: {
        itemstyle: {
          justifyContent: 'space-between',
          marginLeft: scenePaddingWidth,
          marginRight: scenePaddingWidth,
          height: 78.5,
          borderBottomWidth: 0.5,
          borderBottomColor: commonColor.greyer,
        },
        labelStyle: {
          width: 100,
          fontSize: 16,
          color: commonColor.darkGrey,
        },
        textStyle: {
          fontSize: 16,
        },
        placeholderStyle: {
          fontSize: 14,
        },
        inputStyle: {
          textAlign: 'right',
          fontSize: isIOS ? 16 : 12,
        },
      },
      itemstyle: {
        justifyContent: 'space-between',
        marginLeft: scenePaddingWidth,
        marginRight: scenePaddingWidth,
        marginBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        height: 78.5,
        borderBottomWidth: 0,
      },
      textareaItemstyle: {
        marginTop: 45.5,
        marginLeft: 0,
        paddingHorizontal: scenePaddingWidth,
      },
      textareaStyle: {
        paddingTop: 10,
        paddingRight: 10,
        width: '100%',
        height: 180,
        borderWidth: 1,
        borderColor: commonColor.greyer,
      },
      // centerForm
      centerFormHorizontalItem: {
        itemstyle: {
          justifyContent: 'flex-start',
          marginBottom: 20,
          height: 34,
          borderBottomWidth: 0,
        },
        labelStyle: {
          marginRight: 35.5,
          width: 82,
          fontSize: 16,
          color: commonColor.darkGrey,
        },
        inputViewStyle: {
          flex: 0,
        },
        inputStyle: {
          flex: 0,
          alignSelf: 'flex-end',
          marginRight: 11.5,
          height: 34,
          width: 100,
          borderWidth: 1,
          borderRadius: 6,
          borderColor: commonColor.grey98,
          textAlign: 'right',
          fontSize: isIOS ? 16 : 12,
        },
      },
      rightChildrenWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      rightChildrenTextStyle: {
        fontSize: 16,
      },
      arrowIcon: {
        marginLeft: 8,
        fontSize: 20,
        color: commonColor.grey800,
      },
      centerFormWrapper: {
        paddingLeft: 40,
        paddingTop: 20,
      },
      tabsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginRight: 40,
      },
      tabWrapperStyle: {
        elevation: 3,
        shadowColor: commonColor.faintBlack,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: commonColor.white,
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 65,
      },
      activeTabStyle: {
        borderWidth: 1,
        borderColor: commonColor.brand,
        borderRadius: 6,
        backgroundColor: commonColor.tabBgcColor,
      },
      tabText: {
        fontSize: 16,
        color: commonColor.tabText,
      },
      activeTabTextStyle: {
        color: commonColor.brand,
      },


      mediaItemStyle: {
        marginTop: 45,
        borderBottomWidth: 0,
      },
      mediaLabelStyle: {
        paddingLeft: scenePaddingWidth,
      },
      mediaInputStyle: {
        paddingHorizontal: scenePaddingWidth,
      },
      button: {
        justifyContent: 'center',
        width: 120,
        height: 40,
        borderRadius: 22,
        backgroundColor: commonColor.transparent,
      },
      buttonText: {
        fontSize: 15,
      },
      linearProps: LINEAR_PROPS,
      pointShadow: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 35.5,
        elevation: 3,
        overflow: 'hidden',
        width: 120,
        height: 40,
        borderRadius: 22,
      },
    }),
};
