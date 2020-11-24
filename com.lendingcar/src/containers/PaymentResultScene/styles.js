import * as commonColor from 'commonColor';
import variables from 'platform';

const {
  statusbarHeight,
  deviceHeight,
  headerHeight,
  isPad,
} = variables;
export default {
  container: {
    backgroundColor: commonColor.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '100%',
  },
  content: {
    paddingTop: isPad ? 125 : 0,
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: deviceHeight - headerHeight - statusbarHeight,
  },
  checkImage: {
    marginTop: 35.5,
    marginBottom: 15,
    width: 90,
    height: 90,
  },
  textLabel: {
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 28,
    color: commonColor.brand,
  },
  priceStyle: {
    priceText: {
      fontSize: 24,
    },
  },
  bottomLine: {
    marginBottom: isPad ? 210 : 120,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
    paddingBottom: 35.5,
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: isPad ? 240 : 120,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonShadow: {
    shadowColor: commonColor.shadowColorBrand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: commonColor.grey650,
  },
};
