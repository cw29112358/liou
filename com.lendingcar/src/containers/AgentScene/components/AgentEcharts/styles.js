import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

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
    marginHorizontal: getScaleSize(16),
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingBottom: 25.5,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 48,
    width: '100%',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  },
  userContent: {
    alignItems: 'center',
  },
  newUserNum: {
    textAlign: 'center',
    fontSize: 28,
    color: commonColor.blueA800,
  },
  totalUserNum: {
    textAlign: 'center',
    fontSize: 28,
    color: commonColor.pinkA300,
  },
  userText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16.5,
  },
  echarts: {
    flex: 0,
  },
  tabsStyle: {
    shadowOpacity: 0,
    backgroundColor: commonColor.white,
    borderBottomColor: commonColor.white,
  },
  tabTextStyle: {
    marginTop: 24,
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
    backgroundColor: commonColor.blueA300,
    borderRadius: 6,
    elevation: 3,
    shadowColor: commonColor.shadowColorBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
  },
};
