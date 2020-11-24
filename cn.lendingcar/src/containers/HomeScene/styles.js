import * as commonColor from 'commonColor';
import variables from 'platform';
import { getPadSize } from 'utils/helpers';

const {
  deviceWidth,
  isIOS,
} = variables;

export default {
  slideLength: deviceWidth - getPadSize(64),
  drawerWidth: deviceWidth * 2 / 3,
  content: {
    backgroundColor: commonColor.white,
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
    fontSize: getPadSize(14),
    color: commonColor.black,
  },
  priceButtonView: {
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderColor: commonColor.greyer,
  },

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

  // renderFilterPrice
  filterView: {
    paddingBottom: 16,
    borderBottomWidth: isIOS ? 0 : 0.5,
    borderBottomColor: commonColor.greyer,
    backgroundColor: commonColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },

  // renderCarTypeList
  listContainer: {
    flex: 1,
  },
};
