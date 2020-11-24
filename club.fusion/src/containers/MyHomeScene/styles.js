import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import * as commonColor from 'commonColor';
import topExtendImage from 'assets/topExtend.png';
import halfCircleImage from 'assets/halfCircle.png';

const {
  deviceWidth,
} = variables;

const topBgHeight = deviceWidth * 849 / 750;

export default {
  content: {
    height: '100%',
  },
  settingImage: {
    width: getPadSize(21),
    height: getPadSize(21),
  },

  refreshControlProps: {
    style: {
      zIndex: 2,
    },
    tintColor: commonColor.white,
    titleColor: commonColor.white,
  },
  topExtendImageProps: {
    key: 1,
    source: topExtendImage,
    style: {
      position: 'absolute',
      left: 0,
      top: -topBgHeight,
      backgroundColor: commonColor.transparentBlack,
      width: deviceWidth,
      height: topBgHeight,
    },
  },
  halfCircleImageProps: {
    key: 1,
    source: halfCircleImage,
    style: {
      width: '100%',
    },
  },
  sectionList: {
    paddingBottom: 15.5,
  },
};
