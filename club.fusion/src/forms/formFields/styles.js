import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  deviceWidth,
  deviceHeight,
  isPad,
  isIOS,
} = variables;

export default {
  isIOS,
  brand: commonColor.brand,
  white: commonColor.white,

  // public
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldNoBorder: {
    borderBottomWidth: 0,
  },
  fieldVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 0,
  },
  labelVertical: {
    paddingTop: isPad ? 40 : 20,
    fontSize: 13,
    lineHeight: 18.5,
    color: commonColor.grey650,
  },
  inputVertical: {
    paddingTop: isPad ? 18 : 12,
    paddingBottom: isPad ? 18 : 12,
    paddingLeft: 0,
    paddingRight: 0,
    height: isPad ? 58.5 : 46.5,
  },
  fieldError: {
    borderTopColor: commonColor.errorRed,
    borderBottomColor: commonColor.errorRed,
    borderLeftColor: commonColor.errorRed,
    borderRightColor: commonColor.errorRed,
    shadowOpacity: 0,
  },
  viewWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRed: {
    color: commonColor.errorRed,
  },
  labelTip: {
    fontSize: 12,
    color: commonColor.grey3,
  },

  // Avatar
  avatarDeleteButton: {
    position: 'absolute',
    right: 4,
    top: -1.5,
  },
  avatarDeleteImage: {
    width: 15,
    height: 15,
  },
  rightArrow: {
    marginLeft: 8,
    paddingRight: 0,
    fontSize: 20,
    color: commonColor.grey800,
  },

  // AdderButton
  adderItem: {
    justifyContent: 'space-between',
    marginLeft: 0,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  adderButtonView: {
    flexDirection: 'row',
    marginLeft: 15,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: commonColor.black,
    backgroundColor: commonColor.shadowColorBlack,
  },
  adderButton: {
    width: 50,
    height: 30,
  },
  adderButtonBorder: {
    borderRightWidth: 0.5,
    borderColor: commonColor.black,
  },
  adderIcon: {
    fontSize: 18,
  },

  // NumberInput
  textPrefix: {
    fontSize: 14,
    paddingRight: 14,
    lineHeight: 24.5,
  },

  // TextInput
  questionIcon: {
    paddingTop: 20,
    fontSize: 14,
    lineHeight: 14,
    color: commonColor.grey650,
  },

  // RadioButton
  radioItemstyle: {
    borderBottomWidth: 0,
    marginLeft: 0,
  },
  radio: {
    paddingRight: 10,
  },

  // SelectInput
  pickItem: {
    marginRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    height: 61,
    paddingRight: 0,
    borderColor: commonColor.greyer,
  },
  picker: {
    width: deviceWidth,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeHolderStyle: {
    color: commonColor.greyLight,
  },
  textStyle: {
    color: commonColor.black,
    fontSize: 16,
  },
  arrowIcon: {
    marginLeft: 8,
    fontSize: 20,
    color: commonColor.grey800,
  },
  pickItemText: {
    fontSize: 14,
    color: commonColor.black,
  },
  pickItemIcon: {
    color: commonColor.black,
  },
  labelText: {
    paddingTop: 12,
    paddingBottom: 12,
  },

  // switch
  switchItemstyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 0,
    borderBottomWidth: 0,
  },
  switchText: {
    flex: 1,
  },


  // DateTimeSelectInput
  text: {
    paddingHorizontal: 5,
    fontSize: 13,
    paddingVertical: 12,
  },
  placeholder: {
    paddingVertical: 12,
    fontSize: 16,
    color: commonColor.greyLight,
  },

  // Media
  mediaItemStyle: {
    height: 'auto',
  },
  mediaTextStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    lineHeight: 35,
    fontSize: 13,
    color: commonColor.textGrey,
    backgroundColor: commonColor.textBgc,
  },
  mediaWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  imageBgc: {
    marginRight: 9,
    marginBottom: 10,
    width: 79,
    height: 79,
  },
  fourthImageBgc: {
    marginRight: 0,
  },
  avatar: {
    borderRadius: 6,
  },
  closeImage: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 4,
    width: 15,
    height: 15,
  },
  addImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 79,
    height: 79,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: commonColor.borderColor,
  },
  addIcon: {
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 35.5,
    width: 120,
    height: 40,
    borderRadius: 22,
  },
  videoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 79,
    height: 79,
  },
  videoStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  playIcon: {
    color: commonColor.white,
  },
  modalWrapper: {
    width: deviceWidth,
    height: deviceHeight,
  },
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
    paddingLeft: 40,
    paddingRight: 0,
    height: isPad ? 60 : 44,
  },
  iconPhoneStyle: {
    width: 15,
    height: 22,
  },
  countryCodeField: {
    borderBottomWidth: 0,
    position: 'absolute',
    top: 12,
    zIndex: 999,
  },
  selectPlaceholderStyle: {
    fontSize: getScaleSize(13, 1.2),
    fontWeight: '800',
    color: commonColor.black,
  },
  dropdownStyles: {
    fontSize: getScaleSize(20, 1.2),
    paddingTop: 4,
    marginLeft: 6,
  },
  selectLabelStyle: {
    fontSize: getScaleSize(13, 1.2),
    fontWeight: '800',
  },
};
