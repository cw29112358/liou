import commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  isIOS,
  statusbarHeight,
} = variables;

export default {
  isIOS,
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: statusbarHeight,
    paddingTop: isIOS ? 18 : 0,
    backgroundColor: commonColor.white,
    borderBottomWidth: 0,
  },
  shadow: {
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomWidth: isIOS ? 0 : 0.5,
  },
  headerBorder: {
    borderBottomWidth: 0,
  },
  button: {
    elevation: 0,
    paddingLeft: getScaleSize(16),
    paddingRight: getScaleSize(16),
    backgroundColor: commonColor.transparent,
  },
  transparentTitle: {
    fontSize: getScaleSize(16),
    color: commonColor.black,
  },
  imageSize: {
    width: getScaleSize(22),
    height: getScaleSize(18),
  },
  iconNormal: {
    color: commonColor.black,
    fontSize: 30,
    marginLeft: 0,
  },
  iconLarge: {
    fontSize: 48,
    height: 48,
  },
  rightButton: {
    paddingRight: getScaleSize(16),
  },
};
