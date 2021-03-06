import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isPad,
  isIphoneX,
} = variables;

export default {
  container: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1001,
  },
  content: {
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 5, height: 0 },
    width: isPad ? deviceWidth * 1 / 2 : deviceWidth * 2 / 3,
    height: '100%',
    shadowOpacity: 1,
    paddingTop: isIphoneX ? 88 : 44,
  },
  avatar: {
    width: isPad ? 105 : 70,
    height: isPad ? 105 : 70,
  },
  userName: {
    marginTop: 12,
    fontSize: isPad ? 24 : 16,
    fontWeight: '700',
    color: commonColor.black,
    textAlign: 'center',
  },
  mask: {
    width: deviceWidth,
    position: 'absolute',
    top: 0,
    height: '100%',
  },

  listItem: {
    borderBottomWidth: 0,
    marginLeft: 30,
    height: isPad ? 70 : 60,
  },

  membership: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 55,
    paddingTop: 4,
  },
  membershipImage: {
    width: isPad ? 18 : 11,
    height: isPad ? 15 : 9,
  },
  membershipText: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: isPad ? 20 : 13,
    lineHeight: isPad ? 25 : 18.5,
    color: commonColor.membeYellow,
  },
  iconStyle: {
    fontSize: isPad ? 20 : 13,
    marginTop: 2,
    color: commonColor.grey650,
  },
};
