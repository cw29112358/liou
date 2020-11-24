import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  deviceHeight,
  isIOS,
  smallScreen,
  isIphoneX,
} = variables;

const topMargin = isIphoneX ? deviceHeight / 7 : deviceHeight / 9;
export default {
  childrenstyle: {
    backgroundColor: 'transparent',
    zIndex: 1001,
    flex: 1,
  },
  content: {
    backgroundColor: commonColor.halfBlack,
  },
  firstImageSource: {
    position: 'absolute',
    left: deviceWidth / 12,
    top: isIOS ? topMargin : deviceHeight / 7,
  },
  firstTextImage: {
    position: 'absolute',
    left: deviceWidth / 12,
    top: smallScreen ? deviceHeight / 3 + 30 : deviceHeight / 3,
  },
  secondImageSource: {
    position: 'absolute',
    left: deviceWidth / 3,
    top: deviceHeight * 2 / 3,
  },
  secondTextImage: {
    position: 'absolute',
    left: deviceWidth / 12,
    top: deviceHeight / 2,
  },
  thirdImageSource: {
    position: 'absolute',
    left: deviceWidth / 3,
    top: deviceHeight * 2 / 3,
  },
  thirdTextImage: {
    position: 'absolute',
    left: deviceWidth / 12,
    top: deviceHeight * 4 / 5,
  },
};
