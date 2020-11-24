import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';
const {
  isIOS,
} = variables;

export default {
  echartsWrapper: {
    backgroundColor: commonColor.white,
  },
  linearGradient: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: getPadSize(16, 1.5),
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingBottom: getPadSize(51, 1.2),
  },
  userContent: {
    alignItems: 'center',
  },
  newUserNum: {
    textAlign: 'center',
    fontSize: getPadSize(28, 1.5),
    color: commonColor.blueA800,
  },
  totalUserNum: {
    textAlign: 'center',
    fontSize: getPadSize(28, 1.5),
    color: commonColor.pinkA300,
  },
  userText: {
    textAlign: 'center',
    fontSize: getPadSize(12, 1.5),
    lineHeight: getPadSize(16.5, 1.5),
  },
  echarts: {
    width: '100%',
  },
  tabsStyle: {
    shadowOpacity: 0,
  },
  tabTextStyle: {
    fontSize: getPadSize(16, 1.2),
  },
  tabBarUnderlineStyle: {
    display: 'none',
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    width: isIOS ? '20%' : '25%',
    height: 4,
    backgroundColor: commonColor.blueA300,
    borderRadius: 6,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
  },
};
