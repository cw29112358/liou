import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';

const {
  isPad,
  isIOS,
} = variables;

export default {
  isIOS,

  // public
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  fieldNoBorder: {
    borderBottomWidth: 0,
  },
  fieldError: {
    borderColor: commonColor.errorRed,
    shadowOpacity: 0,
  },
  label: {
    fontSize: getPadSize(13),
    lineHeight: getPadSize(18.5),
    color: commonColor.grey650,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: getPadSize(13),
  },
  placeholder: {
    color: commonColor.greyLight,
  },
  textRed: {
    color: commonColor.errorRed,
  },
  withBorder: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRadius: 6,
  },

  fieldVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  labelVertical: {
    paddingTop: isPad ? 40 : 20,
  },
  inputVertical: {
    paddingTop: isPad ? 16 : 12,
    paddingBottom: isPad ? 16 : 12,
    height: isPad ? 58.5 : 46.5,
  },

  // NumberInput
  prefix: {
    paddingRight: 16,
    height: 'auto',
  },

  // Avatar
  avatarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    paddingBottom: 20,
  },
  nameStyle: {
    marginTop: 12,
    fontSize: getPadSize(16),
  },
  // Avatar right
  avatarInfo: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 15,
    height: getPadSize(130),
    borderRadius: getPadSize(6),
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  // row1
  membership: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getPadSize(26),
    marginBottom: getPadSize(18),
  },
  isMemberShip: {
    marginTop: getPadSize(22.5),
    marginBottom: getPadSize(4.5),
  },
  membershipImage: {
    width: getPadSize(16),
    height: getPadSize(13),
  },
  membershipText: {
    paddingLeft: 4,
    fontWeight: '600',
    fontSize: getPadSize(12),
    lineHeight: getPadSize(22.5),
    color: commonColor.black,
  },
  membershipPrivilege: {
    fontWeight: '600',
    fontSize: getPadSize(16),
    lineHeight: getPadSize(22.5),
    color: commonColor.membeYellow,
  },
  // row2
  userName: {
    fontSize: getPadSize(24),
    lineHeight: getPadSize(33.5),
  },
  // row3
  membershipDate: {
    alignItems: 'center',
    marginTop: getPadSize(23),
    width: '100%',
  },
  membershipDateText: {
    fontSize: getPadSize(10),
    lineHeight: getPadSize(14),
    color: commonColor.grey650,
  },

  // RadioButton
  radio: {
    paddingRight: 10,
  },

  // CompositeField
  compositeStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  numberLayoutStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  touchStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectLabelStyle: {
    fontSize: getPadSize(13, 1.2),
    fontWeight: '800',
  },
  dropdownStyles: {
    fontSize: getPadSize(20, 1.2),
    paddingTop: 4,
    marginLeft: 6,
  },
  countryCodeField: {
    borderBottomWidth: 0,
  },
  selectPlaceholderStyle: {
    fontSize: getPadSize(13, 1.2),
    fontWeight: '800',
    color: commonColor.black,
  },
  phoneNumberField: {
    flex: 1,
    borderColor: commonColor.transparent,
    marginLeft: 12,
  },
  iconPhoneStyle: {
    width: getPadSize(15),
    height: getPadSize(22),
    marginRight: 12,
    marginLeft: 3,
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
    fontSize: getPadSize(13, 1.2),
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
