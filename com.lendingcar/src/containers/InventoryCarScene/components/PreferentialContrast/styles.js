import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  isPad,
  isIOS,
} = variables;

export default {
  content: {
    paddingHorizontal: isPad ? 24 : 16,
  },

  contrast: {
    marginTop: isPad ? 30 : 20,
    paddingTop: isPad ? 30 : 20,
  },
  cardView: {
    width: '100%',
    borderRadius: 6,
    paddingTop: isPad ? 90 : 60,
    paddingBottom: 10,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomWidth: isIOS ? 0 : 0.5,
  },
  cardPartTitle: {
    textAlign: 'center',
    marginTop: 22,
    fontSize: isPad ? 24 : 16,
    marginBottom: 10,
  },

  // renderDefaultList
  cardPart: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardPartContent: {
    width: '40%',
  },
  leftText: {
    textAlign: 'right',
    fontSize: isPad ? 21 : 14,
    marginBottom: 15,
    color: commonColor.brand,
  },
  vertical: {
    height: '100%',
    width: 1,
    marginHorizontal: 15,
    backgroundColor: commonColor.greyD8,
  },
  rightText: {
    textAlign: 'left',
    fontSize: isPad ? 21 : 14,
    marginBottom: 15,
    color: commonColor.textGrey,
  },
  // renderButton
  button: {
    marginTop: 30,
    flexDirection: 'column',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: isPad ? 20 : 0,
    alignSelf: 'center',
    elevation: 0,
    backgroundColor: commonColor.transparent,
  },
  text: {
    fontSize: isPad ? 20 : 13,
    color: commonColor.black,
  },
  arrowImage: {
    width: isPad ? 22.5 : 15,
    height: isPad ? 30 : 20,
  },
  lessArrowImage: {
    transform: [{ rotateZ: '180deg' }],
  },
  // renderContrastTitle
  contrastTitleLine: {
    position: 'absolute',
    top: isPad ? 5 : 0,
    left: 0,
    elevation: 3,
    paddingHorizontal: 24,
    flexDirection: 'row',
    marginTop: 3,
  },
  contrastLeftTag: {
    width: '50%',
    borderRadius: 6,
    paddingLeft: 13,
    paddingVertical: 13,
    backgroundColor: commonColor.brand,
  },
  contrastRightTag: {
    width: '50%',
    paddingRight: 20,
    paddingVertical: 13,
    borderRadius: 6,
    backgroundColor: commonColor.greyLight,
  },
  lendingCarText: {
    color: commonColor.white,
    fontSize: isPad ? 24 : 16,
    textAlign: isPad ? 'center' : 'left',
  },
  buyCarText: {
    textAlign: isPad ? 'center' : 'right',
    color: commonColor.darkGrey,
    fontSize: isPad ? 24 : 16,
  },

  // renderVS
  ellipse: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  textView: {
    width: 'auto',
    borderRadius: 100,
    backgroundColor: commonColor.white,
    shadowColor: commonColor.faintBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    borderBottomWidth: isIOS ? 0 : 0.5,
  },
  VSText: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    fontSize: isPad ? 60 : 40,
    color: commonColor.brand,
  },
};
