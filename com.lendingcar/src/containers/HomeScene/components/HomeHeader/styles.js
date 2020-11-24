import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
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
    borderBottomWidth: isIOS ? 0 : 0.5,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  headerButton: {
    paddingLeft: isPad ? 24 : 16,
    paddingRight: isPad ? 24 : 16,
    elevation: 0,
    backgroundColor: commonColor.transparent,
  },
  imageSize: {
    width: isPad ? 25 : 22,
    height: isPad ? 20 : 18,
  },
  areaButton: {
    backgroundColor: commonColor.transparent,
    elevation: 0,
  },
  areaText: {
    color: commonColor.black,
  },

  badge: {
    backgroundColor: commonColor.deepRed,
    width: 10,
    height: 12,
    borderRadius: 12,
    position: 'absolute',
    right: 12,
    top: 7,
  },

  dropdownIcon: {
    fontSize: isPad ? 18 : 12,
    transform: [{ rotateZ: '-90deg' }],
    color: commonColor.black,
    marginBottom: 5,
    marginLeft: 8,
  },
  dropupIcon: {
    transform: [{ rotateZ: '90deg' }],
    marginBottom: 0,
  },
};
