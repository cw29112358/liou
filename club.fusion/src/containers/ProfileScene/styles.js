import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import myHomeSceneStyles from 'containers/MyHomeScene/styles';

const {
  deviceWidth,
  deviceHeight,
  isIphoneX,
  headerHeight,
} = variables;
const {
  refreshControlProps,
  topExtendImageProps,
  halfCircleImageProps,
} = myHomeSceneStyles;

const footerPaddingBottom = isIphoneX ? 18 : 0;
const footerHeight = 49 + footerPaddingBottom;

export const topPartHeight = 281;

export default {
  headerHeight,
  footerHeight,
  deviceWidth,
  deviceHeight,

  emptyList: {
    height: 'auto',
    flex: 1,
  },

  twoColumn: {
    position: 'absolute',
    left: deviceWidth,
    top: 0,
    flexDirection: 'row',
    width: deviceWidth * 2,
    height: '100%',
  },
  largeList: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: commonColor.greyF,
  },
  secondColumn: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: commonColor.white,
  },

  topPart: {
    height: topPartHeight,
    backgroundColor: commonColor.white,
  },
  refreshControlProps,
  topExtendImageProps,
  halfCircleImageProps,
  showFilterView: {
    justifyContent: 'center',
    paddingVertical: 40,
  },
  showButton: {
    borderWidth: 0,
    width: 125,
    height: 40,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  showText: {
    fontSize: getPadSize(15),
    color: commonColor.brand,
  },
  showActiveButton: {
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  showActiveText: {
    color: commonColor.white,
  },

  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: footerHeight,
    paddingBottom: footerPaddingBottom,
  },
};
