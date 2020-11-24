import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  headerHeight,
  statusbarHeight,
  deviceHeight,
  deviceWidth,
  isPad,
  isIOS,
} = variables;
export default {
  deviceWidth,
  contentContainer: {
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  rightButton: {
    paddingRight: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  rightText: {
    color: commonColor.brand,
  },
  content: {
    backgroundColor: commonColor.grey200,
  },
  tabsStyle: {
    flex: 0,
  },
  tabBarUnderlineStyle: {
    display: 'none',
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 1,
    left: 56,
    width: isIOS ? '20%' : '25%',
    height: 4,
    backgroundColor: commonColor.brand,
    borderRadius: 6,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
  },
  tabTextStyle: {
    fontSize: 16,
  },
  tabActiveTextStyle: {
    fontSize: 16,
    color: commonColor.brand,
  },
  scrollView: {
    height: deviceHeight - headerHeight - statusbarHeight - 45,
  },
  list: {
    flexGrow: 0,
    paddingRight: isPad ? 24 : 16,
    paddingLeft: isPad ? 24 : 16,
  },
  deleteButton: {
    flex: 0,
    marginTop: 12,
    height: 118,
  },
  seperatorStyle: {
    height: 1,
  },
  footerShadow: {
    borderTopWidth: 0,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  allChecked: {
    flex: 1.6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  allCheckedBox: {
    left: 16,
    borderColor: commonColor.greyLight,
  },
  selectAll: {
    marginLeft: 28,
    fontSize: 16,
  },
  footerDisableButtonStyle: {
    borderRadius: 0,
    backgroundColor: commonColor.greyLight,
  },
  footerButtonStyle: {
    borderRadius: 0,
    backgroundColor: commonColor.errorRed,
  },
  footerButtonText: {
    fontSize: 16,
    color: commonColor.white,
  },
};
