import variables from 'platform';

const {
  deviceWidth,
  isIphoneX,
  headerHeight,
  deviceHeight,
} = variables;

const parentPaddingBottom = isIphoneX ? 18 : 0;
const seperatorHeight = 68.5 + parentPaddingBottom;

export default {
  deviceWidth,
  seperatorHeight,
  twoColumnHeight: deviceHeight - headerHeight - 52,

  twoColumn: {
    flex: 1,
    width: deviceWidth * 2,
    paddingBottom: 1,
  },
  column: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: deviceWidth,
    height: '100%',
  },

  seperatorAbsolute: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: seperatorHeight + 33,
    paddingBottom: parentPaddingBottom + 33,
  },
  seperatorRelative: {
    height: seperatorHeight,
    paddingBottom: parentPaddingBottom,
  },
};
