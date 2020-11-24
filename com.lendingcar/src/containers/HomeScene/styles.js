import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
  isPad,
} = variables;

export default {
  sliderLength: deviceWidth - (isPad ? 128 : 96),
  drawerWidth: deviceWidth * 2 / 3,
  content: {
    backgroundColor: commonColor.white,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
    minWidth: 150,
    justifyContent: 'space-evenly',
  },
  footerTble: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateText: {
    textAlign: 'center',
    marginVertical: 10,
  },

  // price
  priceTitleView: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: 28,
  },
  priceLeftLabel: {
    fontSize: isPad ? 21 : 14,
    color: commonColor.black,
  },
  priceRightLabel: {
    fontSize: isPad ? 30 : 20,
    color: commonColor.pureBlack,
  },
  priceButtonView: {
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },
  // filterPrice: {
  //   position: 'absolute',
  //   bottom: bottomDistance,
  //   left: 0,
  //   right: 0,
  // },
  // slideStyle: {
  //   marginTop: isPad ? 134 : slideTop,
  // },
  // skip
  skipButton: {
    position: 'absolute',
    top: 40,
    zIndex: 1002,
    elevation: 0,
    left: deviceWidth - 65,
    backgroundColor: commonColor.transparent,
  },
  buttonText: {
    color: commonColor.white,
  },

  // specialActivity
  specialButton: {
    position: 'absolute',
    backgroundColor: commonColor.transparent,
    paddingLeft: 0,
    paddingRight: 0,
    right: 16,
    top: -5,
    elevation: 0,
    height: 90,
  },
  specialImage: {
    width: 92,
    height: 90,
  },
};
