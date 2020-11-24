import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  deviceWidth,
} = variables;

export default {
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  // app
  app: {
    marginTop: 60,
    width: 100,
    height: 100,
  },
  // text
  textView: {
    justifyContent: 'space-between',
    marginTop: 190,
    height: 50,
  },
  textGrey: {
    textAlign: 'center',
    fontSize: 13,
    color: commonColor.grey650,
  },
  textGrey2A: {
    color: commonColor.textGrey2A,
  },
  // button
  button: {
    position: 'absolute',
    left: (deviceWidth - 255) / 2,
    bottom: 68,
    justifyContent: 'center',
    width: 255,
    height: 40,
    borderRadius: 6,
    backgroundColor: commonColor.brand,
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 1,
  },
  buttonText: {
    fontSize: 15,
    color: commonColor.white,
  },
};
