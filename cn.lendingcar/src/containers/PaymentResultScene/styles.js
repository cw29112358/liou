import * as commonColor from 'commonColor';
import { getPadSize } from 'utils/helpers';
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
    marginBottom: getPadSize(15, 1.2),
    width: getPadSize(90, 1.2),
    height: getPadSize(90, 1.2),
  },
  textLabel: {
    marginBottom: getPadSize(20, 1.2),
    fontSize: getPadSize(20, 1.2),
    lineHeight: getPadSize(28, 1.2),
    color: commonColor.brand,
  },
  priceStyle: {
    priceText: {
      fontSize: getPadSize(24, 1.2),
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
    height: getPadSize(45, 1.2),
    width: getPadSize(120, 2),
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
  transparentButtonText: {
    fontSize: getPadSize(16, 1.5),
    color: commonColor.grey650,
  },
  buttonText: {
    fontSize: getPadSize(16, 1.5),
  },
};
