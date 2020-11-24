import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
} = variables;
export default {
  // infoView
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 25.5,
    paddingHorizontal: isPad ? 24 : 16,
  },
  textView: {
    width: isPad ? 303 : 151.5,
    marginTop: 12,
  },
  blackText: {
    textAlign: 'left',
    marginBottom: 12,
    fontSize: isPad ? 40 : 20,
    lineHeight: isPad ? 48 : 24,
  },
  greyText: {
    textAlign: 'left',
    fontSize: isPad ? 18 : 13,
    color: commonColor.grey650,
  },

  // ball
  ball: {
    position: 'absolute',
    backgroundColor: commonColor.brand,
  },
  smallBall: {
    right: 16,
    top: 20,
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  leftBall: {
    left: -18,
    bottom: -22.5,
    width: 55,
    height: 45.5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  rightBall: {
    right: -27,
    bottom: -12.5,
    width: 73,
    height: 36.5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  shadow: {
    zIndex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: commonColor.shadowColorBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: commonColor.white,
  },
};
