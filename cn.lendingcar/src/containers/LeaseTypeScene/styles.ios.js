import * as commonColor from 'commonColor';
import variables from 'platform';
const { isIphoneX } = variables;

export default {
  contentContainer: {
  },
  content: {
    backgroundColor: commonColor.brand,
  },
  topTitle: {
    marginTop: 29.5,
    padding: isIphoneX ? 20 : 0,
    marginBottom: 78.5,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 25,
    color: commonColor.white,
  },
  carPart: {
    width: 361.5,
    alignSelf: 'flex-end',
    transform: [{ translateX: 13.5 }],
  },
  contentView: {
    backgroundColor: commonColor.white,
    marginBottom: 28,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    shadowColor: '#7B3138',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    transform: isIphoneX ? [{ translateX: 20 }] : undefined,
  },
  typeContent: {
  },
  carTitle: {
    color: commonColor.black,
    fontSize: 32,
    lineHeight: 45,
    marginTop: 19.5,
    marginLeft: 34,
    fontWeight: 'bold',
  },
  tips: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: commonColor.grey750,
    color: commonColor.brownGlod,
    marginLeft: 6,
    marginTop: 28,
    height: 22,
    fontSize: 11,
    paddingTop: 3.5,
    paddingBottom: 3.5,
    paddingLeft: 7,
    paddingRight: 7,
    lineHeight: 15,
  },
  carDesc: {
    color: commonColor.black,
    lineHeight: 18.5,
    fontSize: 13,
    marginTop: 6.5,
    marginLeft: 34,
  },
  images: {
    width: isIphoneX ? 230 : 240,
    height: 100,
    marginTop: 4,
    marginLeft: 94,
    marginRight: 50.5,
  },
  footer: {
    marginTop: 16.5, //
    height: 18.5,
  },
  text: {
    lineHeight: 18.5,
    fontSize: 13,
    textAlign: 'center',
    color: commonColor.white,
  },
};
