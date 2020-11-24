import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  smallScreen,
  deviceHeight,
  isIphoneX,
} = variables;
const smallWidth = smallScreen ? 223 : 279;
const smallHeight = smallScreen ? 290 : 392;
const scrollHeight = smallScreen ? 200 : 303;

export default {
  modalContent: {
    marginTop: isPad || isIphoneX ? deviceHeight / 4 : 125,
    alignItems: 'center',
  },
  content: {
    alignSelf: 'center',
    width: isPad ? 418 : smallWidth,
    height: isPad ? 486 : smallHeight,
    backgroundColor: commonColor.grey750,
    borderRadius: 6,
  },
  header: {
    position: 'absolute',
    left: '50%',
    marginTop: isPad ? -30 : -20,
    marginLeft: isPad ? -150 : -100,
    width: isPad ? 300 : 200,
    height: isPad ? 60 : 40,
    backgroundColor: commonColor.membeYellow,
    borderRadius: isPad ? 30 : 20,
    justifyContent: 'center',
    zIndex: 100,
    elevation: 1,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: isPad ? 24 : 16,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: isPad ? 60 : 40,
    height: isPad ? 351 : scrollHeight,
    borderBottomWidth: 1,
    borderColor: commonColor.membeYellow,
  },
  contentContainerStyle: {
    paddingRight: 27.5,
    paddingLeft: 27.5,
    paddingBottom: 20,
  },
  text: {
    fontSize: isPad ? 19 : 13,
    lineHeight: isPad ? 27 : 18.5,
    paddingTop: 35,
    color: commonColor.membeYellow,
  },
  button: {
    width: isPad ? 418 : smallWidth,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    height: isPad ? 75 : 50,
  },
  confirmText: {
    fontSize: isPad ? 24 : 16,
    lineHeight: isPad ? 33 : 22.5,
    color: commonColor.membeYellow,
  },
};
