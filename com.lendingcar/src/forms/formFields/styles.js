import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  deviceWidth,
  isPad,
  isIOS,
} = variables;

export default {
  isIOS,

  // public
  fieldVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 0,
  },
  labelVertical: {
    paddingTop: isPad ? 40 : 20,
    fontSize: isPad ? 19.5 : 13,
    lineHeight: isPad ? 27.75 : 18.5,
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
    borderColor: commonColor.errorRed,
    shadowOpacity: 0,
  },
  viewWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRed: {
    color: commonColor.errorRed,
  },

  // NumberInput
  textPrefix: {
    paddingRight: 14,
    lineHeight: 24.5,
  },

  // TextInput
  questionIcon: {
    paddingTop: 20,
    fontSize: isPad ? 21 : 14,
    lineHeight: isPad ? 21 : 14,
    color: commonColor.grey650,
  },

  // Avatar
  avatarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    paddingBottom: 16,
  },
  avatarInfo: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 15,
    height: 130,
    borderRadius: 5,
    backgroundColor: commonColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  nameStyle: {
    fontSize: isPad ? 24 : 16,
    marginTop: 12,
  },
  membership: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 18,
  },
  isMemberShip: {
    marginBottom: 4.5,
  },
  membershipImage: {
    width: 16,
    height: 13,
  },
  membershipText: {
    paddingLeft: 4,
    fontSize: isPad ? 18 : 12,
    color: commonColor.pureBlack,
  },
  membershipPrivilege: {
    fontSize: isPad ? 24 : 16,
    color: commonColor.membeYellow,
  },
  userName: {
    fontSize: isPad ? 36 : 24,
    lineHeight: isPad ? 50.25 : 33.5,
  },
  membershipDate: {
    alignItems: 'flex-end',
    marginTop: 23,
    paddingRight: 12,
    width: '100%',
  },
  membershipDateText: {
    fontSize: isPad ? 15 : 10,
    lineHeight: isPad ? 21 : 14,
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
  placeHolderStyle: {
    color: commonColor.greyLight,
  },
  textStyle: {
    color: commonColor.black,
    fontSize: isPad ? 24 : 16,
  },
  pickItemText: {
    fontSize: isPad ? 21 : 14,
    color: commonColor.black,
  },
  pickItemIcon: {
    color: commonColor.black,
  },
  labelText: {
    fontSize: isPad ? 24 : 16,
    paddingTop: 12,
    paddingBottom: 12,
  },

  // DateTimeSelectInput
  text: {
    paddingHorizontal: 0,
    fontSize: isPad ? 19.5 : 13,
    paddingVertical: 12,
  },
  placeholder: {
    paddingVertical: 12,
    fontSize: isPad ? 24 : 16,
    color: commonColor.greyLight,
  },

  // dateTimeSelectRangeInput
  dateText: {
    fontSize: isPad ? 19.5 : 13,
  },
  touchableView: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  // MultiRadioButtonInput(double)
  radioGroupStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 0,
    borderBottomWidth: 0,
  },
  multiRadio: {
    paddingRight: 10,
    marginTop: 4,
  },
  radioGroupView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioGroupText: {
    fontSize: isPad ? 18 : 12,
    color: commonColor.grey650,
  },

  touchStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // CompositeField
  numberLayoutStyle: {
    flexDirection: 'row',
    marginBottom: 24,
    borderLeftWidth: isIOS ? 0.4 : 0.5,
    borderRightWidth: isIOS ? 0.4 : 0.5,
    borderTopWidth: isIOS ? 0.4 : 0.5,
    borderBottomWidth: isIOS ? 0.4 : 0.5,
    paddingLeft: 8,
    paddingRight: 18,
    height: isPad ? 60 : 44,
    borderRadius: isPad ? 30 : 22,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2.5,
    elevation: 1,
    borderColor: commonColor.greyer,
  },
  selectLabelStyle: {
    fontSize: getScaleSize(13, 1.2),
    fontWeight: '800',
  },
  dropdownStyles: {
    fontSize: getScaleSize(20, 1.2),
    paddingTop: 4,
    marginLeft: 6,
  },
  countryCodeField: {
    borderBottomWidth: 0,
  },
  selectPlaceholderStyle: {
    fontSize: getScaleSize(13, 1.2),
    fontWeight: '800',
    color: commonColor.black,
  },
  phoneNumberField: {
    flex: 1,
    borderColor: commonColor.transparent,
  },
  iconPhoneStyle: {
    width: 15,
    height: 22,
  },

  // InternationalPhoneField
  formatStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderColor: commonColor.greyer,
  },
  selectItem: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  selectValueStyle: {
    fontSize: getScaleSize(13, 1.2),
    fontWeight: '800',
    color: commonColor.black,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputItem: {
    flex: 1,
    paddingLeft: 7,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
};
