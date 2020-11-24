import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

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
    marginTop: statusbarHeight,
    paddingTop: isIOS ? 18 : 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
    backgroundColor: commonColor.white,
    // shadowColor: commonColor.faintBlack,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },

  badge: {
    width: 44,
    height: 18,
    marginRight: 4,
  },

  headerLeft: {
    flex: 0.3,
  },
  areaButton: {
    backgroundColor: commonColor.transparent,
    elevation: 0,
    paddingLeft: getPadSize(16),
  },
  positionImage: {
    height: 12,
    width: 9,
    marginRight: 2,
  },
  areaText: {
    color: commonColor.black,
    fontSize: 12,
  },

  headerBody: {
    flex: 0.4,
  },
  logoImage: {

  },

  headerRight: {
    flex: 0.3,
  },
  rightView: {
    height: 40,
    paddingTop: 5,
    paddingRight: getPadSize(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
};
