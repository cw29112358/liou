import commonColor from 'commonColor';
import variables from 'platform';

const {
  isIOS,
  deviceWidth,
  statusbarHeight,
  scenePaddingWidth,
} = variables;

export default {
  headerStyle: {
    alignItems: 'center',
    borderBottomWidth: 0,
    paddingTop: isIOS ? 18 : statusbarHeight,
    paddingLeft: 0,
    paddingRight: 0,
    width: deviceWidth,
    backgroundColor: commonColor.transparent,
  },
  shadow: {
    backgroundColor: commonColor.white,
    shadowColor: commonColor.transparentBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomWidth: isIOS ? 0 : 0.5,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
  },
  button: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: scenePaddingWidth,
    paddingRight: scenePaddingWidth,
    backgroundColor: commonColor.transparent,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: commonColor.black,
  },
  iconNormal: {
    marginLeft: 0,
    fontSize: 30,
    color: commonColor.black,
  },
  colorWhite: {
    color: commonColor.white,
  },
};
