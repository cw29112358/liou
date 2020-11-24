import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  isIphoneX,
  isIOS,
  smallScreen,
  deviceWidth,
  deviceHeight,
  headerHeight,
} = variables;
const isShowAllBUtton = !smallScreen;

export default {
  isIOS,
  isShowAllBUtton,
  content: {
    minHeight: deviceHeight - headerHeight,
    justifyContent: 'flex-start',
  },
  containerWhiteView: {
    backgroundColor: commonColor.white,
  },
  containerYellowView: {
    backgroundColor: commonColor.membeYellow,
  },

  // ribbonImage
  ribbonImage: {
    position: 'absolute',
    zIndex: -100,
    top: isPad ? 100 : -45,
    left: isPad ? deviceWidth - 600 : deviceWidth - 300,
    width: isPad ? 600 : 300,
  },
  // button
  buttonPrivilege: {
    position: 'absolute',
    bottom: isIphoneX ? 50 : 44,
    alignSelf: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: commonColor.grey750,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: commonColor.membeYellow,
  },
  disabledStyle: {
    backgroundColor: commonColor.grey,
    shadowColor: commonColor.grey,
  },
  disabledText: {
    color: commonColor.black,
  },

  memberFooter: {
    marginTop: 100,
    paddingTop: 12,
    paddingBottom: isIphoneX ? 24 : 12,
    width: '100%',
    fontSize: 12,
    color: commonColor.darkGrey,
    textAlign: 'center',
  },
  absoluteFooter: {
    position: 'absolute',
    bottom: 0,
  },
  footerText: {
    marginTop: 50,
  },
};
