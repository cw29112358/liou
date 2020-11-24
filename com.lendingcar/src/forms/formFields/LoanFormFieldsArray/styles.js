import * as commonColor from 'commonColor';
import { objectMerge } from 'utils/helpers';
import { formWithLabel } from 'forms/styles';
import variables from 'platform';

const {
  deviceHeight,
  deviceWidth,
  isPad,
} = variables;

export default {
  ...objectMerge(formWithLabel,
    {
      // renderFormTitle
      formGroupoTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      leftGroupContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      emergencyContact: {
        fontSize: isPad ? 24 : 16,
        color: commonColor.black,
      },
      icon: {
        fontSize: isPad ? 27 : 18,
        marginLeft: 8,
      },
      addButton: {
        width: isPad ? 25.5 : 17,
        height: isPad ? 25.5 : 17,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      addButonText: {
        textAlign: 'center',
        lineHeight: isPad ? 25.5 : 17,
        fontSize: isPad ? 24.75 : 16.5,
      },

      // renderFormItem
      listItem: {
        flexDirection: 'column',
        paddingRight: 0,
        borderBottomWidth: 0,
      },
      // renderFormItemTitle
      itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      itemContentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileCard: {
        width: isPad ? 33 : 22,
        height: isPad ? 24 : 16,
      },
      itemLabel: {
        marginLeft: 8,
        fontSize: isPad ? 24 : 16,
        color: commonColor.black,
      },
      itemContentRight: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      deleteButton: {
        marginRight: 15,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      deleteIcon: {
        fontSize: isPad ? 30 : 20,
        color: commonColor.errorRed,
      },
      nameText: {
        fontSize: isPad ? 24 : 16,
        color: commonColor.black,
        marginRight: 15,
      },
      arrowButton: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      arrowIcon: {
        fontSize: isPad ? 27 : 18,
        color: commonColor.darkGrey,
      },

      // renderFormContent
      fieldsContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 20,
      },

      // renderEmptyList
      emptyList: {
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight / 2,
        width: deviceWidth - 32,
      },
      handshake: {
        width: isPad ? 115.5 : 77,
        height: isPad ? 82.5 : 55,
        marginBottom: 20,
      },
      emptyListNote: {
        textAlign: 'center',
        fontSize: isPad ? 21 : 14,
        color: commonColor.grey650,
      },
    }),
};
