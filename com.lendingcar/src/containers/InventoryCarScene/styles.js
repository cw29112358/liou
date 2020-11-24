import * as commonColor from 'commonColor';
import variables from 'platform';
import { getScaleSize } from 'utils/helpers';

const {
  deviceWidth,
  isIOS,
  headerHeight,
  isIphoneX,
} = variables;
const headerTop = isIphoneX ? 44 : 16;

export default {
  contentContainer: {
    justifyContent: 'center',
    paddingBottom: 42,
  },
  content: {
    backgroundColor: commonColor.white,
  },
  // renderHeader
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: isIOS ? 0 : 16,
    left: 0,
    zIndex: 1,
    height: headerHeight,
    paddingTop: isIOS ? headerTop : 8,
    paddingLeft: getScaleSize(16),
    paddingRight: getScaleSize(16),
    width: deviceWidth,
    borderBottomWidth: 0,
  },
  headerShadow: {
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
  },
  button: {
    paddingLeft: 0,
  },
  backIcon: {
    color: commonColor.black,
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  buttonHeart: {
    paddingRight: 0,
  },
  heartIcon: {
    color: commonColor.black,
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  heartoIcon: {
    color: commonColor.red,
  },
  // horizontalLine
  horizontalLine: {
    height: 0.5,
    width: deviceWidth - getScaleSize(32),
    backgroundColor: commonColor.greyer,
    marginLeft: getScaleSize(16),
    marginTop: 39,
    marginBottom: 35,
  },

  // separator
  separator: {
    height: 10,
    width: deviceWidth,
    marginTop: 36,
    marginBottom: 35,
    backgroundColor: commonColor.lightGrey,
  },
};
