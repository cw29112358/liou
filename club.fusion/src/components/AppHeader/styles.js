import commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
import variables from 'platform';
import { LINEAR_PROPS } from 'utils/constants';

const {
  isIOS,
  deviceWidth,
  statusbarHeight,
  scenePaddingWidth,
} = variables;

export default {
  bgImage: {
    width: '100%',
  },
  headerStyle: {
    alignItems: 'center',
    borderBottomWidth: 0,
    paddingTop: isIOS ? 18 : statusbarHeight,
    paddingLeft: 0,
    paddingRight: 0,
    width: deviceWidth,
    backgroundColor: 'transparent',
  },
  linearProps: {
    start: LINEAR_PROPS.linearStart,
    end: LINEAR_PROPS.linearEnd,
    colors: LINEAR_PROPS.linearColors,
    style: {
      width: '100%',
    },
  },
  button: {
    paddingLeft: scenePaddingWidth,
    paddingRight: scenePaddingWidth,
    backgroundColor: commonColor.transparent,
  },
  title: {
    fontSize: getPadSize(18),
    fontWeight: '600',
    color: commonColor.white,
  },
  iconNormal: {
    marginLeft: 0,
    fontSize: 30,
    color: commonColor.white,
  },
  colorBlack: {
    color: commonColor.black,
  },
};
